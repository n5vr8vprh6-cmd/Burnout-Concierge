/* ============================================================================
   The BRA redirect handler
   ----------------------------------------------------------------------------
   One serverless function answering every request to
   burnoutrecoveryaccelerator.com once its DNS points here.

   WHY A FUNCTION RATHER THAN vercel.json REDIRECTS
     vercel.json can express a 301 and nothing else. A third of this map is 410
     — pages that are genuinely gone and should say so — and there is no way to
     return a status code from a static redirect rule. One small function does
     the whole map, keeps the three verdicts in one place, and needs no
     framework: the project has no dependencies at all.

   NORMALISATION
     Case, trailing slashes and query strings are all stripped before lookup.
     Strikingly served /Retreats/ and /retreats?utm_source=x as the same page
     and the inbound links reflect that, so the map would otherwise miss most
     of the real traffic while looking correct in a test.

     The query string is dropped rather than forwarded. These are campaign
     parameters for campaigns that no longer run, and the new site does its own
     attribution.
   ========================================================================== */
'use strict';

const { TARGET, MOVED, GONE, HELD, HELD_TARGET } = require('../redirects.js');

function normalise(url) {
  let p = (url || '/').split('?')[0].split('#')[0];
  try { p = decodeURIComponent(p); } catch (e) { /* keep the raw form */ }
  p = p.toLowerCase();
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}

module.exports = (req, res) => {
  const path = normalise(req.url);

  res.setHeader('X-Robots-Tag', 'noindex');

  /* Permanent, and cacheable: this domain is a redirect asset now and the map
     is not going to change often. */
  if (Object.prototype.hasOwnProperty.call(MOVED, path)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Location', TARGET + MOVED[path]);
    return res.status(301).end();
  }

  /* Temporary and explicitly NOT cached, because these move again the moment
     /insights exists and a cached 302 would outlive the decision. */
  if (HELD.test(path)) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Location', TARGET + HELD_TARGET);
    return res.status(302).end();
  }

  if (GONE.has(path)) return gone(res, path);

  /* Anything not in the sitemap: also gone. The alternative is redirecting the
     unknown to the homepage, which is how a retired domain quietly turns into
     a few hundred soft 404s. */
  return gone(res, path);
};

function gone(res, path) {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(410).end(`<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>This page has been retired</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;
       background:#F7F4ED;color:#1A1815;
       font:300 17px/1.7 ui-serif,Georgia,serif;padding:2rem}
  main{max-width:34rem}
  p{margin:0 0 1.1rem;color:#57534B}
  a{color:#9E6133}
  .k{font:400 11px/1.5 ui-monospace,Consolas,monospace;letter-spacing:.22em;
     text-transform:uppercase;color:#82663A;display:block;margin-bottom:1.4rem}
</style>
<main>
  <span class="k">Burnout Concierge</span>
  <p>The page you asked for is gone rather than moved, so sending you somewhere
     unrelated would only waste your time.</p>
  <p>The Burnout Recovery Accelerator is now Burnout Concierge.
     <a href="${TARGET}/transition">What changed and where things went</a>.</p>
</main>`);
}
