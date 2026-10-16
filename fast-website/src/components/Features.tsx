import { FEATURES } from "@/lib/content";
import { Words } from "./Words";

export function Features() {
  return (
    <section id="features" className="featsec">
      <div className="wrap feat">
        <div><h2><Words text="What FAST does when it matters." /></h2></div>
        <div>
          {FEATURES.map(([name, text]) => (
            <div className="row" key={name}><h3>{name}</h3><p>{text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
