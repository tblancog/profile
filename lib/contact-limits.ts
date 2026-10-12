export const CONTACT_LIMITS = {
  name: 50,
  email: 254,
  subject: 100,
  message: 2048,
  honeypot: 200,
  turnstile: 2048,
  bodyBytes: 16_384,
} as const;

export const CONTACT_RATE_LIMIT = {
  max: 5,
  windowSeconds: 600,
} as const;
