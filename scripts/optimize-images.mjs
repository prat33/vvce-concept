import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const dir = "public/img";
const files = await readdir(dir);
let before = 0, after = 0;

for (const f of files) {
  const p = path.join(dir, f);
  const ext = path.extname(f).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const sz = (await stat(p)).size; before += sz;
  const base = path.basename(f, ext);
  const isLogo = /logo|acc-|rec-/.test(f);
  const img = sharp(p, { limitInputPixels: false });
  const meta = await img.metadata();
  const maxW = isLogo ? 400 : 1920;
  const w = Math.min(meta.width || maxW, maxW);

  const outWebp = path.join(dir, base + ".webp");
  await sharp(p, { limitInputPixels: false })
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: isLogo ? 90 : 76, effort: 5 })
    .toFile(outWebp);
  after += (await stat(outWebp)).size;

  if (!isLogo) {
    const outAvif = path.join(dir, base + ".avif");
    await sharp(p, { limitInputPixels: false })
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 58, effort: 4 })
      .toFile(outAvif);
    after += (await stat(outAvif)).size;
  }
  await unlink(p);
  console.log(`${base.padEnd(20)} ${meta.width}x${meta.height}  ${Math.round(sz/1024)}KB -> ${Math.round((await stat(outWebp)).size/1024)}KB webp`);
}
console.log(`\nTOTAL ${Math.round(before/1024/1024*10)/10} MB -> ${Math.round(after/1024/1024*10)/10} MB`);
