"use client";
import Image from "next/image";
import { useState } from "react";
import poster from "@/assets/poster.webp";
import { CALLS, HELPLINES, PACK, PANELS, SIGNS, telHref, type PanelKey } from "@/lib/content";
import { Words } from "./Words";

export default function Help() {
  const [key, setKey] = useState<PanelKey | null>(null);
  const [packed, setPacked] = useState<number[]>([]);
  const panel = key ? PANELS[key] : null;
  const toggle = (i: number) => setPacked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <section className="care" id="help">
      <div className="wrap">
        <div className="hd">
          <div>
            <h2><Words text="If you are being hurt, you are not alone." /></h2>
            <p className="sub">It is not your fault, and you do not have to work out everything today. Start with what you need right now. Nothing you tap on this page is saved.</p>
          </div>
          <Image className="poster" src={poster} alt="Stop GBV in South Africa. Our families are sacred. You are loved. Help is available." sizes="(max-width: 900px) 92vw, 500px" loading="lazy" />
        </div>

        <div className="blk">
          <h3>What do you need right now?</h3>
          <div className="pick" role="group" aria-label="Choose your situation">
            {(Object.keys(PANELS) as PanelKey[]).map((k) => (
              <button key={k} type="button" aria-pressed={key === k} onClick={() => setKey(k)}>{PANELS[k].pick}</button>
            ))}
          </div>
          <div className="panel" aria-live="polite">
            {panel ? (
              <div key={key}>
                <h4>{panel.pick}</h4>
                <ol>{panel.steps.map((s) => <li key={s}>{s}</li>)}</ol>
                <div className="calls">{panel.calls.map((c) => <a key={c} className="btn light" href={telHref(CALLS[c].number)}>{CALLS[c].label}</a>)}</div>
              </div>
            ) : <p className="hint">Choose the option that fits best. If you are in danger this second, call 10111 or 112.</p>}
          </div>
        </div>

        <div className="blk">
          <h3>Know the signs</h3>
          <p>Abuse is not only hitting. It is any pattern of control that makes you afraid.</p>
          <div className="signs">{SIGNS.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
          <div className="warn">Leaving can be the most dangerous time. Plan before you go, and call a helpline to plan with someone trained.</div>
        </div>

        <div className="blk">
          <h3>Make a safety plan</h3>
          <p>Keep a bag somewhere the abuser will not look, or with someone you trust. Tick what you have. This list is not stored.</p>
          <div className="pack">{PACK.map((t, i) => <label key={t}><input type="checkbox" checked={packed.includes(i)} onChange={() => toggle(i)} />{t}</label>)}</div>
          <p className="cnt" aria-live="polite">{packed.length ? `${packed.length} of ${PACK.length} packed` : ""}</p>
        </div>

        <div className="blk">
          <h3>Your options in South Africa</h3>
          <div className="two">
            <div>
              <h4>Report to the police</h4><p>You can open a case at any police station. Ask for the case number and the officer&apos;s name. If police do not help, complain on 0800 333 177.</p>
              <h4>Protection order</h4><p>A protection order is free. Apply at your nearest magistrate&apos;s court. It can stop the abuser from contacting you, coming to your home or workplace, and can include your children.</p>
            </div>
            <div>
              <h4>Medical care after sexual assault</h4><p>Go to a Thuthuzela Care Centre or any hospital as soon as you can, ideally within 72 hours. Medicine that helps prevent HIV works best in that window. If you can, avoid washing before you are examined. You can report later.</p>
              <h4>Shelter and counselling</h4><p>The GBV Command Centre can connect you to a social worker and a shelter. Calling a helpline does not start a police case.</p>
            </div>
          </div>
        </div>

        <div className="blk">
          <h3>Free helplines</h3>
          <p>Most are free from any phone and answer around the clock.</p>
          <div className="hot">{HELPLINES.map((h) => <a key={h.name} href={h.href}><b>{h.number}</b>{h.name}<span>{h.note}</span></a>)}</div>
        </div>

        <div className="blk">
          <h3>How FAST fits in</h3>
          <p>FAST does not replace the services above. It helps the people around you act quickly: a hold-to-activate emergency button alerts your trusted contacts with your location, a spoken safeword can start an emergency hands-free, and your safety plan and safe places stay in the app. If someone may check your phone, use a device they cannot reach.</p>
        </div>
        <p className="fine">General information, not legal or medical advice. Numbers checked in October 2026; confirm on official government sites. If you are in immediate danger, call 10111 or 112.</p>
      </div>
    </section>
  );
}
