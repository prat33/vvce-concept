import type { CSSProperties, ReactNode } from "react";

/* One drawn scene per programme, in place of campus photos that had nothing to
   do with the subject. Plain server-rendered SVG on a 352 x 176 canvas (the
   card's image slot). Every moving part carries `data-a` and declares its own
   animation in `--a`; globals.css only runs it under html.motion-ok, so with
   reduced motion, scripts off or the failsafe tripped, each scene is a still
   drawing. Parts marked `art-motion-only` only make sense in motion (packets,
   current) and are left out of the still. */

const NAVY = "#1c1d45";
const NAVY2 = "#2a2c63";
const NAVY3 = "#3c3f86";
const GOLD = "#e9a92b";
const GOLD2 = "#f6c65a";
const CORAL = "#c2502f";
const GREEN = "#2f7d55";
const SKY = "#dfe8f8";
const MINT = "#dff1e6";
const WASH = "#fbecc8";
const PAPER2 = "#efe7d8";
const CARD = "#fffdf8";

/** animation props for one moving part: shorthand, transform origin, extra vars */
const a = (anim: string, origin = "center", vars: Record<string, string> = {}) => ({
  "data-a": "",
  style: { "--a": anim, "--o": origin, ...vars } as CSSProperties,
});

const f = (n: number) => n.toFixed(1);

/** a spur gear outline centred on (cx, cy) */
function gear(cx: number, cy: number, rOut: number, rIn: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    for (const [t, r] of [[0, rIn], [0.13, rOut], [0.37, rOut], [0.5, rIn]] as const) {
      const ang = (i + t) * step;
      pts.push(`${f(cx + r * Math.cos(ang))} ${f(cy + r * Math.sin(ang))}`);
    }
  }
  return `M${pts.join(" L")} Z`;
}

/** a run of sine-like waves from x0, `n` periods long */
function wave(x0: number, y: number, period: number, amp: number, n: number) {
  const h = period / 4;
  let d = `M${x0} ${y}`;
  for (let i = 0; i < n; i++) d += ` q${h} ${-amp} ${h * 2} 0 q${h} ${amp} ${h * 2} 0`;
  return d;
}

function Dots({ id, color, opacity }: { id: string; color: string; opacity: number }) {
  return (
    <>
      <defs>
        <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={color} fillOpacity={opacity} />
        </pattern>
      </defs>
      <rect width="352" height="176" fill={`url(#dots-${id})`} />
    </>
  );
}

/* ——— the scenes ———————————————————————————————————————————————— */

function Code() {
  const lines: [number, number, number, string, number][] = [
    [110, 82, 58, GOLD, 1],
    [122, 96, 86, "#ffffff", 0.55],
    [122, 110, 52, SKY, 0.75],
    [134, 124, 70, "#ffffff", 0.35],
    [110, 138, 34, GOLD, 1],
  ];
  return (
    <>
      <Dots id="cse" color="#ffffff" opacity={0.08} />
      <path d="M76 80 L56 100 L76 120" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" {...a("art-float 5s ease-in-out infinite")} />
      <path d="M276 80 L296 100 L276 120" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" {...a("art-float 5s ease-in-out -2.5s infinite")} />
      <rect x="96" y="46" width="160" height="108" rx="12" fill={NAVY2} stroke={NAVY3} strokeWidth="1.5" />
      <circle cx="111" cy="58" r="3.2" fill={CORAL} />
      <circle cx="121" cy="58" r="3.2" fill={GOLD} />
      <circle cx="131" cy="58" r="3.2" fill="#3fa36f" />
      <line x1="96" y1="69" x2="256" y2="69" stroke={NAVY3} />
      {lines.map(([x, y, w, c, o], i) => (
        <rect key={y} x={x} y={y - 3} width={w} height="6" rx="3" fill={c} fillOpacity={o} {...a(`art-type 6s cubic-bezier(.16,1,.3,1) ${i * 0.35}s infinite both`, "left center")} />
      ))}
      <rect x="148" y="132" width="2.5" height="12" fill={GOLD2} {...a("art-blink 1s steps(1) infinite")} />
    </>
  );
}

function Neural() {
  const L1 = [64, 100, 136].map((y) => [100, y]);
  const L2 = [46, 82, 118, 154].map((y) => [176, y]);
  const L3 = [82, 118].map((y) => [252, y]);
  const edges = [...L1.flatMap((p) => L2.map((q) => [p, q])), ...L2.flatMap((p) => L3.map((q) => [p, q]))];
  // edges that carry a travelling signal: [from, to, delay]
  const live: [number[], number[], number][] = [
    [L1[0], L2[1], 0], [L1[1], L2[0], 0.25], [L1[2], L2[2], 0.5], [L1[1], L2[3], 0.75],
    [L2[1], L3[0], 1.1], [L2[2], L3[1], 1.35], [L2[0], L3[0], 1.6], [L2[3], L3[1], 1.85],
  ];
  return (
    <>
      <Dots id="aiml" color={NAVY} opacity={0.1} />
      {edges.map(([p, q], i) => (
        <path key={i} d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
      ))}
      {live.map(([p, q, d], i) => (
        <path
          key={i}
          d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`}
          pathLength={100}
          stroke={GOLD}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 100"
          strokeDashoffset={14}
          fill="none"
          {...a(`art-flow 2.2s linear ${d}s infinite`)}
        />
      ))}
      {[...L1, ...L2].map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7.5" fill={CARD} stroke={NAVY} strokeWidth="2" {...(x === 176 ? a(`art-pulse 2.2s ease-in-out ${0.6 + i * 0.2}s infinite`) : {})} />
      ))}
      {L3.map(([x, y], i) => (
        <circle key={y} cx={x} cy={y} r="9" fill={GOLD} stroke={NAVY} strokeWidth="2" {...a(`art-pulse 2.2s ease-in-out ${1.5 + i * 0.3}s infinite`, "center", { "--s": "1.3" })} />
      ))}
    </>
  );
}

function Data() {
  return (
    <>
      <Dots id="ise" color={GREEN} opacity={0.14} />
      <path d="M74 58 V130 A34 10 0 0 0 142 130 V58" fill={CARD} stroke={GREEN} strokeWidth="2" />
      <ellipse cx="108" cy="58" rx="34" ry="10" fill="#c9e7d4" stroke={GREEN} strokeWidth="2" />
      <path d="M74 82 A34 10 0 0 0 142 82 M74 106 A34 10 0 0 0 142 106" fill="none" stroke={GREEN} strokeWidth="2" />
      <circle cx="128" cy="96" r="3" fill={GOLD} {...a("art-blink 1.4s steps(1) infinite")} />
      <circle cx="128" cy="120" r="3" fill={GOLD} {...a("art-blink 1.4s steps(1) -0.7s infinite")} />
      <path d="M150 96 H208" stroke={NAVY} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 6" />
      {[0, 0.8, 1.6].map((d) => (
        <rect key={d} className="art-motion-only" x="146" y="92" width="8" height="8" rx="2" fill={GOLD} {...a(`art-packet 2.4s ease-in-out ${d}s infinite both`, "center", { "--x": "58px" })} />
      ))}
      {[[118, GREEN, 0], [98, "#5fa883", -1.3], [78, CARD, -2.6]].map(([y, c, d]) => (
        <path
          key={y as number}
          d={`M256 ${(y as number) - 20} L300 ${y} L256 ${(y as number) + 20} L212 ${y} Z`}
          fill={c as string}
          stroke={GREEN}
          strokeWidth="2"
          strokeLinejoin="round"
          {...a(`art-float 4s ease-in-out ${d}s infinite`, "center", { "--y": "-5px" })}
        />
      ))}
    </>
  );
}

function Signal() {
  const pins = [72, 85, 99, 112];
  return (
    <>
      <Dots id="ece" color={NAVY} opacity={0.1} />
      <defs>
        <clipPath id="ece-clip">
          <rect x="152" y="40" width="146" height="104" />
        </clipPath>
      </defs>
      <g clipPath="url(#ece-clip)">
        <path d={wave(116, 92, 36, 14, 6)} fill="none" stroke={NAVY} strokeOpacity="0.25" strokeWidth="2" {...a("art-slide 2.2s linear infinite", "center", { "--x": "36px" })} />
        <path d={wave(102, 92, 50, 24, 5)} fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" {...a("art-slide 1.4s linear infinite", "center", { "--x": "50px" })} />
      </g>
      <line x1="146" y1="92" x2="152" y2="92" stroke={NAVY} strokeWidth="3" />
      {[16, 26, 36].map((r, i) => (
        <path key={r} d={`M${300 + r * 0.2} ${92 - r} A${r} ${r} 0 0 1 ${300 + r * 0.2} ${92 + r}`} fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" {...a(`art-glow 1.8s ease-in-out ${i * 0.3}s infinite`, "center", { "--lo": "0.15", "--hi": "0.9" })} />
      ))}
      {pins.map((p) => (
        <g key={p} stroke={NAVY} strokeWidth="3" strokeLinecap="round">
          <line x1="70" y1={p} x2="78" y2={p} />
          <line x1="138" y1={p} x2="146" y2={p} />
          <line x1={p + 6} y1="54" x2={p + 6} y2="62" />
          <line x1={p + 6} y1="122" x2={p + 6} y2="130" />
        </g>
      ))}
      <rect x="78" y="62" width="60" height="60" rx="8" fill={NAVY} />
      <rect x="93" y="77" width="30" height="30" rx="4" fill={GOLD2} {...a("art-glow 2.4s ease-in-out infinite", "center", { "--lo": "0.35", "--hi": "1" })} />
      <rect x="93" y="77" width="30" height="30" rx="4" fill="none" stroke={GOLD2} strokeWidth="2" />
    </>
  );
}

function Circuit() {
  const loop = "M112 64 H240 Q252 64 252 76 V128 Q252 140 240 140 H112 Q100 140 100 128 V76 Q100 64 112 64 Z";
  return (
    <>
      <Dots id="eee" color="#ffffff" opacity={0.07} />
      <path d={loop} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" />
      {/* battery */}
      <rect x="92" y="94" width="16" height="16" fill={NAVY2} />
      <line x1="86" y1="98" x2="114" y2="98" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <line x1="93" y1="107" x2="107" y2="107" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      {/* resistor */}
      <rect x="244" y="86" width="16" height="32" fill={NAVY2} />
      <polyline points="252,86 259,90 245,96 259,102 245,108 259,114 252,118" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2" strokeLinejoin="round" />
      {/* current */}
      {[0, 1, 2, 3].map((i) => {
        const m = a(`art-orbit 4s linear ${-i}s infinite`, "0 0");
        return <circle key={i} className="art-motion-only" r="3.5" fill={GOLD2} data-a="" style={{ ...m.style, offsetPath: `path("${loop}")`, offsetRotate: "0deg" }} />;
      })}
      {/* bulb */}
      <circle cx="176" cy="64" r="30" fill={GOLD2} {...a("art-glow 2.4s ease-in-out infinite", "center", { "--lo": "0.08", "--hi": "0.3" })} />
      <rect x="170" y="74" width="12" height="9" rx="2" fill="#c9cbe0" />
      <circle cx="176" cy="64" r="13" fill={GOLD2} />
      <path d="M170 65 q1.5 -6 3 0 t3 0 t3 0 t3 0" fill="none" stroke={NAVY} strokeWidth="1.5" />
      {/* bolt */}
      <polygon points="184,86 166,110 178,110 170,128 192,102 180,102 188,86" fill={GOLD} {...a("art-pulse 2.4s ease-in-out infinite", "center", { "--s": "1.1" })} />
    </>
  );
}

function Gears() {
  return (
    <>
      <Dots id="mech" color={NAVY} opacity={0.1} />
      <g {...a("art-spin 14s linear infinite")}>
        <path d={gear(150, 98, 46, 37, 12)} fill={NAVY} />
        <circle cx="150" cy="98" r="22" fill="none" stroke={NAVY3} strokeWidth="2" />
        <circle cx="150" cy="98" r="12" fill={PAPER2} />
      </g>
      <g {...a("art-spin-rev 9.33s linear infinite")}>
        <path d={gear(215, 66, 31, 24, 8)} fill={GOLD} />
        <circle cx="215" cy="66" r="9" fill={PAPER2} />
      </g>
      <g {...a("art-spin 7s linear infinite")}>
        <path d={gear(243, 100, 20, 14, 6)} fill={CORAL} />
        <circle cx="243" cy="100" r="6" fill={PAPER2} />
      </g>
    </>
  );
}

function Bridge() {
  const hangers = [132, 144, 156, 168, 180, 192, 204, 216].map((x) => {
    const t = (x - 120) / 112;
    return [x, 52 + 196 * t * (1 - t)];
  });
  return (
    <>
      <Dots id="civil" color={NAVY} opacity={0.1} />
      <rect y="132" width="352" height="44" fill="#c8d6ef" />
      <path d={wave(-40, 146, 40, 5, 11)} fill="none" stroke={NAVY} strokeOpacity="0.22" strokeWidth="2" {...a("art-slide 3s linear infinite", "center", { "--x": "40px" })} />
      <path d={wave(0, 160, 40, 4, 11)} fill="none" stroke={NAVY} strokeOpacity="0.15" strokeWidth="2" {...a("art-slide 4.5s linear infinite", "center", { "--x": "-40px" })} />
      <path d="M30 108 Q88 92 120 52 M120 52 Q176 150 232 52 M232 52 Q264 92 322 108" fill="none" stroke={NAVY} strokeWidth="2.5" />
      {hangers.map(([x, y]) => (
        <line key={x} x1={x} y1={y} x2={x} y2="114" stroke={NAVY} strokeOpacity="0.5" strokeWidth="1.5" />
      ))}
      <rect x="116" y="50" width="8" height="90" rx="2" fill={NAVY} />
      <rect x="228" y="50" width="8" height="90" rx="2" fill={NAVY} />
      <rect x="26" y="114" width="300" height="6" rx="2" fill={NAVY} />
      <g {...a("art-drive 6s linear infinite", "center", { "--x": "262px" })}>
        <rect x="34" y="104" width="22" height="9" rx="3" fill={GOLD} />
        <rect x="39" y="100" width="11" height="6" rx="2" fill={GOLD} />
        <circle cx="39" cy="113" r="2.4" fill={NAVY} />
        <circle cx="51" cy="113" r="2.4" fill={NAVY} />
      </g>
    </>
  );
}

function Growth() {
  const bars: [number, number, string, number][] = [
    [100, 34, GREEN, 0.45],
    [136, 52, GREEN, 0.6],
    [172, 44, GREEN, 0.55],
    [208, 70, GREEN, 0.8],
    [244, 90, GOLD, 1],
  ];
  return (
    <>
      <Dots id="mba" color={GREEN} opacity={0.14} />
      <line x1="88" y1="142" x2="280" y2="142" stroke={NAVY} strokeOpacity="0.3" strokeWidth="2" />
      {bars.map(([x, h, c, o], i) => (
        <rect key={x} x={x} y={142 - h} width="24" height={h} rx="4" fill={c} fillOpacity={o} {...a(`art-grow 6s cubic-bezier(.16,1,.3,1) ${i * 0.12}s infinite both`, "center bottom")} />
      ))}
      <polyline points="112,98 148,80 184,88 220,62 256,40" pathLength={100} fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" {...a("art-draw 6s ease-in-out 0.4s infinite both")} />
      {/* the end dot comes and goes with the line, and pulses while it's there */}
      <circle cx="256" cy="40" r="5" fill={NAVY} {...a("art-appear 6s ease-in-out 0.4s infinite both, art-pulse 2s ease-in-out infinite", "center", { "--s": "1.35" })} />
    </>
  );
}

function Apps() {
  const rows = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      <Dots id="mca" color="#ffffff" opacity={0.08} />
      <defs>
        <clipPath id="mca-screen">
          <rect x="110" y="52" width="50" height="88" rx="4" />
        </clipPath>
      </defs>
      <rect x="104" y="40" width="62" height="112" rx="12" fill={NAVY2} stroke={NAVY3} strokeWidth="2" />
      <rect x="127" y="45" width="16" height="3" rx="1.5" fill={NAVY3} />
      <g clipPath="url(#mca-screen)">
        <g {...a("art-scroll-y 4s linear infinite", "center", { "--y": "-48px" })}>
          {rows.map((k) => (
            <rect key={k} x="114" y={56 + k * 24} width="42" height="18" rx="4" fill={k % 2 ? SKY : GOLD} fillOpacity={k % 2 ? 0.35 : 0.9} />
          ))}
        </g>
      </g>
      <g {...a("art-spin 3s linear infinite")}>
        <path d="M169 96 A9 9 0 0 1 187 96" fill="none" stroke={GOLD2} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M187 96 A9 9 0 0 1 169 96" fill="none" stroke={GOLD2} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 40" />
        <path d="M184 91 L187 96 L191 92" fill="none" stroke={GOLD2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="194" y="56" width="118" height="84" rx="10" fill={NAVY2} stroke={NAVY3} strokeWidth="2" />
      <line x1="194" y1="70" x2="312" y2="70" stroke={NAVY3} />
      <circle cx="205" cy="63" r="2.6" fill={CORAL} />
      <circle cx="213" cy="63" r="2.6" fill={GOLD} />
      <circle cx="221" cy="63" r="2.6" fill="#3fa36f" />
      <rect x="204" y="80" width="44" height="48" rx="5" fill={GOLD} fillOpacity="0.9" />
      {[[258, 84, 42], [258, 96, 30], [258, 108, 38], [258, 120, 22]].map(([x, y, w], i) => (
        <rect key={y} x={x} y={y} width={w} height="6" rx="3" fill="#ffffff" fillOpacity="0.5" {...a(`art-type 5s cubic-bezier(.16,1,.3,1) ${i * 0.3}s infinite both`, "left center")} />
      ))}
    </>
  );
}

const SCENES: Record<string, { bg: string; dark?: boolean; draw: () => ReactNode }> = {
  "computer-science-engineering": { bg: NAVY, dark: true, draw: Code },
  "computer-science-engineering-ai-ml": { bg: SKY, draw: Neural },
  "information-science-engineering": { bg: MINT, draw: Data },
  "electronics-communication-engineering": { bg: WASH, draw: Signal },
  "electrical-electronics-engineering": { bg: NAVY2, dark: true, draw: Circuit },
  "mechanical-engineering": { bg: PAPER2, draw: Gears },
  "civil-engineering": { bg: SKY, draw: Bridge },
  "business-administration": { bg: MINT, draw: Growth },
  "computer-applications": { bg: NAVY, dark: true, draw: Apps },
};

export function isDarkScene(slug: string) {
  return Boolean(SCENES[slug]?.dark);
}

export default function ProgramArt({ slug }: { slug: string }) {
  const s = SCENES[slug];
  if (!s) return null;
  return (
    <svg
      viewBox="0 0 352 176"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ background: s.bg }}
      aria-hidden="true"
    >
      {s.draw()}
    </svg>
  );
}
