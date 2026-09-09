/**
 * Article illustration generator.
 *
 * Renders a seeded line drawing for every article in data/thoughts.json:
 * one continuous ink line through a flow field, an echo hairline, a soft
 * tinted spot, on cream paper with grain. The same seed (the slug) produces
 * the same drawing every time, so images are reproducible and the set stays
 * visually consistent.
 *
 * Output (per article):
 *   public/images/thoughts/<slug>.png      800 x 800   thumbnail
 *   public/images/thoughts/<slug>-og.png   1200 x 630  Open Graph
 *
 * Usage:
 *   npm run images:articles            # all articles
 *   npm run images:articles -- <slug>  # one article
 *   FORCE=1 npm run images:articles    # overwrite existing files
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const DATA = path.join(ROOT, 'data', 'thoughts.json');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'thoughts');

// Site palette. Ground and ink come from globals.css; the tints are the
// per-section page backgrounds in PageBackground.tsx.
const PALETTE = {
  ground: '#F7F5F2',
  ink: '#3C3A37',
  rule: '#3C3A37',
  tints: {
    green: '#D6E4DE',
    tan: '#EAD9C8',
    lavender: '#D4D8E8',
    ochre: '#E8E0C4',
  },
};

// Category to accent tint. An article can override with an `accent` field
// in thoughts.json using one of the tint names above.
const CATEGORY_TINT = {
  'AI & Development': 'lavender',
  'Product Design': 'tan',
  Productivity: 'green',
  Design: 'ochre',
};

// ---------- seeded randomness ----------

function hash(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- noise ----------

/** Smooth 2D value noise in [0, 1], seeded. */
function makeNoise(rand) {
  const SIZE = 256;
  const grid = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < grid.length; i++) grid[i] = rand();
  const at = (x, y) => grid[((y % SIZE) + SIZE) % SIZE * SIZE + (((x % SIZE) + SIZE) % SIZE)];
  const fade = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = fade(x - x0), fy = fade(y - y0);
    const a = at(x0, y0), b = at(x0 + 1, y0), c = at(x0, y0 + 1), d = at(x0 + 1, y0 + 1);
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
  };
}

// ---------- composition ----------

/**
 * A line drawing: one continuous ink line wandering through a seeded flow
 * field, with pen-pressure width variation, an echo line, and a single soft
 * tinted spot. Mostly empty paper.
 */
function drawing({ width, height, seed, tint }) {
  const rand = rng(seed);
  const noise = makeNoise(rand);
  const between = (a, b) => a + rand() * (b - a);
  const unit = Math.min(width, height);

  // Flow field: a calm undulation. The line always travels left to right;
  // the field only bends it, up to about ninety degrees either way, and a
  // gentle pull keeps it from wandering off the top or bottom.
  const cell = unit * between(0.28, 0.42); // size of one noise cell
  const maxTurn = between(1.1, 1.6);
  const fieldAngle = (x, y, phase) => (noise(x / cell + phase, y / cell + phase * 3) - 0.5) * 2 * maxTurn;

  function trace(startY, step, phase, curl) {
    const pts = [];
    let x = -unit * 0.08;
    let y = startY;
    let heading = 0;
    for (let i = 0; i < 4000; i++) {
      pts.push([x, y]);
      // Pull toward the vertical middle, hard near the edges so the line
      // and its spot stay on the paper.
      const off = (height / 2 - y) / height; // -0.5 .. 0.5
      const centerPull = off * 0.9 + Math.sign(off) * Math.max(0, Math.abs(off) - 0.3) * 6;
      let target = fieldAngle(x, y, phase) * curl + centerPull;
      let d = target - heading;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      heading += d * 0.12;
      x += Math.cos(heading) * step;
      y += Math.sin(heading) * step;
      if (x > width + unit * 0.08) break;
    }
    return pts;
  }

  // Smooth polyline into a cubic path (Catmull-Rom to Bezier).
  function pathFrom(pts) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  // Ribbon polygon with varying width, so the line reads like a pen stroke.
  function ribbon(pts, baseW) {
    const left = [], right = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const q = pts[Math.min(pts.length - 1, i + 1)];
      const r = pts[Math.max(0, i - 1)];
      const dx = q[0] - r[0], dy = q[1] - r[1];
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const t = i / (pts.length - 1);
      const taper = Math.sin(Math.PI * Math.min(1, Math.max(0, t))) ** 0.5; // thin at both ends
      const pressure = 0.4 + noise(i * 0.025 + 7, seed % 13) * 1.1;
      const w = baseW * taper * pressure;
      left.push([p[0] + nx * w, p[1] + ny * w]);
      right.push([p[0] - nx * w, p[1] - ny * w]);
    }
    const all = left.concat(right.reverse());
    return all.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
  }

  const parts = [];
  parts.push(`<rect width="${width}" height="${height}" fill="${PALETTE.ground}"/>`);

  // Main line crossing the canvas.
  const step = unit * 0.006;
  const startY = height * between(0.3, 0.7);
  const phase = between(0, 100);
  const main = trace(startY, step, phase, 1);

  // Soft tinted spot sitting on the line, somewhere in the middle.
  const mid = main[Math.floor(main.length * between(0.3, 0.65))] || [width / 2, height / 2];
  const spotR = unit * between(0.13, 0.2);
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const spotX = clamp(mid[0] + unit * between(-0.05, 0.05), spotR * 0.8, width - spotR * 0.8);
  const spotY = clamp(mid[1] + unit * between(-0.06, 0.06), spotR * 0.8, height - spotR * 0.8);
  parts.push(
    `<ellipse cx="${spotX.toFixed(1)}" cy="${spotY.toFixed(1)}" rx="${spotR.toFixed(1)}" ry="${(spotR * between(0.8, 1)).toFixed(1)}" fill="url(#spot)" transform="rotate(${between(-30, 30).toFixed(1)} ${spotX.toFixed(1)} ${spotY.toFixed(1)})"/>`
  );

  // Echo: a hairline through the same field, offset, slightly less curl.
  const echo = trace(startY + unit * between(-0.22, 0.22), step, phase + 0.35, 0.8);
  parts.push(
    `<path d="${pathFrom(echo)}" fill="none" stroke="${PALETTE.ink}" stroke-opacity="0.32" stroke-width="${(unit * 0.0015).toFixed(2)}" stroke-linecap="round"/>`
  );

  // Main stroke as a pressure ribbon.
  parts.push(`<path d="${ribbon(main, unit * 0.0085)}" fill="${PALETTE.ink}" fill-opacity="0.92"/>`);

  // A few ink specks along the way, like a pen lifting.
  const specks = Math.round(between(2, 5));
  for (let i = 0; i < specks; i++) {
    const p = main[Math.floor(rand() * main.length)];
    if (!p) continue;
    const ox = unit * between(-0.06, 0.06), oy = unit * between(-0.06, 0.06);
    parts.push(
      `<circle cx="${(p[0] + ox).toFixed(1)}" cy="${(p[1] + oy).toFixed(1)}" r="${(unit * between(0.002, 0.0045)).toFixed(2)}" fill="${PALETTE.ink}" fill-opacity="0.7"/>`
    );
  }

  const defs = `
    <radialGradient id="spot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${tint}" stop-opacity="1"/>
      <stop offset="70%" stop-color="${tint}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${tint}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed % 1000}" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
    </filter>`;
  parts.push(`<rect width="${width}" height="${height}" filter="url(#grain)"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>${defs}</defs>
  ${parts.join('\n  ')}
</svg>`;
}

// ---------- main ----------

async function render(item, force) {
  const seed = hash(item.slug);
  const tintName = item.accent || CATEGORY_TINT[item.category] || 'lavender';
  const tint = PALETTE.tints[tintName] || PALETTE.tints.lavender;

  const targets = [
    { file: `${item.slug}.png`, width: 800, height: 800 },
    { file: `${item.slug}-og.png`, width: 1200, height: 630 },
  ];

  const written = [];
  for (const t of targets) {
    const out = path.join(OUT_DIR, t.file);
    if (fs.existsSync(out) && !force) continue;
    const svg = drawing({ width: t.width, height: t.height, seed, tint });
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
    written.push(t.file);
  }
  return { slug: item.slug, tint: tintName, written };
}

async function main() {
  const only = process.argv[2];
  const force = process.env.FORCE === '1';
  const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const items = only ? data.items.filter((i) => i.slug === only) : data.items;
  if (items.length === 0) {
    console.error(only ? `No article with slug "${only}"` : 'No articles found');
    process.exit(1);
  }

  let changed = false;
  for (const item of items) {
    const result = await render(item, force);
    const want = `/images/thoughts/${item.slug}.png`;
    if (item.image !== want) {
      item.image = want;
      changed = true;
    }
    console.log(
      `${result.slug}  tint=${result.tint}  ${result.written.length ? 'wrote ' + result.written.join(', ') : 'up to date'}`
    );
  }

  if (changed) {
    fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated data/thoughts.json image paths');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
