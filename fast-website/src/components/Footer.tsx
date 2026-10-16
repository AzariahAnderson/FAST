import Image from "next/image";
import emblem from "@/assets/emblem.webp";
import knot from "@/assets/knot.webp";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div><Image src={emblem} alt="" width={40} sizes="40px" loading="lazy" /><b>FAST</b> Family Assistance &amp; Safety Technology</div>
        <div className="by"><Image src={knot} alt="" width={30} sizes="30px" loading="lazy" />Developed by ATL</div>
      </div>
    </footer>
  );
}
