/* ============================================================================
   tools/images.js — curate the source photography into web assets, on demand
   ----------------------------------------------------------------------------
   Run:  npm run images        (needs: npm i --no-save sharp)

   WHY THIS IS NOT PART OF THE BUILD
     Same reasoning as tools/pdf.js. sharp carries prebuilt native binaries for
     every platform it might run on; making the build depend on it would end a
     project whose entire runtime dependency list is one package. The source
     photography changes rarely, the outputs are committed, and the conversion
     is run deliberately.

   WHAT IT DOES
     Reads MANIFEST below — a source file on disk, an output base name, and the
     aspect it should be cropped to — and emits AVIF and WebP at each width the
     source can actually support. It never upscales: a 1400px original will not
     be written at 1920, because inventing pixels to fill a full-bleed panel is
     how a page ends up looking soft on exactly the screens it most wants to
     impress.

     It prints the intrinsic dimensions of the largest output, which is what
     goes into the `w` and `h` of the figure spec in content/*.js so nothing
     shifts on load.

   THE SOURCE FOLDERS ARE READ-ONLY
     Everything is copied out. Nothing in OneDrive is modified or deleted.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/dunca/OneDrive/The Burnout Clinic/Burnout Retreat/Resort and Spa';
const OUT = path.join(__dirname, '..', 'assets', 'images');

/* Widths the site actually asks for. A source is emitted at every width it can
   fill without upscaling, and always at its own largest usable size. */
const WIDTHS = [960, 1440, 1920, 2560];

/* ── The selects ──────────────────────────────────────────────────────────
   Chosen against measured resolution, not filename. Four Seasons has 167
   files but only six above 1600px once the logo files are excluded, so its
   chapter leads on the one true wide shot and fills out with detail crops.
   Maxwell is the opposite: eleven originals at 2400px or more, six of them at
   8000px, so Puerto Vallarta can carry anything asked of it.

   `ar` is the crop aspect. Chapter media is 16:9 for full-bleed; detail beats
   are 3:2, which suits a half-width panel and wastes less of the original. */
const MANIFEST = [
  /* 01 — Los Cabos · Awaken */
  { src: 'Four Seasons - Los Cabos/LCB_398-scaled.jpg',
    out: 'chapter-cabos', ar: 16 / 9,
    alt: 'A beachfront villa terrace at Four Seasons Los Cabos, infinity pool open to the Sea of Cortez' },
  { src: 'Four Seasons - Los Cabos/spa.jpg',
    out: 'cabos-spa', ar: 3 / 2,
    alt: 'A treatment room open to the desert, curtains drawn back' },
  { src: 'Four Seasons - Los Cabos/private-beachfront-dining.jpg',
    out: 'cabos-dining', ar: 3 / 2,
    alt: 'A single table set on the sand at dusk' },

  /* 03 — Puerto Vallarta · Transcend */
  { src: 'Maxwell Residences PV/Orchid/6238f37312945d36d1eb7752_Roof12.jpg',
    out: 'chapter-vallarta', ar: 16 / 9,
    alt: 'A rooftop infinity pool at Maxwell Residences, Banderas Bay and the Sierra Madre beyond at dusk' },
  { src: 'Maxwell Residences PV/Orchid/6171dd6f21142e506b8ef1e0__MG_3890GPR-min.jpg',
    out: 'vallarta-interior', ar: 3 / 2,
    alt: 'An open living space at Maxwell Residences, the bay framed by the terrace' },
  { src: 'Maxwell Residences PV/Indah/5fe1775b59b089618b733870_UPPOOL-1.jpeg',
    out: 'vallarta-pool', ar: 3 / 2,
    alt: 'A quiet pool terrace above the water' }
];

/* Kyoto and Saint Lucia have no photography yet. They are generated rather
   than photographed — prompts are in the plan file — and until those land the
   chapters run on the AI panels already in the repo, re-cropped to 16:9 so at
   least the composition is right. A `@` prefix means repo-relative.

   These two are PLACEHOLDERS. They are 1100px portrait originals, so they emit
   at 960 only and will look soft on a wide screen. That is the honest state
   and it is logged in pre-launch.md rather than hidden by an upscale. */
const PLACEHOLDERS = [
  { src: '@assets/images/journey-nagi-1100.webp',
    out: 'chapter-kyoto', ar: 16 / 9,
    alt: 'PLACEHOLDER — a Kyoto interior in natural wood, awaiting real photography' },
  { src: '@assets/images/journey-eclipse-1100.webp',
    out: 'chapter-saintlucia', ar: 16 / 9,
    alt: 'PLACEHOLDER — a jungle coastline from above, awaiting real photography' }
];
MANIFEST.push(...PLACEHOLDERS);


(async () => {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('\n  sharp is not installed. It is intentionally not a dependency.\n');
    console.error('  Install it just for this:  npm i --no-save sharp\n');
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const specs = [];

  for (const item of MANIFEST) {
    const from = item.src.startsWith('@')
      ? path.join(__dirname, '..', item.src.slice(1))
      : path.join(SRC, item.src);
    if (!fs.existsSync(from)) {
      console.error(`  MISSING  ${item.src}`);
      process.exitCode = 1;
      continue;
    }

    const meta = await sharp(from).metadata();
    /* Never upscale. A width is only emitted if the source can fill it. */
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (!widths.length) widths.push(meta.width);

    const height = (w) => Math.round(w / item.ar);
    let largest = 0;

    for (const w of widths) {
      const h = height(w);
      const base = sharp(from).resize(w, h, { fit: 'cover', position: 'attention' });
      await base.clone().avif({ quality: 62, effort: 6 }).toFile(path.join(OUT, `${item.out}-${w}.avif`));
      await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${item.out}-${w}.webp`));
      largest = w;
    }

    const bytes = (ext) => fs.statSync(path.join(OUT, `${item.out}-${largest}.${ext}`)).size;
    const kb = (n) => (n / 1024).toFixed(0).padStart(4);
    console.log(
      `  ${item.out.padEnd(20)} ${String(meta.width).padStart(5)}px source` +
      ` → ${widths.join('/')}   avif ${kb(bytes('avif'))}KB  webp ${kb(bytes('webp'))}KB`
    );

    specs.push({ out: item.out, widths, w: largest, h: height(largest), alt: item.alt });
  }

  /* The figure spec, ready to paste into content/*.js. Emitting it beats
     hand-copying six sets of numbers and getting one of them wrong. */
  console.log('\n  ── figure specs ──');
  for (const s of specs) {
    console.log(
      `  ${s.out}: { base: '/assets/images/${s.out}', widths: [${s.widths.join(', ')}],\n` +
      `      src: '/assets/images/${s.out}-${s.widths[Math.min(1, s.widths.length - 1)]}.webp',` +
      ` w: ${s.w}, h: ${s.h},\n      alt: '${s.alt.replace(/'/g, "\\'")}' },`
    );
  }
  console.log();
})();
