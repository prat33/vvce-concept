"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ——— header ——————————————————————————————————————————————————————— */

const NAV = [
  ["About", "#about"],
  ["Programmes", "#programmes"],
  ["Placements", "#placements"],
  ["Campus", "#campus"],
  ["Notices", "#notices"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      {/* utility strip — the counselling codes, kept to one quiet line */}
      <div className="relative z-40 bg-navy text-[0.78rem] text-white/80">
        <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 px-gutter py-2">
          <p className="truncate">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
            Admissions open for 2026–27 ·{" "}
            <span className="text-white">CET E071 · COMED-K E147</span>{" "}
            <a href="#admissions" className="ml-1 font-medium text-gold-2 underline-offset-4 hover:underline">
              Apply now
            </a>
          </p>
          <p className="hidden shrink-0 gap-5 md:flex">
            <a href="tel:08214276286" className="hover:text-white">0821-427 6286</a>
            <span>Mysuru, Karnataka</span>
          </p>
        </div>
      </div>

      <header className="pointer-events-none sticky top-3 z-50 px-gutter">
        <div
          className={`pointer-events-auto mx-auto flex max-w-[84rem] items-center gap-3 rounded-full border py-2 pl-3 pr-2 transition-[background-color,box-shadow,border-color] duration-300 sm:gap-4 sm:pl-4 sm:pr-3 ${
            solid
              ? "border-line bg-card/90 shadow-[0_10px_40px_-12px_rgba(28,29,69,.25)] backdrop-blur-md"
              : "border-white/25 bg-white/10 backdrop-blur-md"
          }`}
        >
          <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-2.5" aria-label="VVCE — back to top">
            <Image src="/img/vvce-logo.webp" alt="" width={40} height={40} className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" priority />
            <span className="min-w-0 leading-tight">
              {/* the full name always on one line: on phones the size follows the screen width
                  (what's left beside the logo and menu button), from sm up it is fixed */}
              <span
                className={`block whitespace-nowrap font-display text-[clamp(0.69rem,5.4vw-0.5rem,1.05rem)] sm:text-[0.95rem] lg:text-[1.05rem] ${
                  solid ? "text-navy" : "text-white"
                }`}
              >
                Vidyavardhaka College of Engineering
              </span>
              <span className={`block text-[0.68rem] tracking-wide ${solid ? "text-muted" : "text-white/70"}`}>
                Autonomous · Mysuru
              </span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                  solid ? "text-ink-2 hover:bg-paper-2 hover:text-navy" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#admissions"
            className="group ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[0.9rem] font-semibold text-navy transition-transform hover:scale-[1.03] active:scale-[.97] sm:inline-flex lg:ml-2 lg:hidden xl:inline-flex"
          >
            Admission enquiry
            <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[0.8rem] text-gold transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`ml-auto grid h-11 w-11 place-items-center rounded-full lg:hidden sm:ml-1 ${
              solid ? "bg-paper-2 text-navy" : "bg-white/15 text-white"
            }`}
            aria-expanded={open}
            aria-controls="drawer"
          >
            <span className="sr-only">Open menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div id="drawer" className="fixed inset-0 z-[80] flex flex-col bg-navy px-gutter py-6 text-white lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl">VVCE</span>
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
              <span className="sr-only">Close menu</span>
              <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col" aria-label="Primary">
            {[...NAV, ["Admissions", "#admissions"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-display text-3xl">
                {label}
              </a>
            ))}
          </nav>
          <a href="tel:08214276286" className="mt-auto rounded-full bg-gold py-4 text-center font-semibold text-navy">
            Call admissions · 0821-427 6286
          </a>
        </div>
      )}
    </>
  );
}

/* ——— campus: expanding panels ————————————————————————————————————— */

type Panel = { title: string; tag: string; img: string; alt: string; text: string };

export function CampusPanels({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
      {panels.map((p, i) => {
        const on = i === active;
        return (
          <button
            key={p.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={on}
            className={`group relative h-56 overflow-hidden rounded-[1.4rem] text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:h-auto ${
              on ? "lg:grow-[5]" : "lg:grow"
            } lg:basis-0`}
          >
            {/* the open panel's photo drifts in slowly (a Ken Burns push), only where motion is welcome */}
            <Image
              src={p.img}
              alt={p.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-700 ease-out ${on ? "motion-safe:scale-[1.08] motion-safe:duration-[6000ms]" : ""}`}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
            {/* collapsed label, rotated, desktop only */}
            {/* collapsed label: vertical writing, reading bottom-to-top, so it
                can't overflow a narrow strip the way a rotated box does */}
            <span
              className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap font-display text-xl text-white transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
                on ? "opacity-0" : "opacity-100"
              }`}
            >
              {p.title}
            </span>
            <span
              className={`absolute inset-x-0 bottom-0 p-6 text-white transition-opacity duration-500 ${on ? "opacity-100" : "lg:opacity-0"}`}
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-2">{p.tag}</span>
              <span className="mt-1 block font-display text-[1.9rem] leading-tight">{p.title}</span>
              <span className="mt-2 block max-w-md text-[0.95rem] text-white/80">{p.text}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ——— events, filterable ——————————————————————————————————————————— */

type Event = { day: string; mon: string; title: string; kind: string; cat: string };

export function Events({ events }: { events: Event[] }) {
  const cats = ["All", ...Array.from(new Set(events.map((e) => e.cat)))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? events : events.filter((e) => e.cat === cat);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-[1.35rem] text-navy">Latest on campus</h3>
        <div className="flex flex-wrap gap-1 rounded-full bg-paper-2 p-1" role="group" aria-label="Filter events">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={c === cat}
              className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                c === cat ? "bg-navy text-white" : "text-ink-2 hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-5 space-y-2.5" aria-live="polite">
        {/* keyed by filter + title, so switching filters re-mounts the rows and they rise in again */}
        {shown.map((e, i) => (
          <li
            key={cat + e.title}
            className="rise-in flex items-center gap-4 rounded-2xl border border-line bg-card px-4 py-3.5 transition-[box-shadow,translate] duration-300 hover:translate-x-1 hover:shadow-[0_8px_30px_-14px_rgba(28,29,69,.3)]"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <span className="grid w-12 shrink-0 text-center leading-none">
              <span className="tnum font-display text-[1.6rem] text-navy">{e.day}</span>
              <span className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted">{e.mon}</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium text-ink">{e.title}</span>
              <span className="block text-[0.82rem] text-muted">{e.kind}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ——— recruiter marquee with a real pause control ——————————————————— */

export function LogoMarquee({ logos }: { logos: { name: string; img: string }[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="items-center gap-20 pr-20" style={{ ["--dur" as string]: "40s" }}>
      {/* logo files are trimmed to their artwork with the white made transparent (a blend
          mode can't do it: the fade mask isolates the strip); a fixed box keeps tall and wide
          marks at a similar visual size */}
      {logos.map((l) => (
        <span key={l.name + hidden} className="flex h-14 w-40 shrink-0 items-center justify-center">
          <Image
            src={l.img}
            alt={hidden ? "" : l.name}
            width={200}
            height={76}
            className="max-h-12 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </span>
      ))}
    </div>
  );
  return (
    <div>
      <div className="marquee [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" data-paused={paused}>
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mx-auto mt-6 block rounded-full border border-line px-3 py-1.5 text-[0.75rem] font-medium text-ink-2 hover:border-navy/30"
      >
        {paused ? "▶ Play" : "❚❚ Pause"} logos
      </button>
    </div>
  );
}

/* ——— concept disclosure (PulpLabs house pattern) ————————————————————— */

export function ConceptNotice() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem("pulplabs-concept") === "1";
    } catch {}
    if (seen) return;
    // Let the hero land first: appear once the visitor scrolls past most of
    // the first screen, or after eight seconds, whichever comes first. The
    // footer carries the same disclosure permanently.
    // On a phone the hero buttons sit where the bar would land, so wait for the
    // scroll there (by 60% of a screen the buttons have moved up out of its way).
    const show = () => setOpen(true);
    const phone = window.matchMedia("(max-width: 639px)").matches;
    const t = phone ? undefined : setTimeout(show, 8000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  if (!open) return null;
  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem("pulplabs-concept", "1");
    } catch {}
  };
  const gotIt = (cls: string) => (
    <button type="button" onClick={dismiss} className={`shrink-0 rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-medium text-white hover:bg-white/20 ${cls}`}>
      Got it
    </button>
  );
  return (
    // phones: one slim bar, so it never covers the hero buttons; wider screens: the full card
    <aside
      aria-label="About this page"
      className="fixed bottom-20 left-3 right-3 z-[70] flex items-center justify-between gap-3 rounded-full border border-white/10 bg-navy/95 py-1.5 pl-4 pr-1.5 text-[0.75rem] leading-relaxed text-white/75 shadow-2xl backdrop-blur sm:bottom-4 sm:left-4 sm:right-auto sm:block sm:max-w-[21rem] sm:rounded-2xl sm:p-4 sm:text-[0.8rem]"
    >
      <p className="sm:hidden">
        <span className="font-semibold text-white">PulpLabs concept</span> · not VVCE&rsquo;s official site
      </p>
      {gotIt("sm:hidden")}
      <div className="hidden items-start justify-between gap-3 sm:flex">
        <p className="font-semibold text-white">A PulpLabs concept</p>
        {gotIt("")}
      </div>
      <p className="mt-2 hidden sm:block">
        A redesign concept by <span className="text-gold-2">pulplabs.ai</span>, not VVCE&rsquo;s official
        website, and not affiliated with or endorsed by the college. Figures come from vvce.ac.in. To have it
        taken down, email{" "}
        <a href="mailto:contact@pulplabs.ai" className="text-gold-2 underline underline-offset-2">
          contact@pulplabs.ai
        </a>
        .
      </p>
    </aside>
  );
}
