import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = "out";

async function walk(d) {
  const out = [];
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const toPosix = (p) => p.split(path.sep).join("/");

const pages = await walk(root);
const problems = [];
let links = 0;
let assets = 0;

for (const page of pages) {
  const html = await readFile(page, "utf8");
  const from = "/" + toPosix(path.relative(root, page));

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next/")) continue;
    links++;
    const target = href.endsWith("/")
      ? path.join(root, href, "index.html")
      : path.join(root, href);
    if (!(await exists(target)) && !(await exists(target + ".html"))) {
      problems.push(`DEAD LINK      ${from}  ->  ${href}`);
    }
  }

  for (const m of html.matchAll(/src="(\/[^"?]*)"/g)) {
    const src = m[1];
    if (src.startsWith("/_next/")) continue;
    assets++;
    if (!(await exists(path.join(root, src)))) {
      problems.push(`MISSING ASSET  ${from}  ->  ${src}`);
    }
  }
}

console.log(`pages: ${pages.length}   internal links: ${links}   assets: ${assets}`);

// A build that produced nothing must fail, not quietly pass.
const EXPECTED_MIN_PAGES = 14;
if (pages.length < EXPECTED_MIN_PAGES) {
  console.error(
    `FAIL - expected at least ${EXPECTED_MIN_PAGES} pages, found ${pages.length}. Did the build finish?`,
  );
  process.exit(1);
}

console.log(
  problems.length
    ? problems.join("\n")
    : "OK - every internal link and asset resolves",
);
process.exit(problems.length ? 1 : 0);
