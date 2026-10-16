import "server-only";

export type Platform = "windows" | "android";

/** Returns the configured release URL, or null. Only https links are ever accepted. */
export function getDownloadUrl(platform: Platform): string | null {
  const raw = platform === "windows" ? process.env.WINDOWS_DOWNLOAD_URL : process.env.ANDROID_DOWNLOAD_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export const isPlatform = (v: string): v is Platform => v === "windows" || v === "android";
