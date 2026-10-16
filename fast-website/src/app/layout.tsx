import type { Metadata, Viewport } from "next";
import { Lexend, Nunito, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";

// Nonce-based CSP needs per-request rendering, so every page is dynamic.
export const dynamic = "force-dynamic";

const display = Nunito({ subsets: ["latin"], weight: ["800", "900"], variable: "--f-display", display: "swap" });
const body = Lexend({ subsets: ["latin"], weight: ["300", "500"], variable: "--f-body", display: "swap" });
const emoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", variable: "--f-emoji", display: "swap", preload: false });

const site = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "FAST – Stay close. Stay safe.",
  description: "FAST is a private, consent-first safety network for families. Native for Windows and Android. Built to help end gender-based violence in South Africa.",
  openGraph: { title: "FAST – Stay close. Stay safe.", description: "A private safety network for your family.", type: "website", locale: "en_ZA" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f9f4ec", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${body.variable} ${emoji.variable}`}>
      <body>
        <noscript><style>{"#splash{display:none!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
