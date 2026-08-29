/* ============================================================================
   PAGE — the document shell
   ----------------------------------------------------------------------------
   Everything common to every page: head, metadata, the header and footer
   chrome, the progress rail, the threshold, and the script order.

   Output is plain static HTML. Nothing here needs a runtime.
   ========================================================================== */
'use strict';

const { lockup, mark, sprite, route } = require('./brand.js');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');


/* ── Script order is load-bearing ─────────────────────────────────────────
   attribution.js must parse BEFORE analytics.js, because analytics fires
   page_view at parse time and reads window.bcAttribution() to stamp it.
   Loaded the other way round every pageview ships unattributed and the
   ecosystem funnel cannot be joined.

   motion.js is last: it only decorates, and nothing else depends on it. */
const SCRIPTS = [
  '/js/attribution.js',
  '/js/analytics.js',
  '/js/site.js',
  '/js/motion.js'
];

/* Loaded only where there is a form to enhance. */
const PAGE_SCRIPTS = { intake: '/js/intake.js' };


/* Motion mode is decided HERE, synchronously, before the first paint — not in
   motion.js, which is deferred.

   The reveal styles hide content, and they are gated on data-motion="full".
   If that decision waited for a deferred script, then in instant mode (reduced
   motion, an automated agent, ?flat=1) the CSS would hide everything and the
   script that was supposed to un-hide it would have already decided to do
   nothing. The page would render blank to exactly the visitors least able to
   tolerate it.

   Without scripting the attribute is never set, so nothing is ever hidden. */
const JS_FLAG = `<script>(function(){var d=document.documentElement,i=false;try{i=matchMedia("(prefers-reduced-motion: reduce)").matches||navigator.webdriver===true||/[?&]flat=1/.test(location.search)}catch(e){}d.setAttribute("data-motion",i?"instant":"full");d.className+=" js"})()</script>`;


function head(page, site) {
  const title = page.title || site.name;
  const desc  = page.description || site.description;
  const url   = site.origin + (page.path === '/' ? '' : page.path);
  const img   = site.origin + (page.ogImage || site.ogImage);

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
${page.noindex ? '<meta name="robots" content="noindex">' : ''}

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.ogTitle || title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(img)}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="theme-color" content="#0F0E10">

<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/assets/fonts/newsreader-200-500-latin.woff2">
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/chrome.css">
<link rel="stylesheet" href="/css/site.css">
<link rel="stylesheet" href="/css/intake.css">
${JS_FLAG}`;
}


/* ── Chrome ────────────────────────────────────────────────────────────── */

function header(site) {
  const links = site.nav.map((n) => {
    const r = n.route ? route(n.route) : null;
    if (r && r.status !== 'live') {
      return `<span class="nav__link is-planned">${esc(n.label)} <i>${esc(r.note)}</i></span>`;
    }
    const href = r ? r.href : n.href;
    const ext  = r ? ` target="_blank" rel="noopener"` : '';
    const ev   = r ? ` data-event="${esc(r.event)}" data-event-label="${esc(n.label)}"` : '';
    const cue  = r ? ' <span class="nav__ext" aria-hidden="true">&#8599;</span>' : '';
    return `<a class="nav__link" href="${esc(href)}"${ext}${ev}>${esc(n.label)}${cue}</a>`;
  }).join('\n      ');

  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav" data-header>
  <a class="nav__home" href="/" aria-label="${esc(site.name)}, home">
    ${lockup()}
  </a>
  <nav class="nav__links" id="nav-links" aria-label="Primary">
      ${links}
  </nav>
  <div class="nav__right">
    <a class="btn btn--primary nav__cta" href="${esc(site.primaryCta.href)}"
       data-event="consumer_path_click" data-event-label="header">${esc(site.primaryCta.label)}</a>
    <button class="nav__toggle" type="button"
            aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
      <span class="nav__bar"></span><span class="nav__bar"></span>
    </button>
  </div>
</header>`;
}

function footer(site) {
  const cols = site.footer.map((col) => `
    <div class="foot__col">
      <h2 class="meta foot__head">${esc(col.head)}</h2>
      <ul>${col.links.map((l) => {
        const r = l.route ? route(l.route) : null;
        if (r && r.status !== 'live') {
          return `<li><span class="is-planned">${esc(l.label)} <i>${esc(r.note)}</i></span></li>`;
        }
        const href = r ? r.href : l.href;
        const ext  = r ? ` target="_blank" rel="noopener"` : '';
        const ev   = r ? ` data-event="${esc(r.event)}"` : '';
        return `<li><a href="${esc(href)}"${ext}${ev}>${esc(l.label)}</a></li>`;
      }).join('')}</ul>
    </div>`).join('');

  return `<footer class="foot">
  <div class="foot__inner">
    <div class="foot__brand">
      ${lockup({ markHeight: '26px', wordmarkWidth: '150px' })}
      <p class="foot__line">${esc(site.promise)}</p>
    </div>
    <div class="foot__cols">${cols}
    </div>
  </div>
  <div class="foot__base">
    <p class="foot__legal">${esc(site.legal)}</p>
    <p class="foot__legal">&copy; ${new Date().getFullYear()} ${esc(site.name)}</p>
  </div>
</footer>`;
}


/* The threshold sits above everything and removes itself. It is inert without
   scripting — the CSS that hides the page behind it is gated on `.js`, so a
   scriptless visitor never sees it at all. */
function threshold() {
  /* The threshold animates the mark's individual strokes via stroke-dashoffset,
     and getTotalLength() cannot reach through a <use> shadow tree — so this one
     place inlines the real paths. It is 527 bytes. */
  const { MARK } = require('./brand.js');
  const inline = MARK.replace('<svg ', '<svg style="height:min(30vh,240px);width:auto" ');
  return `<div class="threshold" data-threshold aria-hidden="true">${inline}</div>`;
}

function rail() {
  return `<div class="rail" aria-hidden="true"><span class="rail__fill" data-rail-fill></span></div>
<span class="rail__label meta" data-rail-label aria-hidden="true"></span>`;
}


/* ── Layouts ──────────────────────────────────────────────────────────────
   full     — the whole chrome. Marketing pages.
   plain    — header and footer, no progress rail or threshold. A form is not
              a cinematic experience and a rail down the side of one is noise.
   document — no chrome at all. A prepared document is a document; site
              furniture around it would make it read as a web page about a
              document rather than the thing itself. It also means the print
              stylesheet has almost nothing to strip.                        */

function render(page, site, body) {
  const layout = page.layout || 'full';
  const scripts = SCRIPTS.slice();

  const needsIntake = (page.sections || []).some((s) => s.type === 'intake');
  if (needsIntake) scripts.push(PAGE_SCRIPTS.intake);

  const chrome = {
    full:     { threshold: true,  rail: true,  header: true,  footer: true },
    plain:    { threshold: false, rail: false, header: true,  footer: true },
    document: { threshold: false, rail: false, header: false, footer: false }
  }[layout];

  if (!chrome) throw new Error(`Unknown layout "${layout}" in ${page.key}`);

  return `<!doctype html>
<html lang="en">
<head>
${head(page, site)}
</head>
<body class="page page--${esc(page.key)} layout--${esc(layout)}" data-surface="${esc(page.surface || 'consumer')}">
${sprite()}
${chrome.threshold ? threshold() : ''}
${chrome.rail ? rail() : ''}
${chrome.header ? header(site) : ''}
<main id="main">
${body}
</main>
${chrome.footer ? footer(site) : ''}
${scripts.map((s) => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}

module.exports = { render, esc };
