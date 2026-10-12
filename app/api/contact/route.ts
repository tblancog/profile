import { z } from "zod";
import { clientIp } from "@/lib/client-ip";
import { CONTACT_LIMITS } from "@/lib/contact-limits";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";
import { verifyTurnstile } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const BIDI_CHARS = /[\u202A-\u202E\u2066-\u2069\u200E\u200F]/;

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((value) => !CONTROL_CHARS.test(value) && !BIDI_CHARS.test(value));

const contactSchema = z.object({
  firstName: singleLine(CONTACT_LIMITS.name),
  lastName: singleLine(CONTACT_LIMITS.name),
  email: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.email)
    .email()
    .refine((value) => !CONTROL_CHARS.test(value) && !BIDI_CHARS.test(value)),
  subject: singleLine(CONTACT_LIMITS.subject),
  message: z
    .string()
    .trim()
    .min(10)
    .max(CONTACT_LIMITS.message)
    .refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)),
  website: z.string().max(CONTACT_LIMITS.honeypot).optional(),
  turnstileToken: z.string().max(CONTACT_LIMITS.turnstile).optional(),
});

const NO_STORE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function json(body: { success?: true; error?: string }, status = 200, extra?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { ...NO_STORE, ...extra },
  });
}

async function readLimitedBody(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > CONTACT_LIMITS.bodyBytes) return null;

  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let received = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > CONTACT_LIMITS.bodyBytes) {
      await reader.cancel();
      return null;
    }
    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();
  return body;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = await rateLimit(ip);
  if (!limit.allowed) {
    return json({ error: "Too many requests. Please try again later." }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "Invalid request" }, 400);
  }

  const raw = await readLimitedBody(request);
  if (raw === null) {
    return json({ error: "Invalid request" }, 400);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (payload && typeof payload === "object" && "website" in payload) {
    const website = payload.website;
    const filled =
      (typeof website === "string" && website.trim() !== "") ||
      (website != null && typeof website !== "string");
    if (filled) {
      return json({ success: true });
    }
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: "Invalid request" }, 400);
  }

  let hostname = "";
  try {
    hostname = new URL(request.url).hostname;
  } catch {
    hostname = "";
  }

  const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip, hostname);
  if (!turnstileOk) {
    return json({ error: "Invalid request" }, 400);
  }

  try {
    await sendContactEmail(parsed.data);
  } catch {
    return json({ error: "Failed to send message" }, 500);
  }

  return json({ success: true });
}

export function GET() {
  return json({ error: "Method not allowed" }, 405);
}
