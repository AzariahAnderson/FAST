import { NotifyForm } from "./NotifyForm";
import { Words } from "./Words";

function Action({ href, label }: { href?: string; label: string }) {
  return href ? <a className="btn" href={href} rel="noopener">{label}</a> : <span className="btn" aria-disabled="true">Coming soon</span>;
}

export function Download({ windows, android }: { windows: boolean; android: boolean }) {
  return (
    <section id="download">
      <div className="wrap">
        <h2><Words text="Download FAST." /></h2>
        <p className="dsub">Native apps for your PC and phone.</p>
        <div className="dl">
          <div className="dc"><div><h3>Windows</h3><p>Windows 10 and 11. The full map and family dashboard on a big screen.</p></div><Action href={windows ? "/api/download/windows" : undefined} label="Download for Windows" /></div>
          <div className="dc"><div><h3>Android</h3><p>Journeys, Voice Guard and one-tap emergency in your pocket.</p></div><Action href={android ? "/api/download/android" : undefined} label="Download for Android" /></div>
          <div className="dc"><div><h3>iPhone</h3><p>On its way. Leave your email and we will tell you once it is ready.</p></div><NotifyForm /></div>
        </div>
      </div>
    </section>
  );
}
