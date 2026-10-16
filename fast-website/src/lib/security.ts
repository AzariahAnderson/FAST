import "server-only";
import { createHash } from "node:crypto";

const SALT = process.env.IP_HASH_SALT ?? "dev-only-salt";

/** Hashed client key for rate limiting. IPs are never stored in plain text. */
export function clientKey(req: Request): string {
  let ip = "anonymous";
  if (process.env.TRUST_PROXY === "true") {
    const first = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (first) ip = first;
  }
  return createHash("sha256").update(SALT + ip).digest("hex").slice(0, 24);
}

/** CSRF defence for state-changing requests: the Origin header must match our site. */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const allowed = new URL(process.env.SITE_URL ?? "http://localhost:3000").origin;
  return origin === allowed;
}

export const NO_STORE = { "Cache-Control": "no-store" } as const;
