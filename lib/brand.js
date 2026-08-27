/* ============================================================================
   BRAND — the mark, the wordmark, and the ecosystem route table
   ----------------------------------------------------------------------------
   The lantern is inlined rather than linked because it is recoloured by CSS
   (`currentColor`) on four different grounds, animated by stroke-dashoffset in
   the threshold, and small enough that a second request would cost more than
   the bytes. It is traced from the supplied master artwork — every arc, rib
   and cap measured off it, not drawn by eye.

   THE ECOSYSTEM TABLE is the single place that knows where another property
   lives. Every outbound link in the site renders through `route()`, so:

     · re-pointing the advisor pathway from Saint Lucia WELL to Destination
       WELL when that domain launches is one edit here, not a search across
       the content;
     · a route marked `status: 'planned'` renders as a labelled non-link
       rather than a dead one — Part 3 §K, and the brief's own rule against
       building empty ecosystem pages;
     · the analytics event travels with the route, so a link cannot be added
       without being measured.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

const MARK     = fs.readFileSync(path.join(ASSETS, 'mark.svg'), 'utf8').trim();
const WORDMARK = fs.readFileSync(path.join(ASSETS, 'wordmark.svg'), 'utf8').trim();

/* ── The sprite ──────────────────────────────────────────────────────────────
   The wordmark is 30 KB of vector outlines. Inlining it in both the header and
   the footer put 60 KB of duplicated path data in every page — two thirds of
   the document. Defined once as a <symbol> and referenced with <use>, it costs
   30 KB once and still inherits `currentColor`, so it recolours per ground
   exactly as before.

   The sprite is emitted at the top of <body> by lib/page.js. Anything that
   calls mark() or wordmark() before it renders would reference an empty id, so
   nothing does. */

function symbolFrom(svg, id) {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)[1];
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<symbol id="${id}" viewBox="${viewBox}">${inner}</symbol>`;
}

function sprite() {
  return `<svg class="sprite" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
${symbolFrom(MARK, 'bc-mark')}
${symbolFrom(WORDMARK, 'bc-wordmark')}
</svg>`;
}

/* The viewBox has to be repeated on the OUTER <svg>, not just the <symbol>.
   Without it the referencing element has no intrinsic aspect ratio, so
   `width:auto` resolves to the CSS default of 100% and a 9px-wide lantern
   renders 300px wide, shoving the wordmark off the header. */
const VIEWBOX = {
  'bc-mark':     /viewBox="([^"]+)"/.exec(MARK)[1],
  'bc-wordmark': /viewBox="([^"]+)"/.exec(WORDMARK)[1]
};

function use(id, style, label) {
  const a11y = label
    ? ` role="img" aria-label="${label}"`
    : ' aria-hidden="true" focusable="false"';
  return `<svg viewBox="${VIEWBOX[id]}" style="${style}"${a11y}><use href="#${id}"></use></svg>`;
}

/* Size at the call site. The symbol's viewBox does the rest. */
function mark(height, label) {
  return use('bc-mark', `height:${height};width:auto;display:block`, label);
}

function wordmark(width, label) {
  return use('bc-wordmark', `width:${width};height:auto;display:block`, label);
}

/* The horizontal lockup was not in the supplied artwork — there is only a
   stacked one, and only baked onto solid grounds. Composing it here from the
   mark plus the extracted vector wordmark gives every ground variant from two
   files, and keeps the header from wasting the vertical space a stacked
   lockup would. */
function lockup({ markHeight = '22px', wordmarkWidth = '124px', className = '' } = {}) {
  return `<span class="lockup ${className}">${mark(markHeight)}<span class="lockup__word">${wordmark(wordmarkWidth)}</span></span>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   ECOSYSTEM ROUTES
   ──────────────────────────────────────────────────────────────────────────
   `status`:
     live    — renders as a link
     planned — renders as a labelled non-link with its status shown

   The three advisor rungs point at Saint Lucia WELL today because that is
   where they actually are, and where advisors are being sent right now. Their
   analytics names stay external_intro_click / _foundations_ / _immersion_ so
   the funnel survives the move to Destination WELL.
   ══════════════════════════════════════════════════════════════════════════ */
const ROUTES = {
  'dsw.home': {
    href: 'https://www.discoversaintluciawell.com',
    label: 'Saint Lucia WELL', status: 'live', event: 'dsw_advisor_click'
  },
  'dsw.advisors': {
    href: 'https://www.discoversaintluciawell.com/advisors',
    label: 'Saint Lucia WELL', status: 'live', event: 'dsw_advisor_click'
  },
  'dsw.intro': {
    href: 'https://www.discoversaintluciawell.com/advisors/intro',
    label: 'Saint Lucia WELL', status: 'live', event: 'external_intro_click'
  },
  'dsw.foundations': {
    href: 'https://www.discoversaintluciawell.com/advisors/foundations',
    label: 'Saint Lucia WELL', status: 'live', event: 'external_foundations_click'
  },
  'dsw.immersion': {
    href: 'https://www.discoversaintluciawell.com/advisors/immersion',
    label: 'Saint Lucia WELL', status: 'live', event: 'external_immersion_click'
  },
  'dsw.eclipse': {
    href: 'https://www.discoversaintluciawell.com/eclipse',
    label: 'Saint Lucia WELL', status: 'live', event: 'eclipse_click'
  },

  /* Not registered yet. Verified NXDOMAIN — these must not render as links. */
  'rev.home': {
    href: 'https://www.revoburnoutretreats.com',
    label: 'REV', status: 'planned', note: 'In development', event: 'revo_external_click'
  },
  'ddw.home': {
    href: 'https://www.discoverdestinationwell.com',
    label: 'Destination WELL', status: 'planned', note: 'In development', event: 'dsw_advisor_click'
  }
};

function route(key) {
  const r = ROUTES[key];
  if (!r) throw new Error(`Unknown ecosystem route "${key}" — add it to lib/brand.js`);
  return r;
}

module.exports = { mark, wordmark, lockup, sprite, route, ROUTES, MARK, WORDMARK };
