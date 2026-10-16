import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { clientKey, isSameOrigin, NO_STORE } from "@/lib/security";
import { addToWaitlist } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const Body = z.object({
  email: z.string().trim().toLowerCase().max(254).regex(EMAIL),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot: real people leave this empty
});

const json = (body: object, status = 200, extra: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { ...NO_STORE, ...extra } });

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ error: "Unsupported" }, 415);
  if (Number(req.headers.get("content-length") ?? 0) > 2048) return json({ error: "Too large" }, 413);

  const limited = rateLimit(`notify:${clientKey(req)}`, 5, 10 * 60_000);
  if (!limited.ok) return json({ error: "Too many requests" }, 429, { "Retry-After": String(limited.retryAfter) });

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    const bot = typeof raw === "object" && raw !== null && "website" in raw && (raw as { website?: string }).website;
    return bot ? json({ ok: true }) : json({ error: "Please enter a valid email and tick the box." }, 400);
  }
  try { await addToWaitlist(parsed.data.email); } catch { return json({ error: "Could not save right now." }, 500); }
  return json({ ok: true }); // same reply whether or not the address was already saved
}
