import Image from "next/image";
import emblem from "@/assets/emblem.webp";

const Logo = () => <Image className="s-logo" src={emblem} alt="" sizes="120px" />;

const BODIES: React.ReactNode[] = [
  (<><div className="bd c1"><Logo /><div className="s-wm">FAST</div><div className="s-sub">Family Assistance &amp; Safety Technology</div><div className="s-h2">Stay close. Stay safe.</div><p className="s-p ctr">A private safety network for the people who matter. Location is shared only with consent, always.</p><div className="s-btn">Get started</div></div></>),
  (<><div className="bd"><div className="s-brand"><Logo /><b>FAST</b></div><div className="s-h mt">Let&apos;s get you connected.</div><p className="s-p">Your phone number identifies your FAST account, like WhatsApp. No email needed.</p><div className="s-lbls"><span>Country</span><span>Phone number</span></div><div className="s-row"><div className="s-fld">South Africa</div><div className="s-fld">+27 82 555 0123</div></div><div className="s-btn in">Continue</div><p className="s-note">We send a one-time code to confirm it is you.</p></div></>),
  (<><div className="map"><svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice"><rect width="100" height="160" fill="#f4edc9"/><path d="M-5 92 C18 84 30 100 52 88 S84 66 106 74" fill="none" stroke="#d6e4e8" strokeWidth="8"/><path d="M-5 30 L106 62 M-5 52 L106 20 M20 -5 L34 165 M60 -5 L52 165 M-5 120 L106 138 M-5 146 L106 118 M80 -5 L96 165" fill="none" stroke="#fffdf3" strokeWidth="2.2" strokeLinecap="round"/><path d="M-5 150 C20 120 40 118 58 96 S92 50 106 38" fill="none" stroke="#eab27a" strokeWidth="3.6" strokeLinecap="round"/><path d="M10 40 L44 44 M64 30 L90 36 M8 108 L38 112 M66 118 L96 108" fill="none" stroke="#fffdf3" strokeWidth="1.2" strokeLinecap="round"/></svg><div className="m-search">Search any place...</div><div className="m-av a1">AA<i></i></div><span className="m-you">You</span><div className="m-av a2">MM<i></i></div><div className="m-zoom"><b>+</b><b>&#8722;</b></div><div className="m-pill">Cartoon</div></div></>),
  (<><div className="bd"><div className="sk w1"></div><div className="sk w2"></div><div className="sk w3"></div><div className="sk w2"></div><div className="dimmer"></div><div className="s-card pop"><svg className="x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="#1f1b19" strokeWidth="2" strokeLinecap="round"/></svg><div className="s-h3">Feeling good, noted.</div><p className="s-p sm">Thanks for checking in with yourself.</p><svg className="face" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#f5c45a"/><circle cx="23" cy="26" r="3.2" fill="#1f1b19"/><circle cx="41" cy="26" r="3.2" fill="#1f1b19"/><path d="M20 38c6 8 18 8 24 0" fill="none" stroke="#1f1b19" strokeWidth="3.2" strokeLinecap="round"/></svg><p className="s-p ctr">Love that. A good day is worth noticing. You are doing better than you think.</p><div className="s-btn in">Thank you</div><p className="s-note">If you are struggling, the Suicide Crisis Helpline is free, 24/7: 0800 567 567</p></div></div></>),
  (<><div className="bd chat"><div className="c-head"><b className="c-ic"><svg viewBox="0 0 24 24"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff"/></svg></b><div><b>FAST AI</b><small><i></i>Live AI</small></div><span className="c-mem">Memory</span></div><div className="c-u">What is FAST?</div><div className="c-a"><p>I can help with anything in FAST:</p><ul><li>Family setup and join codes</li><li>Check-ins and the safety timer</li><li>Journeys with live tracking</li><li>Voice Guard, a spoken safeword</li><li>Emergencies and the SOS flow</li></ul></div><div className="c-u">What can you do?</div><div className="c-a"><p>I am FAST AI. Ask how anything works, or tell me what you are trying to do.</p></div><div className="c-in"><span>Type a message...</span><b><svg viewBox="0 0 24 24"><path d="M12 19V6M6 11l6-6 6 6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></b></div></div></>),
];

/** Consistent phone screens drawn in HTML/CSS: crisp at any size and zero image weight. */
export function Frame({ index }: { index: number }) {
  return (
    <div className="scr">
      <div className="isl" />
      <div className="sb"><span>9:41</span><b className="bt" /></div>
      {BODIES[index]}
      <div className="hb" />
    </div>
  );
}
