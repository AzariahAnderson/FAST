import { Download } from "@/components/Download";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Kindness } from "@/components/Kindness";
import { Nav } from "@/components/Nav";
import { Splash } from "@/components/Splash";
import { Tour } from "@/components/Tour";
import Help from "@/components/Help";
import Interactions from "@/components/Interactions";
import Motion from "@/components/Motion";
import { getDownloadUrl } from "@/lib/links";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Splash />
      <Nav />
      <main id="main">
        <Hero />
        <Tour />
        <Features />
        <Kindness />
        <Help />
        <Download windows={!!getDownloadUrl("windows")} android={!!getDownloadUrl("android")} />
      </main>
      <Footer />
      <Motion />
      <Interactions />
    </>
  );
}
