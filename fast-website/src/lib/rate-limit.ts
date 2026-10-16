// Small in-memory sliding-window limiter. For several server instances, swap for Redis/Upstash.
type Bucket = { count: number; reset: number };
const store = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (store.size > 5000) for (const [k, v] of store) if (v.reset <= now) store.delete(k);
  const bucket = store.get(key);
  if (!bucket || bucket.reset <= now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
}
