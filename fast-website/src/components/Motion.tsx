"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const $ = (s: string) => document.querySelector<HTMLElement>(s);
const all = (s: string) => gsap.utils.toArray<HTMLElement>(s);

/** Skip heavy motion for reduced-motion, reduced-data and Save-Data users. */
function lite() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(prefers-reduced-data: reduce)").matches || !!c?.saveData;
}

type LenisLike = { raf: (t: number) => void; on: (e: string, cb: () => void) => void; scrollTo: (t: HTMLElement, o?: object) => void; destroy: () => void };

export default function Motion() {
  // Smooth scrolling (loaded on demand, skipped in lite mode)
  useEffect(() => {
    if (lite()) return;
    let lenis: LenisLike | undefined;
    let tick: ((t: number) => void) | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.15 }) as unknown as LenisLike;
      lenis.on("scroll", ScrollTrigger.update);
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!a || !id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => { cancelled = true; document.removeEventListener("click", onClick); if (tick) gsap.ticker.remove(tick); lenis?.destroy(); };
  }, []);

  useGSAP(() => {
    const sp = $("#splash")!, nav = $("#nav")!, body = document.body;
    const hideSplash = () => { sp.style.display = "none"; body.style.overflow = ""; };
    if (lite()) { hideSplash(); return; }
    body.style.overflow = "hidden";

    gsap.set(".w>span", { yPercent: 120, rotate: 7 });
    gsap.set(".emb img", { scale: 0.6, rotate: -14, opacity: 0 });
    gsap.set(".hero .gbv,.hero .lead,.hero .cta,.hero .note", { opacity: 0, y: 34 });
    gsap.set("#st span", { yPercent: 110, opacity: 0 });
    gsap.set("#splash img", { scale: 0.5, rotate: -120, opacity: 0 });

    gsap.timeline()
      .to("#splash img", { scale: 1, rotate: 0, opacity: 1, duration: 1.3, ease: "expo.out" })
      .to("#st span", { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.7, ease: "power4.out" }, "-=0.7")
      .to("#splash img", { scale: 1.06, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 1 }, "-=0.1")
      .to("#splash", { yPercent: -100, duration: 1.1, ease: "expo.inOut", onComplete: hideSplash }, "+=0.05")
      .to("#h1 .w>span", { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.13, ease: "expo.out" }, "-=0.55")
      .to(".emb img", { scale: 1, rotate: 0, opacity: 1, duration: 1.6, ease: "expo.out" }, "<")
      .to(".hero .gbv,.hero .lead,.hero .cta,.hero .note", { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }, "-=1.1");

    gsap.to(".emb", { y: "+=14", repeat: -1, yoyo: true, duration: 3.2, ease: "sine.inOut", delay: 4 });
    gsap.to(".emb img", { rotate: 7, scale: 1.07, yPercent: -5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 } });
    gsap.to(".hero .grid2>div:first-child", { yPercent: -10, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 20%", scrub: true } });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { gsap.to(nav, { y: s.direction === 1 && s.scroll() > 240 ? -110 : 0, duration: 0.45, ease: "power3.out", overwrite: true }); } });

    // headings
    all("section h2").forEach((h) => gsap.to(h.querySelectorAll(".w>span"), { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 86%", once: true } }));

    // feature rows
    all(".row").forEach((r) => {
      const st = { trigger: r, start: "top 88%", once: true };
      gsap.fromTo(r, { "--ln": 0 }, { "--ln": 1, duration: 1.3, ease: "expo.out", scrollTrigger: st });
      gsap.fromTo(r.children, { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: st });
    });

    // pinned horizontal tour
    const tour = $("#tour")!, track = $("#track")!;
    tour.classList.add("pin");
    tour.querySelector<HTMLElement>(".tw")!.style.overflow = "hidden";
    const dist = () => Math.max(0, track.scrollWidth - innerWidth + 40);
    const hz = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: tour, start: "top top", end: () => "+=" + dist() * 1.15, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
    all(".sl").forEach((sl) => {
      const t = (a: string, b: string) => ({ trigger: sl, containerAnimation: hz, start: a, end: b, scrub: true });
      gsap.fromTo(sl.querySelector(".ph"), { scale: 0.8, rotate: 5, y: 40, opacity: 0.45 }, { scale: 1, rotate: 0, y: 0, opacity: 1, ease: "none", scrollTrigger: t("left 95%", "left 55%") });
      gsap.fromTo(sl.querySelector(".scr"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: t("left 100%", "left 40%") });
      gsap.fromTo(sl.querySelector("figcaption"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: t("left 80%", "left 55%") });
    });

    // kindness marquees and emoji
    const mq = ["#m1", "#m2"].map((id, i) => gsap.to(id, { xPercent: i ? 0 : -50, startAt: { xPercent: i ? -50 : 0 }, duration: 80, ease: "none", repeat: -1 }));
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { const v = Math.min(Math.abs(s.getVelocity()) / 350, 8); mq.forEach((t) => gsap.to(t, { timeScale: 1 + v, duration: 0.3, overwrite: "auto" })); } });
    ScrollTrigger.addEventListener("scrollEnd", () => mq.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.4, overwrite: "auto" })));

    // help section
    gsap.to(".care", { borderRadius: "80px", scrollTrigger: { trigger: ".care", start: "top bottom", end: "top 25%", scrub: 1 } });
    gsap.fromTo(".poster", { clipPath: "inset(0 0 100% 0)", scale: 1.08 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".poster", start: "top 85%", once: true } });
    all(".blk").forEach((b) => gsap.from(b.children, { opacity: 0, y: 36, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 82%", once: true } }));
    ScrollTrigger.batch(".signs div,.pack label,.hot a", { start: "top 94%", once: true, onEnter: (b) => gsap.from(b, { opacity: 0, y: 28, scale: 0.96, stagger: 0.06, duration: 0.7, ease: "power3.out" }) });
    ScrollTrigger.batch(".dc", { start: "top 88%", once: true, onEnter: (b) => gsap.from(b, { opacity: 0, y: 60, rotate: -3, stagger: 0.14, duration: 1, ease: "expo.out" }) });

    // pointer effects
    let cleanup: (() => void) | undefined;
    if (matchMedia("(pointer: fine)").matches) {
      const em = $(".emb")!;
      const move = (e: MouseEvent) => gsap.to(em, { x: (e.clientX / innerWidth - 0.5) * 34, duration: 1.1, ease: "power2.out" });
      addEventListener("mousemove", move);
      const btns = all(".btn:not([aria-disabled])").map((b) => {
        const m = (e: MouseEvent) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }); };
        const l = () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.4)" });
        b.addEventListener("mousemove", m); b.addEventListener("mouseleave", l);
        return () => { b.removeEventListener("mousemove", m); b.removeEventListener("mouseleave", l); };
      });
      cleanup = () => { removeEventListener("mousemove", move); btns.forEach((f) => f()); };
    }
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { cleanup?.(); body.style.overflow = ""; };
  }, []);

  return null;
}
