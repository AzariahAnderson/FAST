import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "FAST – Family Assistance & Safety Technology", short_name: "FAST", start_url: "/", display: "standalone", background_color: "#f9f4ec", theme_color: "#f9f4ec", icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }] };
}
