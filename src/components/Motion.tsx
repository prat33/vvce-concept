"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/**
 * The page's whole motion system, in one place.
 *
 * Sections are plain server-rendered markup that opt in with data attributes.
 * Nothing here is required to *see* the page: hidden states live in CSS behind
 * `html.motion-ok`, and the boot script removes that class if this never
 * reports ready. `lagSmoothing(0)` means a tab that was backgrounded mid-
 * animation jumps straight to the end state when it comes back, rather than
 * resuming from where it stalled.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-ok")) {
      window.__motionReady = true;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page links glide rather than jump, and clear the floating header.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href") ?? "";
      if (id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -88 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ——— hero: lines rise out of their masks, then the rest settles in
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to("[data-hero-line]", { y: 0, duration: 1.25, stagger: 0.09 }, 0.15)
        .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.6);

      gsap.to(".hero-img-wrap", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });

      // ——— reveals, batched so neighbours stagger together
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.08 }),
      });

      // ——— section headings: words rise out of their masks, like the hero
      ScrollTrigger.batch("[data-split]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((h, i) =>
            gsap.to(h.querySelectorAll(".sw > span"), { y: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, delay: i * 0.08 }),
          ),
      });

      // ——— list rows slide in one after another
      ScrollTrigger.batch("[data-row]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }),
      });

      // ——— admission codes pop in
      ScrollTrigger.batch("[data-pop]", {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.8)", stagger: 0.07 }),
      });

      // ——— reading progress along the top edge
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // ——— words inked in by scroll
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((p) => {
        gsap.to(p.querySelectorAll(".w"), {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 48%", scrub: 0.4 },
        });
      });

      // ——— numbers count up from zero the first time they're seen
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const dec = Number(el.dataset.dec ?? 0);
        const pre = el.dataset.pre ?? "";
        const suf = el.dataset.suf ?? "";
        const sep = el.dataset.sep !== undefined; // 5000 -> "5,000"
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: to,
              duration: 1.6,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = pre + (sep ? Math.round(o.v).toLocaleString("en-IN") : o.v.toFixed(dec)) + suf;
              },
            }),
        });
      });

      // ——— programmes: pinned, scrolled sideways, with a circuit trace that
      //     draws itself along the top as you go. Desktop only; a phone gets a
      //     plain swipeable row.
      mm.add("(min-width: 1024px)", () => {
        const sec = document.querySelector<HTMLElement>("[data-hsection]");
        const track = document.querySelector<HTMLElement>("[data-htrack]");
        const path = document.querySelector<SVGPathElement>("[data-draw]");
        const dot = document.querySelector<SVGCircleElement>("[data-dot]");
        if (!sec || !track) return;

        sec.dataset.pinned = "true";
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

        const st = {
          trigger: sec,
          start: "top top",
          end: () => "+=" + dist(),
          scrub: 0.6,
          invalidateOnRefresh: true,
        };
        gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { ...st, pin: true } });

        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger: st });
          if (dot) {
            const p = { t: 0 };
            gsap.to(p, {
              t: 1,
              ease: "none",
              scrollTrigger: st,
              onUpdate: () => {
                const pt = path.getPointAtLength(p.t * len);
                dot.setAttribute("cx", String(pt.x));
                dot.setAttribute("cy", String(pt.y));
              },
            });
          }
        }
        return () => {
          delete sec.dataset.pinned;
        };
      });

      // ——— ID badges drop on their lanyards and swing to rest
      ScrollTrigger.batch("[data-badge]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: -90, rotate: (i: number) => (i % 2 ? 8 : -8) },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 1.8,
              ease: "elastic.out(1, 0.42)",
              stagger: 0.11,
              transformOrigin: "50% 0%",
              clearProps: "transform",
            },
          ),
      });

      // ——— notice slips drop onto the board
      ScrollTrigger.batch("[data-slip]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: -26,
            opacity: 0,
            rotate: (i) => (i % 2 ? 4 : -4),
            duration: 0.9,
            ease: "back.out(1.6)",
            stagger: 0.12,
            clearProps: "transform",
          }),
      });
    });

    // Late-loading fonts and images change layout; re-measure once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    window.__motionReady = true;

    return () => {
      ctx.revert();
      mm.revert();
      lenis.destroy();
      gsap.ticker.remove(tick);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
