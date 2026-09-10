/**
 * Four editorial illustrations: a specification and its form, a website folded
 * into a toolkit, an undisturbed pendulum, and newspaper plates in registration.
 * SVG is the source medium; PNG exports keep the site's existing asset contract.
 * Each format is composed separately, with the complete object in the safe area.
 *
 * npm run images:articles            Generate missing assets
 * FORCE=1 npm run images:articles    Regenerate the family
 * npm run images:articles -- <slug>  Generate one article
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data/thoughts.json');
const OUT = path.join(ROOT, 'public/images/thoughts');
const ink = '#303936';
const paper = '#F7F5F2';
const blue = '#354F70';

const line = (d, color = ink, width = 2, extra = '') =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const shape = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;

function specification() {
  // A solid folded form rises from the exact same stepped drafting pattern.
  return `
    ${shape('M91 356 L307 447 L571 310 L351 221 Z', '#B8BFCF')}
    ${shape('M91 342 L307 433 L571 296 L351 207 Z', paper, `stroke="${ink}" stroke-width="2"`)}
    <g opacity=".3">
      ${Array.from({ length: 9 }, (_, i) => line(`M${115+i*23} ${352+i*9.7} l239 -125`, blue, 1)).join('')}
      ${Array.from({ length: 10 }, (_, i) => line(`M${115+i*24} ${330-i*12.5} l211 89`, blue, 1)).join('')}
    </g>
    ${line('M167 326 L278 373 L475 271 L364 224 Z', blue, 2, 'stroke-dasharray="7 7"')}
    ${line('M167 326 V198 M278 373 V245 M475 271 V143', blue, 1.5, 'stroke-dasharray="4 7"')}
    ${shape('M167 198 L278 245 L475 143 L364 96 Z', '#D4D8E8', `stroke="${ink}" stroke-width="2.5"`)}
    ${shape('M167 198 L278 245 L278 330 L167 283 Z', blue, `stroke="${ink}" stroke-width="2.5"`)}
    ${shape('M278 245 L475 143 L475 228 L278 330 Z', '#8194AE', `stroke="${ink}" stroke-width="2.5"`)}
    ${shape('M278 245 L475 143 L475 228 L278 330 Z', 'url(#hatch)', 'opacity=".6"')}
    ${line('M195 183 L305 229 L444 157', paper, 2)}
    ${line('M183 246 L261 279 M183 260 L261 293', '#ADB9CA', 2)}
    ${line('M111 218 L111 302 M104 224 L118 212 M104 308 L118 296', blue, 1.5)}
    ${line('M326 382 L519 282 M320 374 L332 390 M513 274 L525 290', blue, 1.5)}
    ${circle(364, 96, 5, paper, `stroke="${ink}" stroke-width="2"`)}
    ${circle(278, 245, 5, paper, `stroke="${ink}" stroke-width="2"`)}
  `;
}

function portfolio() {
  // One continuous accordion sheet: a website's blocks become a physical object.
  return `
    ${shape('M84 384 L253 447 L421 392 L583 446 L618 420 L427 360 L246 417 Z', '#C4BEAB')}
    ${shape('M90 137 L253 201 L253 433 L90 369 Z', '#E8E0C4', `stroke="${ink}" stroke-width="2.5"`)}
    ${shape('M253 201 L420 126 L420 358 L253 433 Z', paper, `stroke="${ink}" stroke-width="2.5"`)}
    ${shape('M420 126 L583 190 L583 422 L420 358 Z', '#B3A16B', `stroke="${ink}" stroke-width="2.5"`)}
    <g transform="matrix(1 .39 0 1 90 137)">
      ${rect(19, 25, 126, 8, ink)}
      ${rect(19, 49, 79, 5, ink)}
      ${rect(19, 63, 108, 5, ink)}
      ${rect(19, 93, 126, 88, blue)}
      ${circle(99, 121, 19, '#E8E0C4')}
      ${shape('M19 181 L62 131 L94 159 L115 138 L145 181 Z', '#8FA2AD')}
      ${line('M19 200 H110 M19 211 H84', ink, 3)}
    </g>
    <g transform="matrix(1 -.449 0 1 253 201)">
      ${rect(21, 26, 124, 61, '#D4D8E8', `stroke="${ink}" stroke-width="1.5"`)}
      ${line('M34 43 H129 M34 56 H103 M34 70 H114', ink, 2)}
      ${rect(21, 102, 56, 69, '#E8E0C4')}
      ${rect(89, 102, 56, 69, '#BAC5BD')}
      ${line('M21 187 H145 M21 200 H119 M21 213 H130', ink, 3)}
    </g>
    <g transform="matrix(1 .393 0 1 420 126)">
      ${rect(19, 25, 125, 155, paper)}
      ${rect(19, 25, 125, 155, 'url(#hatch)', 'opacity=".5"')}
      ${rect(40, 52, 83, 101, blue)}
      ${line('M56 81 L70 69 M56 81 L70 94 M106 81 L92 69 M106 81 L92 94 M86 60 L76 103', paper, 3)}
      ${line('M19 200 H137 M19 213 H91', ink, 3)}
    </g>
    ${line('M87 114 L250 178 L418 103 L584 167', ink, 1.5, 'stroke-dasharray="3 7"')}
    ${line('M253 201 V433 M420 126 V358', ink, 3)}
  `;
}

function focus() {
  // Off-axis echoes frame a single suspended weight, leaving its path clear.
  return `
    <g opacity=".45">
      ${[0, 1, 2, 3, 4].map(i => line(`M${82+i*18} 115 C${205+i*12} 186 ${36+i*12} 278 ${128+i*15} 397`, '#6E8A7C', 2)).join('')}
      ${[0, 1, 2, 3, 4].map(i => line(`M${552-i*18} 105 C${426-i*12} 198 ${600-i*10} 299 ${517-i*17} 421`, '#6E8A7C', 2)).join('')}
    </g>
    ${shape('M233 62 H423 L405 447 H251 Z', '#D6E4DE')}
    ${shape('M251 447 H405 L445 467 H211 Z', '#C0D1C7')}
    ${line('M208 89 H448', ink, 5)}
    ${line('M230 73 V103 M426 73 V103', ink, 2)}
    ${line('M328 90 L206 335', '#90A99C', 1.5, 'stroke-dasharray="5 7"')}
    ${line('M328 90 L450 335', '#90A99C', 1.5, 'stroke-dasharray="5 7"')}
    ${line('M191 340 Q328 450 465 340', ink, 1.5)}
    ${line('M328 92 V341', ink, 4)}
    ${circle(328, 90, 8, paper, `stroke="${ink}" stroke-width="3"`)}
    ${circle(328, 371, 40, ink)}
    ${shape('M328 331 A40 40 0 0 1 328 411 Z', blue)}
    ${line('M310 344 Q297 356 303 373', '#D6E4DE', 3)}
    ${line('M322 449 H334 M328 443 V455', ink, 2)}
    ${circle(206, 335, 18, 'none', 'stroke="#90A99C" stroke-width="1.5"')}
    ${circle(450, 335, 18, 'none', 'stroke="#90A99C" stroke-width="1.5"')}
  `;
}

function newspaperPlate(x, y, color, outlined = false) {
  return `<g transform="translate(${x} ${y}) rotate(-9 142 163)">
    ${rect(0, 0, 278, 332, outlined ? 'none' : paper, `stroke="${color}" stroke-width="2.5"`)}
    ${rect(24, 28, 230, 19, outlined ? 'none' : color, outlined ? `stroke="${color}" stroke-width="2"` : '')}
    ${line('M24 65 H254', color, 2)}
    ${rect(24, 86, 138, 111, outlined ? 'none' : '#A4B3BE', `stroke="${color}" stroke-width="1.5"`)}
    ${outlined ? '' : shape('M24 197 L71 133 L103 164 L132 128 L162 197 Z', blue)}
    ${Array.from({ length: 9 }, (_, i) => line(`M181 ${89+i*12} H254`, color, 2)).join('')}
    ${[24, 104, 184].map(left => Array.from({ length: 7 }, (_, i) => line(`M${left} ${223+i*12} h${i === 6 ? 43 : 64}`, color, 2)).join('')).join('')}
    ${line('M-16 0 H-5 M0 -16 V-5 M283 332 H294 M278 337 V348', color, 2)}
  </g>`;
}

function handoff() {
  // Two separated versions of the same newspaper structure come into register.
  return `
    ${shape('M147 401 L439 454 L580 186 L300 129 Z', '#EAD9C8')}
    ${newspaperPlate(153, 106, ink)}
    ${newspaperPlate(222, 60, '#AA7350', true)}
    ${line('M97 409 H125 M111 395 V423', ink, 2)}
    ${circle(111, 409, 8, 'none', `stroke="${ink}" stroke-width="1.5"`)}
    ${line('M540 93 H568 M554 79 V107', ink, 2)}
    ${circle(554, 93, 8, 'none', `stroke="${ink}" stroke-width="1.5"`)}
  `;
}

const illustrations = {
  'spec-driven-development-for-designers': { draw: specification, tint: '#D4D8E8' },
  'rebuilding-portfolio-in-claude-code': { draw: portfolio, tint: '#E8E0C4' },
  'focus-the-essential-tool-spec-driven-development': { draw: focus, tint: '#D6E4DE' },
  'ai-first-product-development': { draw: handoff, tint: '#EAD9C8' },
};

function drawing(item, width, height) {
  const illustration = illustrations[item.slug];
  if (!illustration) throw new Error(`Create an article-specific illustration for "${item.slug}" first.`);
  const wide = width > height;
  const scale = wide ? 1.06 : 1.18;
  const x = (width - 660 * scale) / 2;
  const y = (height - 520 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <path d="M0 0 V7" stroke="${ink}" stroke-width="1" opacity=".5"/>
      </pattern>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" seed="23" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer>
      </filter>
    </defs>
    ${rect(0, 0, width, height, paper)}
    ${rect(0, 0, width, height, illustration.tint, 'opacity=".19"')}
    <g transform="translate(${x} ${y}) scale(${scale})">${illustration.draw()}</g>
    ${rect(0, 0, width, height, ink, 'filter="url(#grain)"')}
  </svg>`;
}

async function main() {
  const only = process.argv[2];
  const force = process.env.FORCE === '1';
  const { items } = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const selected = only ? items.filter(item => item.slug === only) : items;
  if (!selected.length) throw new Error(only ? `No article with slug "${only}"` : 'No articles found');
  fs.mkdirSync(OUT, { recursive: true });
  for (const item of selected) {
    for (const [suffix, width, height] of [['', 800, 800], ['-og', 1200, 630]]) {
      const filename = `${item.slug}${suffix}.png`;
      const out = path.join(OUT, filename);
      if (fs.existsSync(out) && !force) continue;
      await sharp(Buffer.from(drawing(item, width, height))).png({ compressionLevel: 9 }).toFile(out);
      console.log(`${filename} (${width}×${height})`);
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
