/* ============================================================================
   verify.js — prove the map covers every URL, and that the deployment agrees
   ----------------------------------------------------------------------------
   Run:  node verify.js                      coverage only, no network to Vercel
         node verify.js https://preview-url   also check what is actually served

   COVERAGE MODE reads burnoutrecoveryaccelerator.com/sitemap.xml live and
   asserts that every URL in it has exactly one verdict. It fails on a URL the
   map has never heard of, which is what happens when the old site gains a page
   after the map is written.

   LIVE MODE additionally requests every URL against a deployment and checks the
   status and Location it really returns. Do this against a preview URL BEFORE
   the DNS moves — a redirect map is the one thing you cannot test after
   cutover, because by then the old site is already gone.

   IT FAILS WHILE THE BLOG IS UNMAPPED, deliberately. 46 indexed articles is the
   only real SEO asset the old domain has, and the moment DNS moves they stop
   existing. Making that a failing check rather than a paragraph in a document
   is the difference between a constraint and a hope.
   ========================================================================== */
'use strict';

const { TARGET, MOVED, GONE, HELD, HELD_TARGET } = require('./redirects.js');

const SITEMAP = 'https://www.burnoutrecoveryaccelerator.com/sitemap.xml';
const base = process.argv[2];

const norm = (p) => {
  let x = p.split('?')[0].toLowerCase();
  if (x.length > 1) x = x.replace(/\/+$/, '');
  return x || '/';
};

const verdict = (p) =>
  Object.prototype.hasOwnProperty.call(MOVED, p) ? 'moved'
  : HELD.test(p) ? 'held'
  : GONE.has(p) ? 'gone'
  : 'UNMAPPED';

(async () => {
  process.stdout.write(`  reading ${SITEMAP}\n`);
  const xml = await (await fetch(SITEMAP)).text();
  const paths = [...new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => norm(m[1].replace(/^https?:\/\/[^/]+/, '') || '/'))
  )].sort();

  const by = { moved: [], held: [], gone: [], UNMAPPED: [] };
  for (const p of paths) by[verdict(p)].push(p);

  console.log(`\n  ${paths.length} URLs in the sitemap\n`);
  console.log(`    301 moved     ${String(by.moved.length).padStart(3)}`);
  console.log(`    410 gone      ${String(by.gone.length).padStart(3)}`);
  console.log(`    302 held      ${String(by.held.length).padStart(3)}   the blog`);
  console.log(`    unmapped      ${String(by.UNMAPPED.length).padStart(3)}`);

  let fail = false;

  if (by.UNMAPPED.length) {
    fail = true;
    console.log('\n  UNMAPPED — the old site has pages this map does not know about:');
    for (const p of by.UNMAPPED) console.log(`    ${p}`);
  }

  /* Targets are checked for shape, not fetched: a typo like '/about ' or a
     missing leading slash produces a redirect that resolves to nothing, and it
     is invisible until somebody follows it. */
  const badTarget = Object.entries(MOVED).filter(([, t]) => !/^\/(?:[a-z0-9#/-]*)$/.test(t));
  if (badTarget.length) {
    fail = true;
    console.log('\n  MALFORMED TARGETS:');
    for (const [f, t] of badTarget) console.log(`    ${f} -> ${JSON.stringify(t)}`);
  }

  if (base) {
    console.log(`\n  checking ${base}\n`);
    let wrong = 0;
    for (const p of paths) {
      const want = verdict(p);
      let got, loc;
      try {
        const r = await fetch(base + p, { redirect: 'manual' });
        got = r.status;
        loc = r.headers.get('location') || '';
      } catch (e) {
        got = 'ERR'; loc = e.message;
      }
      const okStatus = want === 'moved' ? got === 301
        : want === 'held' ? got === 302
        : got === 410;
      const okLoc = want === 'moved' ? loc === TARGET + MOVED[p]
        : want === 'held' ? loc === TARGET + HELD_TARGET
        : true;
      if (!okStatus || !okLoc) {
        wrong++; fail = true;
        console.log(`    ${p}\n        want ${want} → ${want === 'moved' ? TARGET + MOVED[p] : want === 'held' ? TARGET + HELD_TARGET : '410'}\n        got  ${got} ${loc}`);
      }
    }
    console.log(wrong ? `\n  ${wrong} wrong` : '  every URL answered as mapped');
  }

  if (by.held.length) {
    fail = true;
    console.log(`\n  BLOCKING — ${by.held.length} blog posts are still unmapped.`);
    console.log('  They are the only accumulated authority the old domain has, and');
    console.log('  Strikingly stops serving them the moment DNS moves here.');
    console.log('  Do not cut over until /insights exists and these point at it.');
  }

  console.log();
  process.exit(fail ? 1 : 0);
})();
