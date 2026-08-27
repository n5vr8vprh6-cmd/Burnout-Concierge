/* ============================================================================
   build.js — compose content + layouts into a deployable static site
   ----------------------------------------------------------------------------
   Run:  node build.js            → dist/
         node build.js --clean    → wipe dist/ first

   Output is plain static HTML with clean URLs (dir/index.html). No runtime
   dependency on this build: any static host serves dist/ as-is.

   Edit source, never dist/.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = require('./content/site.js');
const { render } = require('./lib/page.js');
const { renderSections } = require('./lib/components.js');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

/* ── The page registry ────────────────────────────────────────────────────
   Add a page here and it builds. Each module declares its own path.       */
const PAGES = [
  require('./content/home.js')
];

/* Static trees copied verbatim into dist/. */
const COPY = ['assets', 'css', 'js'];


function rm(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* Clean URLs: '/' → dist/index.html, '/about' → dist/about/index.html */
function outputPath(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, routePath.replace(/^\//, ''), 'index.html');
}


function build() {
  const clean = process.argv.includes('--clean');
  if (clean) rm(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  /* Pages */
  const built = [];
  for (const page of PAGES) {
    const body = renderSections(page.sections);
    const html = render(page, SITE, body);
    const out = outputPath(page.path);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html, 'utf8');
    built.push({ path: page.path, bytes: Buffer.byteLength(html) });
  }

  /* Static trees */
  for (const dir of COPY) {
    const src = path.join(ROOT, dir);
    if (fs.existsSync(src)) copyDir(src, path.join(DIST, dir));
  }

  /* robots + sitemap, generated from the registry so they cannot drift */
  const urls = PAGES.map((p) =>
    `  <url><loc>${SITE.origin}${p.path === '/' ? '/' : p.path}</loc></url>`).join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  fs.writeFileSync(path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}/sitemap.xml\n`);

  /* Report */
  console.log('\n  Burnout Concierge — build\n');
  for (const b of built) {
    console.log(`    ${b.path.padEnd(24)} ${(b.bytes / 1024).toFixed(1).padStart(7)} KB`);
  }
  console.log(`\n  ${built.length} page${built.length === 1 ? '' : 's'} → dist/\n`);
}

build();
