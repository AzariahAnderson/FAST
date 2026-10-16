import Image from "next/image";
import emblem from "@/assets/emblem.webp";

export function Nav() {
  return (
    <nav id="nav" aria-label="Main">
      <b><Image src={emblem} alt="" width={30} sizes="30px" />FAST</b>
      <a href="#tour">Screens</a>
      <a href="#features">Features</a>
      <a className="hl" href="#help">Get help</a>
      <a className="btn" href="#download">Download</a>
    </nav>
  );
}
