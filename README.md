# VVCE — homepage concept

A redesign concept of the [vvce.ac.in](https://vvce.ac.in/) homepage by PulpLabs, in the
house style of srikkec.pulplabs.ai. Live at **https://vvce.pulplabs.ai**.

> Not the official VVCE website, and not affiliated with or endorsed by the college. The
> page carries a disclosure, ships `noindex`, and `robots.txt` disallows crawling.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build
```

`out/` is the static site. Pushing to `main` builds and deploys it to GitHub Pages.

## Checks

```bash
npx serve out -l 3002
```

```bash
node scripts/verify.mjs
```

Seven checks: content reveals on a normal visit, the 3-second failsafe reveals the page
when scripts are blocked, readable with JavaScript off, reduced motion respected, every
link resolves, no sideways scroll on a phone, and page weight.

## Stack

Next.js static export · GSAP + ScrollTrigger · Lenis · Tailwind 4 · Fraunces and Outfit.
All motion lives in `src/components/Motion.tsx`; hidden states are scoped to
`html.motion-ok`, so the page never depends on animation to be visible.
