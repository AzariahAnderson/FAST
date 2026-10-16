import { getDownloadUrl, isPlatform } from "@/lib/links";
import { rateLimit } from "@/lib/rate-limit";
import { clientKey, NO_STORE } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const limited = rateLimit(`dl:${clientKey(req)}`, 30, 60_000);
  if (!limited.ok) return new Response("Too many requests.", { status: 429, headers: { ...NO_STORE, "Retry-After": String(limited.retryAfter) } });

  const url = isPlatform(platform) ? getDownloadUrl(platform) : null;
  if (!url) return new Response("This download is not available yet.", { status: 404, headers: NO_STORE });
  return new Response(null, { status: 302, headers: { Location: url, ...NO_STORE } });
}
