function firstHop(value: string | null) {
  if (!value) return "";
  const hop = value.split(",")[0]?.trim() ?? "";
  if (!hop || hop.length > 256 || /[\s\u0000-\u001F\u007F]/.test(hop)) return "";
  return hop;
}

/** Prefer the platform-set Vercel header over a client-supplied forwarded header. */
export function clientIp(request: Request) {
  return (
    firstHop(request.headers.get("x-vercel-forwarded-for")) ||
    firstHop(request.headers.get("x-real-ip")) ||
    firstHop(request.headers.get("x-forwarded-for")) ||
    "unknown"
  );
}
