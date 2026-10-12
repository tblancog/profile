import { createHash } from "node:crypto";
import { CONTACT_RATE_LIMIT } from "@/lib/contact-limits";

type LimitResult = { allowed: true } | { allowed: false; retryAfter: number };

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5_000;

type StoreConfig = { url: string; token: string };

function positiveInt(value: string | undefined, fallback: number, min: number, max: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}

function limits() {
  return {
    max: positiveInt(process.env.CONTACT_RATE_LIMIT_MAX, CONTACT_RATE_LIMIT.max, 1, 100),
    windowSeconds: positiveInt(
      process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS,
      CONTACT_RATE_LIMIT.windowSeconds,
      60,
      86_400,
    ),
  };
}

function storeConfig(): StoreConfig | null {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (upstashUrl && upstashToken) {
    return { url: upstashUrl, token: upstashToken };
  }

  const kvUrl = process.env.KV_REST_API_URL?.trim();
  const kvToken = process.env.KV_REST_API_TOKEN?.trim();
  if (kvUrl && kvToken) {
    return { url: kvUrl, token: kvToken };
  }

  return null;
}

function hashKey(ip: string, windowId: number) {
  const digest = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  return `rl:contact:${digest}:${windowId}`;
}

function retryAfter(windowSeconds: number) {
  const windowMs = windowSeconds * 1000;
  const resetAt = (Math.floor(Date.now() / windowMs) + 1) * windowMs;
  return Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
}

function memoryLimit(key: string, max: number, windowSeconds: number): LimitResult {
  const now = Date.now();
  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
    while (buckets.size > MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (!oldest) break;
      buckets.delete(oldest);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true };
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

async function remoteLimit(
  store: StoreConfig,
  key: string,
  max: number,
  windowSeconds: number,
): Promise<LimitResult> {
  const endpoint = `${store.url.replace(/\/$/, "")}/pipeline`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, windowSeconds, "NX"],
    ]),
    redirect: "error",
    signal: AbortSignal.timeout(2000),
  });

  if (!response.ok) {
    throw new Error("rate_limit_store_status");
  }

  const payload: unknown = await response.json();
  const first = Array.isArray(payload) ? payload[0] : undefined;
  const count =
    first && typeof first === "object" && "result" in first ? first.result : undefined;
  if (typeof count !== "number") {
    throw new Error("rate_limit_store_payload");
  }

  if (count > max) {
    return { allowed: false, retryAfter: retryAfter(windowSeconds) };
  }

  return { allowed: true };
}

/**
 * Per-IP fixed window. Uses Upstash Redis or Vercel KV when configured.
 * Otherwise, or if that store errors, uses a bounded in-memory window.
 * The memory limiter does not span serverless instances.
 */
export async function rateLimit(ip: string): Promise<LimitResult> {
  const { max, windowSeconds } = limits();
  const windowId = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = hashKey(ip.slice(0, 256), windowId);
  const store = storeConfig();

  if (!store) {
    return memoryLimit(key, max, windowSeconds);
  }

  try {
    return await remoteLimit(store, key, max, windowSeconds);
  } catch {
    console.error("contact_rate_limit_fallback");
    return memoryLimit(key, max, windowSeconds);
  }
}
