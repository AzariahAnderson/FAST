import { EMOJI, QUOTES } from "@/lib/content";
import { Words } from "./Words";

function Row({ id, items, offset }: { id: string; items: string[]; offset: number }) {
  const list = [...items, ...items];
  return (
    <div className="mq" aria-hidden="true">
      <div id={id}>{list.map((t, i) => <span key={i}><b className="e">{EMOJI[(offset + i) % EMOJI.length]}</b>{t}</span>)}</div>
    </div>
  );
}

export function Kindness() {
  return (
    <section className="kind">
      <div className="wrap"><h2><Words text="A little kindness for today." /></h2></div>
      <Row id="m1" items={QUOTES.slice(0, 25)} offset={0} />
      <Row id="m2" items={QUOTES.slice(25)} offset={5} />
      <p className="sr">{QUOTES.join(" ")}</p>
    </section>
  );
}
