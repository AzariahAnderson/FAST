import Image from "next/image";
import emblem from "@/assets/emblem.webp";
import { Words } from "./Words";

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap grid2">
        <div>
          <a className="gbv" href="#help"><i />Built to help end gender-based violence in South Africa.</a>
          <h1 id="h1"><Words text="Stay close. Stay safe." /></h1>
          <p className="lead">FAST is a private safety network for your family. Share your location only when you choose to, ask for a check-in with one tap, and reach help in seconds.</p>
          <div className="cta">
            <a className="btn" href="#download">Download FAST</a>
            <a className="btn ghost" href="#help">Get help now</a>
          </div>
          <p className="note">Native for Windows and Android. iPhone is coming soon. Emergency and check-ins are never locked.</p>
        </div>
        <div className="emb"><Image src={emblem} alt="FAST family emblem" loading="eager" fetchPriority="high" sizes="(max-width: 900px) 78vw, 520px" /></div>
      </div>
    </header>
  );
}
