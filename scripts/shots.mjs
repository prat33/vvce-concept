/**
 * Walk the homepage the way a visitor scrolls it and photograph each stop,
 * so scroll-driven motion is captured in its finished state.
 *
 *   node scripts/shots.mjs <outDir> [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const [out = "shots", base = "http://localhost:3002/"] = process.argv.slice(2);
const EXE = "C:/Program Files/Google/Chrome/Application/chrome.exe";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: EXE, headless: true });

for (const [device, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: device === "mobile" ? 2 : 1,
    isMobile: device === "mobile",
    hasTouch: device === "mobile",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${out}/${device}-00.png` });

  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  let n = 1;
  for (let y = height * 0.85; y < h; y += height * 0.85) {
    // creep, so ScrollTrigger sees a continuous scroll rather than a jump
    await page.evaluate(async (target) => {
      const from = window.scrollY;
      for (let k = 1; k <= 10; k++) {
        window.scrollTo(0, from + ((target - from) * k) / 10);
        await new Promise((r) => setTimeout(r, 40));
      }
    }, y);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `${out}/${device}-${String(n).padStart(2, "0")}.png` });
    n++;
  }
  const info = await page.evaluate(() => ({
    motionOk: document.documentElement.classList.contains("motion-ok"),
    ready: !!window.__motionReady,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  console.log(`${device}: ${n} frames  height=${info.height}  motion-ok=${info.motionOk} ready=${info.ready}  overflowX=${info.overflow}  errors=${errors.length}`);
  if (errors.length) console.log("   " + errors.slice(0, 4).join("\n   "));
  await ctx.close();
}
await browser.close();
