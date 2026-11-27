/**
 * Robustness checks for the homepage.
 *
 *   node scripts/verify.mjs [baseUrl]
 */
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3002/";
const EXE = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const results = [];
const check = (name, pass, detail) => results.push({ name, pass, detail });

const hiddenCount = (page) =>
  page.evaluate(() => {
    let n = 0;
    const sel = "[data-reveal],[data-hero-line],[data-hero-fade],[data-badge],[data-row],[data-pop],[data-split] .sw > span";
    for (const el of document.querySelectorAll(sel)) {
      const cs = getComputedStyle(el);
      const t = cs.transform;
      const m = t === "none" ? [] : t.split(",");
      const dx = Math.abs(parseFloat(m[4] ?? "0"));
      const dy = Math.abs(parseFloat(m[5] ?? "0"));
      if (parseFloat(cs.opacity) < 0.05 || dy > 4 || dx > 4) n++;
    }
    return n;
  });

/* 1. normal visit: everything revealed after a full scroll */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(110);
  }
  await page.waitForTimeout(1800);
  const hid = await hiddenCount(page);
  check("normal visit: all content revealed", hid === 0 && errs.length === 0, `${hid} still hidden, ${errs.length} JS errors`);
  await ctx.close();
}

/* 2. scripts blocked entirely: the failsafe must reveal the page */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route("**/_next/static/chunks/*.js", (r) => r.abort());
  await page.goto(base, { waitUntil: "domcontentloaded" });
  const early = await page.evaluate(() => document.documentElement.classList.contains("motion-ok"));
  await page.waitForTimeout(3600);
  const late = await page.evaluate(() => document.documentElement.classList.contains("motion-ok"));
  const hid = await hiddenCount(page);
  check(
    "app scripts blocked: failsafe reveals page",
    early && !late && hid === 0,
    `motion-ok at start=${early}, after 3.6s=${late}, ${hid} hidden`,
  );
  await ctx.close();
}

/* 3. JavaScript switched off */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "domcontentloaded" });
  const r = await page.evaluate(() => ({
    chars: document.body.innerText.length,
    hasOffers: /Nagesh S/.test(document.body.innerText),
  }));
  const hid = await hiddenCount(page);
  check("JavaScript off: readable", hid === 0 && r.chars > 3000 && r.hasOffers, `${r.chars} chars, ${hid} hidden`);
  await ctx.close();
}

/* 4. reduced motion */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(() => ({
    motionOk: document.documentElement.classList.contains("motion-ok"),
    lenis: document.documentElement.classList.contains("lenis"),
  }));
  const hid = await hiddenCount(page);
  check("reduced motion: no hiding, no smooth-scroll", !r.motionOk && !r.lenis && hid === 0, `motion-ok=${r.motionOk} lenis=${r.lenis} hidden=${hid}`);
  await ctx.close();
}

/* 5. every in-page link has a target; no sideways scroll on a phone */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const bad = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h.length > 1 && !document.querySelector(h));
    // outbound links are allowed only as https, opening in a new tab with noopener
    const ext = [...document.querySelectorAll("a[href]")]
      .filter((a) => {
        const h = a.getAttribute("href");
        if (h.startsWith("#") || h.startsWith("tel:") || h.startsWith("mailto:")) return false;
        return !(h.startsWith("https://") && a.target === "_blank" && /noopener/.test(a.rel));
      })
      .map((a) => a.getAttribute("href"));
    return {
      bad: [...new Set(bad)],
      ext,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  check("every link resolves", r.bad.length === 0 && r.ext.length === 0, r.bad.length || r.ext.length ? `dead: ${r.bad.join(" ")} external: ${r.ext.join(" ")}` : "all in-page, tel:, mailto: or safe https");
  check("phone: no sideways scroll", r.overflow <= 1, `${r.overflow}px`);
  await ctx.close();
}

/* 6. weight */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const { brotliCompressSync } = await import("node:zlib");
  let wire = 0, raw = 0, n = 0;
  const pend = [];
  page.on("response", (res) =>
    pend.push(res.body().then((b) => {
      n++; raw += b.length;
      const t = res.headers()["content-type"] || "";
      wire += /javascript|css|html|json|svg/.test(t) ? brotliCompressSync(b).length : b.length;
    }).catch(() => {})),
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await Promise.all(pend);
  const fcp = await page.evaluate(() => Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0));
  check("weight (brotli, as served)", wire / 1024 < 1200, `${Math.round(wire / 1024)} KB over ${n} requests · first paint ${fcp} ms`);
  await ctx.close();
}

await browser.close();
const pad = Math.max(...results.map((r) => r.name.length));
for (const r of results) console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name.padEnd(pad)}  ${r.detail}`);
console.log(`\n${results.filter((r) => r.pass).length}/${results.length} passed`);
process.exit(results.every((r) => r.pass) ? 0 : 1);
