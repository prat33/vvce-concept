import Image from "next/image";
import Motion from "@/components/Motion";
import { CampusPanels, ConceptNotice, Events, Header, LogoMarquee } from "@/components/client";
import { clubs, codes, college, departments, placements, rankings, recruiters } from "@/data/site";

/* Words split at render time, so the scroll-inked paragraph needs no DOM
   surgery and reads normally with scripting off. */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className} data-words="">
      {text.split(" ").map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

const offers = [...placements].sort((a, b) => b.lpa - a.lpa).slice(0, 7);

const campus = [
  { title: "The main block", tag: "Academics", img: "/img/main-block.webp", alt: "Aerial view of VVCE's main academic block", text: "Nine departments under one autonomous curriculum, from first-year labs to final-year projects." },
  { title: "From above", tag: "Campus", img: "/img/aerial-wide.webp", alt: "Drone view across the VVCE campus, with the main block, other blocks and the sports field", text: "The main block, the department blocks and the sports field, from the college’s own drone footage." },
  { title: "Sports hall", tag: "Sport", img: "/img/extra-event.webp", alt: "Students playing in the VVCE indoor sports hall", text: "An indoor hall for badminton and court games, open through the week." },
  { title: "Fitness centre", tag: "Wellbeing", img: "/img/extra-gym.webp", alt: "The VVCE gym with treadmills and weights", text: "A fully equipped gym on campus, with cardio and strength floors." },
  { title: "The courtyard", tag: "Campus", img: "/img/campus-1.webp", alt: "A tree-lined courtyard on the VVCE campus", text: "Shaded walks and open lawns between the blocks." },
];

const slips = [
  { kind: "Fee notice", title: "Backlog exam fee — PG, 2023 to 2025 batches", date: "17 Nov 2026", bg: "bg-rose", pin: "bg-coral" },
  { kind: "Examination", title: "Final SEE timetable — I to VII sem B.E., 2022 scheme", date: "14 Nov 2026", bg: "bg-sky", pin: "bg-navy-3" },
  { kind: "Examination", title: "SEE timetable — odd semester 2026–27, 2020 & 2021 schemes", date: "11 Nov 2026", bg: "bg-gold-wash", pin: "bg-gold" },
  { kind: "Admissions", title: "Admissions open — MBA and MCA, academic year 2026–27", date: "2026–27", bg: "bg-mint", pin: "bg-green" },
];

const events = [
  { day: "11", mon: "Nov", title: "Sports Day", kind: "Campus event", cat: "Campus" },
  { day: "11", mon: "Nov", title: "ViceVerse — Ideathon", kind: "Student club", cat: "Clubs" },
  { day: "11", mon: "Nov", title: "Cyber Month 2026", kind: "Campus programme", cat: "Campus" },
  { day: "11", mon: "Nov", title: "DHI VOX — The Communication Club", kind: "Student club", cat: "Clubs" },
  { day: "03", mon: "Oct", title: "Third Graduation Day (Part 1), B.E. 2025–26", kind: "Graduation", cat: "Academic" },
  { day: "08", mon: "Jun", title: "Free online PGCET / KMAT crash course", kind: "Admissions", cat: "Academic" },
];

/* Names and roles exactly as published on vvce.ac.in/about and /principal. */
const leaders = [
  { name: "Dr. B. Sadashive Gowda", role: "Principal", note: "Ph.D, IISc · ISTE Best Principal 2022", img: "/img/lead-principal.webp", strap: "#1c1d45" },
  { name: "Sri Gundappa Gowda", role: "President, Vidyavardhaka Sangha", note: "", img: "/img/lead-president.webp", strap: "#e9a92b" },
  { name: "Sri Shivalingappa B", role: "Vice President", note: "Vidyavardhaka Sangha", img: "/img/lead-vice-president.webp", strap: "#2f7d55" },
  { name: "Sri P. Vishwanath", role: "Secretary", note: "Vidyavardhaka Sangha", img: "/img/lead-secretary.webp", strap: "#c2502f" },
  { name: "Sri Shrishaila Ramannavar", role: "Treasurer", note: "Vidyavardhaka Sangha", img: "/img/lead-treasurer.webp", strap: "#3c3f86" },
];

const band = ["Autonomous institute", "NAAC “A” grade", "NBA accredited · all UG branches", "Affiliated to VTU, Belagavi", "250+ recruiters", "Since 1997"];

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="-mt-[4.6rem]">
        {/* ——— hero ———————————————————————————————————————————————— */}
        <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy">
          <div className="hero-img-wrap absolute inset-0 -z-10">
            <Image src="/img/aerial-hero.webp" alt="Aerial view of the VVCE campus in Mysuru" fill priority sizes="100vw" className="hero-img object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,29,69,.55)_0%,rgba(28,29,69,.15)_35%,rgba(28,29,69,.78)_100%)]" />

          <div className="mx-auto grid w-full max-w-[84rem] items-end gap-10 px-gutter pb-14 pt-40 md:pb-20 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="text-white">
              <p data-hero-fade="" className="eyebrow !text-gold-2">
                Autonomous · NAAC “A” · NBA · Since 1997 · Mysuru
              </p>
              <h1 className="mt-5 text-hero font-normal">
                {["Building engineers", "in Mysuru,", "since 1997."].map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.08em]">
                    <span data-hero-line="" className="block">
                      {l}
                    </span>
                  </span>
                ))}
              </h1>
              <p data-hero-fade="" className="mt-6 max-w-[34rem] text-lead text-white/80">
                {college.name} — an autonomous campus affiliated to VTU, with six B.E. and six
                postgraduate programmes, 250+ faculty and graduates placed at HPE, Juspay and SAP.
              </p>
              <div data-hero-fade="" className="mt-8 flex flex-wrap gap-3">
                <a href="#programmes" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-navy transition-transform hover:scale-[1.03] active:scale-[.97]">
                  Explore programmes <span aria-hidden="true">→</span>
                </a>
                <a href="#campus" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                  See the campus
                </a>
              </div>
            </div>

            {/* floating admissions card */}
            <a
              href="#admissions"
              data-hero-fade=""
              className="group block rounded-[1.6rem] border border-white/20 bg-navy/45 p-6 text-white backdrop-blur-xl transition-transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
                <span className="flex items-center gap-2 text-gold-2">
                  <span className="ping relative inline-block h-2 w-2 rounded-full bg-gold-2" />
                  Admissions open
                </span>
                <span className="text-white/60">BE · MBA · MCA</span>
              </span>
              <span className="mt-5 block text-[0.85rem] text-white/60">Academic year</span>
              <span className="block font-display text-[2.6rem] leading-none">2026–27</span>
              <span className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 font-medium">
                Apply now
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-navy transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </section>

        {/* ——— about ———————————————————————————————————————————————— */}
        <section id="about" className="mx-auto max-w-[84rem] px-gutter py-section">
          <div className="grid items-start gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <div>
              <p data-reveal="" className="eyebrow">About the college</p>
              <h2 data-reveal="" className="mt-3 max-w-[18ch] text-h2 text-navy">
                An autonomous campus with a record to show for it
              </h2>
              <Words
                className="mt-8 max-w-[38ch] font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] leading-[1.35] text-navy"
                text="Since 1997, Vidyavardhaka College of Engineering has trained engineers in Mysuru — writing its own curriculum as an autonomous institute, holding NAAC 'A' and NBA accreditation, and sending graduates into some of India's best engineering teams."
              />
              <a href="#programmes" data-reveal="" className="mt-8 inline-flex items-center gap-2 font-semibold text-navy underline-offset-4 hover:underline">
                See the nine departments →
              </a>
            </div>

            <div data-reveal="" className="rounded-[1.6rem] border border-line bg-card p-7 shadow-[0_30px_60px_-35px_rgba(28,29,69,.35)]">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl text-navy">At a glance</p>
                <p className="text-[0.75rem] text-muted">Admissions 2026–27</p>
              </div>
              <dl className="mt-4 divide-y divide-line">
                {[
                  ["Established", "Vidyavardhaka Sangha, Mysuru", <span key="y" data-count="1997">1997</span>],
                  ["Status", "Affiliated to VTU, Belagavi", "Autonomous"],
                  ["Accreditation", "NBA, all UG branches", "NAAC “A”"],
                  ["Students", "Across UG, PG and research", <span key="s">5,000+</span>],
                  ["Faculty", "Qualified teaching staff", <span key="f" data-count="250" data-suf="+">250+</span>],
                  ["Highest offer", "Mechanical · SPIRE LLC, Dubai", <span key="h" data-count="43.1" data-dec="1" data-pre="₹" data-suf=" L">₹43.1 L</span>],
                ].map(([k, sub, v]) => (
                  <div key={k as string} className="flex items-center justify-between gap-6 py-4">
                    <dt>
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-2">{k}</span>
                      <span className="block text-[0.8rem] text-muted">{sub}</span>
                    </dt>
                    <dd className="tnum shrink-0 font-display text-[1.9rem] leading-none text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ——— gold band ——————————————————————————————————————————— */}
        <div className="border-y border-gold/40 bg-gold py-4 text-navy" aria-label="Accreditation at a glance">
          <div className="marquee">
            {[false, true].map((dup) => (
              <div key={String(dup)} aria-hidden={dup || undefined} className="items-center" style={{ ["--dur" as string]: "38s" }}>
                {band.map((b) => (
                  <span key={b + dup} className="flex items-center whitespace-nowrap font-display text-[clamp(1.3rem,1rem+1.2vw,2.1rem)]">
                    {b}
                    <span className="mx-8 text-navy/40">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ——— programmes: pinned horizontal track ——————————————————— */}
        <section id="programmes" data-hsection="" className="relative overflow-hidden py-section lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
          <svg className="pointer-events-none absolute left-0 top-[11%] hidden h-24 w-full lg:block" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60 H210 L240 30 H520 L548 58 H760 L790 22 H1060 L1088 52 H1440" fill="none" stroke="#d9cfbb" strokeWidth="2" />
            <path data-draw="" d="M0 60 H210 L240 30 H520 L548 58 H760 L790 22 H1060 L1088 52 H1440" fill="none" stroke="#e9a92b" strokeWidth="2.5" strokeLinecap="round" />
            <circle data-dot="" cx="0" cy="60" r="6" fill="#1c1d45" stroke="#e9a92b" strokeWidth="3" />
          </svg>

          <div className="mx-auto w-full max-w-[84rem] px-gutter lg:mt-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p data-reveal="" className="eyebrow">Programmes</p>
                <h2 data-reveal="" className="mt-3 max-w-[16ch] text-h2 text-navy">From first lab to final offer</h2>
              </div>
              <p data-reveal="" className="max-w-sm text-ink-2">
                Nine departments teaching six B.E. and six postgraduate programmes, all on VVCE&rsquo;s own autonomous curriculum.
                <span className="mt-2 hidden text-[0.85rem] text-muted lg:block">Scroll to move through all nine →</span>
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0">
            <ul data-htrack="" className="flex w-max snap-x snap-mandatory gap-5 px-gutter lg:snap-none">
              {departments.map((d, i) => (
                <li key={d.slug} className="w-[19rem] shrink-0 snap-start sm:w-[22rem]">
                  <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={d.image} alt="" fill sizes="22rem" className="object-cover" />
                      <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[0.72rem] font-semibold text-navy backdrop-blur">
                        {d.level === "UG" ? "B.E." : "Postgraduate"} · {d.duration} yrs
                      </span>
                      <span className="absolute right-4 top-4 font-display text-[0.95rem] text-white/90">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-h3 text-navy">{d.name}</h3>
                      <p className="mt-3 line-clamp-3 text-[0.92rem] text-ink-2">{d.intro}</p>
                      <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5">
                        <div>
                          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Intake</dt>
                          <dd className="tnum mt-1 font-display text-2xl text-navy">{d.intake ?? "—"}{d.slug.endsWith("ai-ml") && <sup className="ml-0.5 text-[0.7rem] text-coral">*</sup>}</dd>
                        </div>
                        <div>
                          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Highest offer</dt>
                          <dd className="tnum mt-1 font-display text-2xl text-navy">{d.highest ? d.highest.replace(" LPA", " L") : "—"}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-6 max-w-[84rem] px-gutter text-[0.8rem] text-muted">
            Intake and offers as published on each department&rsquo;s page.{" "}
            <span className="text-coral">*</span> AI &amp; ML intake is 180 on its department page and 360 on the
            Admissions page; shown here as the department page lists it.
          </p>
        </section>

        {/* ——— placements ———————————————————————————————————————————— */}
        <section id="placements" className="relative isolate overflow-hidden bg-navy py-section text-white">
          <div className="mx-auto max-w-[84rem] px-gutter">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p data-reveal="" className="eyebrow !text-gold-2">Placements 2025–26</p>
                <h2 data-reveal="" className="mt-3 text-h2">The offers on the table</h2>
                <div data-reveal="" className="mt-10 flex items-end gap-4">
                  <span className="tnum font-display text-[clamp(4.5rem,3rem+5vw,7.5rem)] leading-[0.85] text-gold-2" data-count="27" data-pre="₹" data-suf="L">
                    ₹27L
                  </span>
                  <span className="pb-2 text-[0.95rem] text-white/70">
                    highest offer this cycle,
                    <br />
                    to a CSE graduate at Juspay
                  </span>
                </div>
                <dl data-reveal="" className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                  {[["250+", "companies visited"], ["₹43.1L", "department record"], ["12", "offers from HPE alone"]].map(([v, l]) => (
                    <div key={l}>
                      <dd className="tnum font-display text-[1.9rem] leading-none text-white">{v}</dd>
                      <dt className="mt-2 text-[0.8rem] text-white/65">{l}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              <ol className="divide-y divide-white/10 border-y border-white/10">
                {offers.map((p, i) => (
                  <li key={p.name} data-reveal="" className="grid grid-cols-[2.2rem_1fr_auto] items-center gap-4 py-4">
                    <span className="tnum text-[0.8rem] text-white/45">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{p.name}</span>
                      <span className="block text-[0.82rem] text-white/60">
                        {p.branch} · {p.company}
                      </span>
                    </span>
                    <span className="tnum font-display text-[1.6rem] text-gold-2">
                      ₹{p.lpa}
                      <span className="ml-1 font-sans text-[0.72rem] text-white/60">LPA</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[84rem] px-gutter pt-16" aria-label="Recruiters">
          <p className="mb-8 text-center text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-ink-2">Among the companies that recruit here</p>
          <LogoMarquee logos={recruiters} />
        </section>

        {/* ——— recognition: the shelf ——————————————————————————————— */}
        <section className="mx-auto max-w-[84rem] px-gutter py-section">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p data-reveal="" className="eyebrow">Recognition</p>
              <h2 data-reveal="" className="mt-3 text-h2 text-navy">A shelf that keeps filling up</h2>
              <div data-reveal="" className="mt-10 flex items-end gap-4">
                <span className="tnum font-display text-[clamp(4.5rem,3rem+5vw,7.5rem)] leading-[0.85] text-navy" data-count="38" data-suf="th">
                  38th
                </span>
                <span className="pb-2 text-[0.95rem] text-ink-2">
                  in India — IIRF engineering
                  <br />
                  colleges survey, 2024
                </span>
              </div>
            </div>
            <ol className="border-t border-line">
              {rankings.map((r, i) => (
                <li key={r.body + r.rank} data-reveal="" className="grid grid-cols-[2.2rem_1fr_auto] items-center gap-4 border-b border-line py-5">
                  <span className="tnum text-[0.8rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[1.25rem] leading-snug text-navy">
                      {r.rank} — {r.scope}
                    </span>
                    <span className="block text-[0.85rem] text-muted">{r.body}</span>
                  </span>
                  <span className="rounded-full border border-line bg-card px-3 py-1 text-[0.72rem] font-medium text-ink-2">
                    {r.body.split(" ")[0]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ——— leadership: ID badges on lanyards ——————————————————— */}
        <section className="overflow-hidden pb-section" aria-labelledby="leaders-h">
          <div className="mx-auto max-w-[84rem] px-gutter text-center">
            <p data-reveal="" className="eyebrow">Leadership</p>
            <h2 id="leaders-h" data-reveal="" className="mt-3 text-h2 text-navy">The people who lead VVCE</h2>
            <p data-reveal="" className="mx-auto mt-4 max-w-xl text-ink-2">
              The college is run by Vidyavardhaka Sangha, a Mysuru education trust founded in 1949 that today runs ten institutions.
            </p>
          </div>
          <ul className="mx-auto mt-6 flex max-w-[84rem] snap-x snap-mandatory gap-6 overflow-x-auto px-gutter pb-10 pt-2 [scrollbar-width:none] lg:justify-center lg:overflow-visible">
            {leaders.map((p) => (
              <li key={p.name} data-badge="" className="group w-[13.5rem] shrink-0 snap-center origin-top transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:rotate-[2.5deg]">
                {/* lanyard and clip */}
                <svg className="mx-auto block" width="74" height="86" viewBox="0 0 74 86" aria-hidden="true">
                  <path d="M10 0 L37 74 L64 0" fill="none" stroke={p.strap} strokeWidth="11" strokeLinejoin="round" />
                </svg>
                <span className="mx-auto -mt-3 block h-5 w-9 rounded-[5px] border border-[#a9abb8] bg-gradient-to-b from-[#e7e8ee] to-[#b8bac6]" aria-hidden="true" />
                <article className="-mt-1 overflow-hidden rounded-2xl border border-line bg-card text-left shadow-[0_24px_40px_-22px_rgba(28,29,69,.45)]">
                  <div className="flex items-center justify-between px-3.5 py-2.5" style={{ background: p.strap }}>
                    <span className="flex items-center gap-2">
                      <Image src="/img/vvce-logo.webp" alt="" width={20} height={20} className="h-5 w-5 rounded-full bg-white p-px" />
                      <span className="text-[0.66rem] font-bold tracking-[0.16em] text-white">VVCE</span>
                    </span>
                    <span className="h-1.5 w-8 rounded-full bg-white/40" aria-hidden="true" />
                  </div>
                  <div className="relative mx-3.5 mt-3.5 aspect-[6/7] overflow-hidden rounded-lg bg-paper-2">
                    <Image src={p.img} alt={`Portrait of ${p.name}`} fill sizes="13.5rem" className="object-cover" />
                  </div>
                  <div className="px-3.5 pb-4 pt-3">
                    <p className="font-display text-[1.05rem] leading-snug text-navy">{p.name}</p>
                    <p className="mt-0.5 text-[0.78rem] font-semibold" style={{ color: p.strap === "#e9a92b" ? "#9a6a0b" : p.strap }}>
                      {p.role}
                    </p>
                    {p.note && <p className="mt-0.5 text-[0.72rem] text-muted">{p.note}</p>}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— campus ———————————————————————————————————————————————— */}
        <section id="campus" className="bg-paper-2 py-section">
          <div className="mx-auto max-w-[84rem] px-gutter">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p data-reveal="" className="eyebrow">Life at VVCE</p>
                <h2 data-reveal="" className="mt-3 max-w-[14ch] text-h2 text-navy">A campus that keeps you busy</h2>
              </div>
              <p data-reveal="" className="max-w-sm text-ink-2">Labs in the morning, courts in the evening, a club for nearly everything in between.</p>
            </div>
            <div data-reveal="" className="mt-12">
              <CampusPanels panels={campus} />
            </div>

            <div className="mt-14">
              <p className="mb-5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-ink-2">Ten student-run clubs</p>
              <div className="marquee [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
                {[false, true].map((dup) => (
                  <div key={String(dup)} aria-hidden={dup || undefined} className="gap-3 pr-3" style={{ ["--dur" as string]: "46s" }}>
                    {clubs.map((c) => (
                      <span key={c.name + dup} className="whitespace-nowrap rounded-full border border-line bg-card px-5 py-3 text-[0.95rem]">
                        <b className="font-semibold text-navy">{c.name}</b>
                        <span className="ml-2 text-muted">{c.blurb}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— notices ——————————————————————————————————————————————— */}
        <section id="notices" className="mx-auto max-w-[84rem] px-gutter py-section">
          <p data-reveal="" className="eyebrow">Campus happenings</p>
          <h2 data-reveal="" className="mt-3 max-w-[16ch] text-h2 text-navy">Circulars &amp; the latest on campus</h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="cork rounded-[1.6rem] p-6 shadow-[inset_0_2px_10px_rgba(0,0,0,.12)] sm:p-8">
              <h3 className="mb-5 font-display text-[1.35rem] text-navy">Notice board</h3>
              <ul className="grid gap-5">
                {slips.map((s, i) => (
                  <li
                    key={s.title}
                    data-slip=""
                    className={`relative rounded-md ${s.bg} px-5 pb-4 pt-6 shadow-[0_8px_18px_-8px_rgba(60,40,10,.45)]`}
                    style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                  >
                    <span className={`absolute left-1/2 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${s.pin} shadow-[0_2px_3px_rgba(0,0,0,.35)]`} aria-hidden="true" />
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink-2">{s.kind}</span>
                    <span className="mt-1 block font-display text-[1.08rem] leading-snug text-navy">{s.title}</span>
                    <span className="mt-1 block text-[0.78rem] text-ink-2">{s.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="">
              <Events events={events} />
              <p className="mt-6 text-[0.8rem] text-muted">Titles and dates as published on vvce.ac.in, November 2026.</p>
            </div>
          </div>
        </section>

        {/* ——— admissions ———————————————————————————————————————————— */}
        <section id="admissions" className="mx-auto max-w-[84rem] px-gutter pb-section">
          <div data-reveal="" className="relative isolate overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 sm:py-20">
            <Image src="/img/aerial-wide.webp" alt="" fill sizes="(max-width: 1344px) 100vw, 84rem" className="-z-10 object-cover opacity-30" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
            <p className="eyebrow !text-gold-2">Admissions 2026–27</p>
            <h2 className="mt-4 max-w-[17ch] text-h2">Admissions for 2026–27 are now open</h2>
            <p className="mt-5 max-w-[34rem] text-lead text-white/75">
              Apply through KCET, COMED-K or PGCET. Enter VVCE using these codes at option entry.
            </p>
            <dl className="mt-8 flex flex-wrap gap-3">
              {codes.slice(0, 5).map((c) => (
                <div key={c.label} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-white/60">{c.label}</dt>
                  <dd className="tnum font-display text-[1.5rem] leading-tight text-gold-2">{c.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`tel:${college.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-navy transition-transform hover:scale-[1.03] active:scale-[.97]">
                Call admissions · {college.phone}
              </a>
              <a href="#programmes" className="inline-flex items-center rounded-full bg-white px-6 py-3.5 font-medium text-navy transition-transform hover:scale-[1.03]">
                Compare programmes
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ——— footer ——————————————————————————————————————————————————— */}
      <footer className="bg-navy text-white/70">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-gutter py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/img/vvce-logo.webp" alt="" width={44} height={44} className="h-11 w-11" />
              <span className="font-display text-xl text-white">VVCE, Mysuru</span>
            </div>
            <p className="mt-4 max-w-sm text-[0.9rem]">
              {college.name} · {college.status} · {college.affiliation} · Est. {college.established}
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/50">On this page</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {[["About", "#about"], ["Programmes", "#programmes"], ["Placements", "#placements"], ["Campus", "#campus"], ["Notices", "#notices"], ["Admissions", "#admissions"]].map(([l, h]) => (
                <li key={h}><a href={h} className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/50">Admissions office</p>
            <p className="mt-4 text-[0.92rem]">
              <a href={`tel:${college.phone.replace(/\s/g, "")}`} className="text-gold-2 hover:underline">{college.phone}</a>
              <br />Mysuru, Karnataka
            </p>
          </div>
        </div>
        <p className="mx-auto max-w-[84rem] border-t border-white/10 px-gutter py-6 text-[0.78rem] text-white/55">
          A redesign concept by PulpLabs — not the official VVCE website, and not affiliated with or endorsed by the
          college. Figures are taken from vvce.ac.in and may be out of date.
        </p>
      </footer>

      {/* floating admissions pill, srikkec-style */}
      <a
        href="#admissions"
        className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full bg-navy py-2 pl-2 pr-4 text-[0.85rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(28,29,69,.6)] transition-transform hover:-translate-y-0.5"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-navy" aria-hidden="true">✎</span>
        Admissions
      </a>

      <ConceptNotice />
      <Motion />
    </>
  );
}
