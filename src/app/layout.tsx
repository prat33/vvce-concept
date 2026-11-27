import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vidyavardhaka College of Engineering | Autonomous engineering college in Mysuru",
  description:
    "VVCE Mysuru — an autonomous engineering college since 1997, NAAC 'A' grade and NBA accredited, affiliated to VTU Belagavi. Admissions open for 2026–27.",
  // Concept work: never indexed, never mistaken for the college's own site.
  robots: { index: false, follow: false, nocache: true },
};

/* Adds `motion-ok` only when scripting runs and reduced motion is off, then
   gives the motion code three seconds to report in. If it never does, the
   class comes off again and every hidden state reverts — the page can never
   be left blank by a script that failed to start. */
const BOOT = `(function(){try{
var d=document.documentElement;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');}
setTimeout(function(){if(!window.__motionReady){d.classList.remove('motion-ok');}},3000);
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
