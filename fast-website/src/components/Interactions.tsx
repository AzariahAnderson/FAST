"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ROW_TIPS, TIP_RULES } from "@/lib/content";
import { initInteractions } from "./interactions-core";

function lite() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(prefers-reduced-data: reduce)").matches || !!c?.saveData;
}

/** Custom 3D cursor, hover info bubbles, animated right-click menu and animated emoji. */
export default function Interactions() {
  useEffect(() => initInteractions(gsap, { lite: lite(), tips: { rules: TIP_RULES, rows: ROW_TIPS } }), []);
  return (
    <>
<div id="cur" aria-hidden="true"><div className="c3"><svg viewBox="0 0 44 52"><defs><linearGradient id="cf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffc9cc"/><stop offset=".55" stopColor="#e79da0"/><stop offset="1" stopColor="#c9606c"/></linearGradient><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b6e3c4"/><stop offset=".55" stopColor="#479b63"/><stop offset="1" stopColor="#2f7347"/></linearGradient><linearGradient id="ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".9"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><filter id="cs" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter></defs><g strokeLinejoin="round" strokeWidth="1.8"><path d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" transform="translate(5 8)" fill="#1f1b19" opacity=".28" filter="url(#cs)"/><path className="d3" stroke="#8d3f4a" d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" transform="translate(3.2 4.6)"/><path className="d2" stroke="#a94c58" d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" transform="translate(2.1 3)"/><path className="d1" stroke="#c0616c" d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" transform="translate(1 1.4)"/><path d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" fill="url(#cf)" stroke="#fffdfb"/><path className="hv" d="M5 3L5 38L13.5 30.2L19.8 44.5L27 41.3L20.7 27.2L32.5 27.2Z" fill="url(#cg)" stroke="#fffdfb"/><path d="M8.2 9L8.2 31L12 27.6Z" fill="url(#ch)" stroke="none"/></g></svg></div></div>
<div id="tip" role="tooltip" />
<div id="ctx" role="menu" aria-label="Quick menu" hidden><button role="menuitem" data-act="sel" hidden>Copy selected text</button><a role="menuitem" href="#download">Download FAST</a><a role="menuitem" href="#help">Get help now</a><a role="menuitem" href="#tour">Take a look inside</a><a role="menuitem" href="#features">What FAST does</a><hr role="separator" /><button role="menuitem" data-act="link">Copy page link</button><button role="menuitem" data-act="top">Back to top</button></div>

    </>
  );
}
