// Renders app/icon.svg into favicon.ico (16/32/48) and apple-icon.png (180, square corners).
// Run from frontend/ after editing the SVG: node scripts/make-icons.cjs
const fs = require("fs");
const path = require("path");
const sharp = require(path.resolve("node_modules/sharp"));

const svg = fs.readFileSync("app/icon.svg", "utf8");
const square = svg.replace(/ rx="14"/, "").replace(/<rect x="0.5"[^>]*\/>/, "");

(async () => {
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(svg), { density: 384 }).resize(s, s).png().toBuffer()));
  // ICO container with embedded PNGs
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const dir = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return e;
  });
  fs.writeFileSync("app/favicon.ico", Buffer.concat([header, ...dir, ...pngs]));
  await sharp(Buffer.from(square), { density: 384 }).resize(180, 180).png().toFile("app/apple-icon.png");
  console.log("ok");
})();
