import { SCREENS } from "@/lib/content";
import { Frame } from "./Screens";
import { Words } from "./Words";

export function Tour() {
  return (
    <section className="tour" id="tour">
      <div className="wrap tourhead">
        <h2><Words text="Take a look inside" /></h2>
        <p className="tsub">Scroll to move through FAST, one screen at a time.</p>
      </div>
      <div className="tw">
        <div className="track" id="track">
          {SCREENS.map((s, i) => (
            <figure className="sl" key={s.title}>
              <div className="ph" role="img" aria-label={s.alt}><Frame index={i} /></div>
              <figcaption><h3>{s.title}</h3><p>{s.text}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
