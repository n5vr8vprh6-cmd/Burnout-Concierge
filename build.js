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
const crypto = require('crypto');

const SITE = require('./content/site.js');
const { render } = require('./lib/page.js');
const { renderSections } = require('./lib/components.js');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

/* ── The page registry ────────────────────────────────────────────────────
   Add a page here and it builds. Each module declares its own path.       */
/* A module may export one page or several — content/concierge.js is three
   rungs of the same relationship and belongs in one file. */
const PAGES = [
  require('./content/home.js'),
  require('./content/concierge.js'),
  require('./content/collection-doc.js'),
  require('./content/advisors.js'),
  require('./content/advisor-prospectus.js'),
  require('./content/thank-you.js')
].flat();

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


/* ── Cache busting ────────────────────────────────────────────────────────
   Stylesheets and scripts ship as /css/site.css with no version in the URL,
   which means a returning visitor keeps whatever their browser cached until it
   decides otherwise. A deploy that changes the CSS then reaches new visitors
   and not the people who already came once — which is exactly backwards.

   So each file gets a short content hash appended as a query string. Same
   bytes, same URL, and it changes the moment the file does. A query string
   rather than a renamed file because it needs no rewriting of references
   inside the CSS itself.                                                   */
function assetVersions(root) {
  const map = {};
  for (const dir of ['css', 'js']) {
    const from = path.join(root, dir);
    if (!fs.existsSync(from)) continue;
    for (const name of fs.readdirSync(from)) {
      if (!/\.(css|js)$/.test(name)) continue;
      const hash = crypto.createHash('sha1')
        .update(fs.readFileSync(path.join(from, name)))
        .digest('hex').slice(0, 8);
      map[`/${dir}/${name}`] = hash;
    }
  }
  return map;
}


function build() {
  const clean = process.argv.includes('--clean');
  if (clean) rm(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  const versions = assetVersions(ROOT);

  /* Pages */
  const built = [];
  for (const page of PAGES) {
    const body = renderSections(page.sections);
    const html = render(page, SITE, body, versions);
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
