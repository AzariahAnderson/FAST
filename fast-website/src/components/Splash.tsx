import Image from "next/image";
import knot from "@/assets/knot.webp";

export function Splash() {
  const text = "DEVELOPED BY ATL";
  return (
    <div id="splash">
      <div>
        <Image src={knot} alt="ATL" loading="eager" sizes="(max-width: 700px) 60vw, 320px" />
        <p id="st" aria-label="Developed by ATL">
          {[...text].map((c, i) => <span key={i} aria-hidden="true">{c === " " ? "\u00a0" : c}</span>)}
        </p>
      </div>
    </div>
  );
}
