import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
const [dir, prefix, out, cols = "3", w = "620"] = process.argv.slice(2);
const files = (await readdir(dir)).filter((f) => f.startsWith(prefix) && f.endsWith(".png")).sort();
const W = +w, H = Math.round(W * 900 / 1440), C = +cols, R = Math.ceil(files.length / C), PAD = 6;
const tiles = [];
for (const [i, f] of files.entries()) {
  const buf = await sharp(path.join(dir, f)).resize(W, H, { fit: "cover", position: "top" }).toBuffer();
  tiles.push({ input: buf, left: (i % C) * (W + PAD), top: Math.floor(i / C) * (H + PAD) });
}
await sharp({ create: { width: C * (W + PAD), height: R * (H + PAD), channels: 3, background: "#222" } })
  .composite(tiles).png().toFile(out);
console.log(files.length, "tiles ->", out);
