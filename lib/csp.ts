/**
 * Page CSP. Scripts use a per-request nonce. Styles stay 'unsafe-inline'
 * because HeroUI and framer-motion set style attributes, and a nonce in
 * style-src causes browsers to ignore 'unsafe-inline'.
 */
export function buildContentSecurityPolicy(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";
  const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());

  const scriptSrc = [
    "script-src 'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    isDev ? "'unsafe-eval'" : "",
    turnstile ? "https://challenges.cloudflare.com" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const connectSrc = [
    "connect-src 'self'",
    isDev ? "ws: wss:" : "",
    turnstile ? "https://challenges.cloudflare.com" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    connectSrc,
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    turnstile ? "frame-src https://challenges.cloudflare.com" : "frame-src 'none'",
    turnstile ? "worker-src 'self' blob:" : "",
    isDev ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}
