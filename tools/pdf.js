/* ============================================================================
   tools/pdf.js — render the prepared documents to PDF, on demand
   ----------------------------------------------------------------------------
   Run:  npm run pdf        (installs Puppeteer the first time, via npx)

   WHY THIS IS NOT PART OF THE BUILD
     The documents are HTML pages typeset to print specification. They read
     well on screen, save to PDF from any browser with correct margins and no
     chrome, stay in version control, update with the site, and are linkable
     and accessible in a way a PDF attachment is not.

     Making the build depend on Puppeteer would add roughly 300 MB of headless
     Chromium to a project whose entire dependency list is otherwise one
     package — a poor trade for a document most people read on a phone.

     So this exists for the case the plan actually anticipated: a physical run,
     or a partner who wants a file rather than a link. It is run deliberately,
     not on every build.

   The output is written to dist/assets/documents/ and is NOT committed.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const DIST = path.join(__dirname, '..', 'dist');
const OUT  = path.join(DIST, 'assets', 'documents');
const PORT = 4399;

/* The prepared documents, DISCOVERED rather than listed.

   This used to be a hand-kept array with one entry and a comment asking future
   editors to add to it. Three more document pages were built after it was
   written and none of them was ever added, so `npm run pdf` quietly produced
   one PDF out of four and looked like it had succeeded.

   A list that has to be maintained in parallel with the thing it describes
   will drift, so this reads what the build actually produced: every page
   carrying the document layout, named from its own title. */
function documents() {
  const found = [];
  (function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) { walk(full); continue; }
      if (!name.endsWith('.html')) continue;
      const html = fs.readFileSync(full, 'utf8');
      if (!/class="[^"]*layout--document/.test(html)) continue;
      const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || name;
      const route = '/' + path.relative(DIST, full)
        .split(path.sep).join('/')
        .replace(/index\.html$/, '')
        .replace(/\/$/, '');
      found.push({
        path: route,
        file: title.split(' — ')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.pdf'
      });
    }
  })(DIST);
  return found.sort((a, b) => a.path.localeCompare(b.path));
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain'
};

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(DIST, p);
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const alt = path.join(DIST, p, 'index.html');
      if (fs.existsSync(alt)) return send(res, alt);
      res.writeHead(404); return res.end('not found');
    }
    send(res, file);
  }).listen(PORT);
}

function send(res, file) {
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

(async () => {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('  dist/ is empty — run `npm run build` first.');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('\n  Puppeteer is not installed. It is intentionally not a dependency.\n');
    console.error('  Install it just for this:  npm i -D puppeteer\n');
    process.exit(1);
  }

  const PAGES = documents();
  if (!PAGES.length) {
    console.error('  No document-layout pages found in dist/.');
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  const browser = await puppeteer.launch();

  for (const doc of PAGES) {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${PORT}${doc.path}`, { waitUntil: 'networkidle0' });
    /* The print stylesheet is the specification; nothing is overridden here. */
    await page.emulateMediaType('print');
    await page.pdf({
      path: path.join(OUT, doc.file),
      format: 'A4',
      printBackground: false,
      preferCSSPageSize: true
    });
    await page.close();
    const kb = (fs.statSync(path.join(OUT, doc.file)).size / 1024).toFixed(1);
    console.log(`  ${doc.path.padEnd(24)} ${kb.padStart(7)} KB   ${doc.file}`);
  }

  await browser.close();
  server.close();
  console.log(`\n  → dist/assets/documents/\n`);
})();
