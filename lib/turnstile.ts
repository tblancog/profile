type TurnstileResult = { success?: boolean; hostname?: string };

/**
 * Cloudflare Turnstile is off unless TURNSTILE_SECRET_KEY is set.
 * A site key without this secret does not turn verification on.
 */
export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
  hostname: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  let response: Response;
  try {
    response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "error",
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    console.error("contact_turnstile_unreachable");
    return false;
  }

  if (!response.ok) {
    console.error("contact_turnstile_status");
    return false;
  }

  let payload: TurnstileResult;
  try {
    payload = (await response.json()) as TurnstileResult;
  } catch {
    console.error("contact_turnstile_payload");
    return false;
  }

  if (payload.success !== true) return false;
  if (payload.hostname && payload.hostname !== hostname) return false;
  return true;
}
