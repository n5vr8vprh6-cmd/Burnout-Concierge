/* ============================================================================
   COMPONENTS — the section renderers
   ----------------------------------------------------------------------------
   A page is a list of sections; each section is data with a `type`, and this
   file turns each type into markup. `renderSections` throws on an unknown
   type rather than skipping it, so a typo in a content module fails the build
   instead of silently dropping a band off the page.

   REVEAL CONTRACT
     Elements opt into motion with `data-reveal`, `data-wipe` or `data-line`,
     and a parent marked `data-stagger` makes its children arrive as a phrase.
     The CSS that hides them is gated on `<html class="js">`, so nothing here
     can make content unreadable without scripting. See js/motion.js.

   GROUND CONTRACT
     `skin: 'dark' | 'light'` sets the ground. The brief's budget is roughly
     70% ivory to 30% obsidian across a page — obsidian punctuates, it does
     not dominate, or the site reads as a private bank rather than a recovery
     brand.
   ========================================================================== */
'use strict';

const { esc } = require('./page.js');
const { route, mark } = require('./brand.js');

/* ── helpers ─────────────────────────────────────────────────────────────── */

const skinClass = (s) => (s.skin === 'dark' ? 'is-dark' : 'is-light');

/* Responsive image. Intrinsic width/height are required so nothing shifts as
   it loads — the layout is reserved before the bytes arrive. */
function figure(img, opts = {}) {
  if (!img) return '';
  const widths = img.widths || [960, 1440];
  const srcset = widths.map((w) => `${img.base}-${w}.webp ${w}w`).join(', ');
  const sizes  = img.sizes || opts.sizes || '100vw';
  const loading = opts.eager ? 'eager' : 'lazy';
  const fetchpri = opts.eager ? ' fetchpriority="high"' : '';
  const drift = opts.drift ? ' data-drift' : '';
  return `<img src="${esc(img.src)}" srcset="${esc(srcset)}" sizes="${esc(sizes)}"
      width="${img.w}" height="${img.h}" alt="${esc(img.alt || '')}"
      loading="${loading}" decoding="async"${fetchpri}${drift}>`;
}

/* A call to action. `kind` decides weight, not colour — copper is spent once
   per page and the content module says where. */
function btn(cta, kind = 'primary', event) {
  if (!cta) return '';
  const cls = kind === 'primary' ? 'btn btn--primary' : 'btn btn--quiet';
  const ev = event ? ` data-event="${esc(event)}" data-event-label="${esc(cta.label)}"` : '';
  return `<a class="${cls}" href="${esc(cta.href)}"${ev}>${esc(cta.label)}</a>`;
}

/* An ecosystem link. A route that is not live renders as a labelled
   non-link — never a dead one. */
function routeLink(key, label) {
  const r = route(key);
  const text = label || r.label;
  if (r.status !== 'live') {
    return `<span class="is-planned">${esc(text)} <i>${esc(r.note)}</i></span>`;
  }
  return `<a href="${esc(r.href)}" target="_blank" rel="noopener"
     data-event="${esc(r.event)}" data-event-label="${esc(text)}">${esc(text)} <span class="nav__ext" aria-hidden="true">&#8599;</span></a>`;
}

const eyebrow = (t) => t ? `<span class="meta eyebrow" data-reveal>${esc(t)}</span>` : '';
const lede    = (t) => t ? `<p class="lede" data-reveal>${t}</p>` : '';

/* Headline split into lines for the staggered rise. Authors write the break
   with <br>, which is also where it breaks without scripting. */
function lines(headline, cls) {
  return headline.split(/<br\s*\/?>/i)
    .map((l) => `<span class="line" data-line><i>${l.trim()}</i></span>`)
    .join('');
}


/* ══════════════════════════════════════════════════════════════════════════
   1 · HERO
   ══════════════════════════════════════════════════════════════════════════ */
function hero(s) {
  return `<section class="hero is-dark" data-hero data-label="${esc(s.label || 'Arrival')}">
  ${figure(s.img, { eager: true, drift: true, sizes: '100vw' })}
  <div class="hero__veil"></div>
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="hero__inner" data-stagger>
    ${eyebrow(s.eyebrow)}
    <h1 class="xl">${lines(s.headline)}</h1>
    ${lede(s.lead)}
    <div class="acts" data-reveal>
      ${btn(s.primary, 'primary', 'consumer_path_click')}
      ${btn(s.secondary, 'quiet', 'consumer_path_click')}
      ${s.tertiary ? btn(s.tertiary, 'quiet', 'advisor_pathway_click') : ''}
    </div>
  </div>
  ${s.scrollCue ? `<span class="hero__cue meta" aria-hidden="true">${esc(s.scrollCue)}</span>` : ''}
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   2 · COLUMNS — the category distinction
   ══════════════════════════════════════════════════════════════════════════ */
function columns(s) {
  const cols = s.columns.map((c) => `
      <div class="col" data-reveal>
        <span class="meta col__k">${esc(c.label)}</span>
        <h3 class="col__h">${esc(c.head)}</h3>
        <p>${c.body}</p>
      </div>`).join('');

  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <div class="cols" data-stagger>${cols}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   3 · RUNGS — the concierge offer, by ascending commitment
   ──────────────────────────────────────────────────────────────────────────
   The numbering is real information: these are ordered by how much the
   visitor is being asked to give, from an email address to a conversation.
   Not decoration.
   ══════════════════════════════════════════════════════════════════════════ */
function rungs(s) {
  const items = s.rungs.map((r) => `
      <div class="rung" data-reveal>
        <span class="meta rung__n">${esc(r.step)}</span>
        <h3 class="rung__h">${esc(r.head)}</h3>
        <p>${r.body}</p>
        <a class="rung__go" href="${esc(r.href)}"
           data-event="document_request" data-event-label="${esc(r.head)}">${esc(r.cta)} &rarr;</a>
      </div>`).join('');

  return `<section class="band ${skinClass(s)} band--olive" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <div class="rungs" data-stagger>${items}
    </div>
    <div class="acts" data-reveal>
      ${btn(s.primary, 'primary', 'concierge_intake_start')}
      ${btn(s.secondary, 'quiet', 'document_request')}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   4 · COLLECTION — full-bleed alternating journey panels
   ──────────────────────────────────────────────────────────────────────────
   Deliberately NOT a card grid. Every reference site studied puts its imagery
   full-bleed; a three-up grid of rounded cards is the single most conventional
   thing a page like this can do, and conventional is the problem being solved.

   Panels alternate ground and side, so scrolling the collection is a rhythm
   rather than a list.
   ══════════════════════════════════════════════════════════════════════════ */
function collection(s) {
  const panels = s.journeys.map((j, i) => {
    const dark = i % 2 === 1;
    const flip = i % 2 === 1;
    return `
  <article class="journey ${dark ? 'is-dark' : 'is-light'}${flip ? ' is-flipped' : ''}">
    <div class="journey__media" data-wipe>${figure(j.img, { drift: true, sizes: '(max-width: 900px) 100vw, 56vw' })}</div>
    <div class="journey__body" data-stagger>
      <span class="meta journey__dest" data-reveal>${esc(j.destination)}</span>
      <h3 class="journey__name l" data-reveal>${esc(j.name)}</h3>
      <p class="lede" data-reveal>${j.intention}</p>
      ${j.partner ? `<p class="partner" data-reveal>${j.partner}</p>` : ''}
      <dl class="journey__meta" data-reveal>
        <div><dt>Format</dt><dd>${esc(j.format)}</dd></div>
        <div><dt>Suits</dt><dd>${esc(j.suits)}</dd></div>
        <div><dt>Status</dt><dd class="is-status">${esc(j.status)}</dd></div>
      </dl>
      <div class="acts" data-reveal>
        ${j.route
          ? routeLink(j.route, j.cta || 'View the journey')
          : `<a class="btn btn--quiet" href="${esc(j.href)}" data-event="retreat_view" data-event-label="${esc(j.name)}">${esc(j.cta || 'View the journey')} &rarr;</a>`}
      </div>
    </div>
  </article>`;
  }).join('');

  return `<section id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="band ${skinClass(s)} band--tight">
    <div class="wrap">
      ${eyebrow(s.eyebrow)}
      <h2 class="l" data-reveal>${s.headline}</h2>
      ${lede(s.lead)}
    </div>
  </div>
  ${panels}
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   5 · STAGES — Connect, Curate, Experience, Integrate
   ══════════════════════════════════════════════════════════════════════════ */
function stages(s) {
  const items = s.stages.map((st) => `
      <div class="stage" data-reveal>
        <span class="meta stage__n">${esc(st.step)}</span>
        <h3 class="stage__h">${esc(st.head)}</h3>
        <p>${st.body}</p>
      </div>`).join('');

  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    <div class="stages" data-stagger>${items}
    </div>
    <div class="acts" data-reveal>${btn(s.primary, 'primary', 'concierge_intake_start')}</div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   6 · LADDER — the two advisor inlets, converging
   ──────────────────────────────────────────────────────────────────────────
   The structural heart of the advisor proposition, and the thing the original
   rebuild document did not anticipate. Two ladders serve two advisor profiles:

     A · the general advisor adding wellness, whose rungs are ALREADY LIVE on
         Saint Lucia WELL. We link. We do not rebuild a funnel that is already
         in market.
     B · the wellness-credentialed advisor adding burnout and chronic stress,
         whose rungs are Burnout Concierge's own.

   Both converge on the Venture Studio, which exists nowhere else in the
   ecosystem. Rendering them as two tracks meeting one destination is the
   clearest way to say that without a paragraph of explanation.
   ══════════════════════════════════════════════════════════════════════════ */
function ladder(s) {
  const track = (t) => `
        <div class="track">
          <div class="track__head">
            <span class="meta track__k">${esc(t.label)}</span>
            <span class="track__who">${t.who}</span>
          </div>
          <div class="steps">${t.steps.map((st) => {
            /* A rung that lives on another property is a link — and the WHOLE
               card is the target, not the 11px label inside it. Wrapping the
               label alone gave a 14px tap target on a page whose audience is
               exhausted and frequently on a phone. */
            if (!st.route) {
              return `
            <div class="step">
              <span class="step__t">${esc(st.label)}</span>
              <span class="step__s">${esc(st.owner)}</span>
            </div>`;
            }
            const r = route(st.route);
            return `
            <a class="step is-ext" href="${esc(r.href)}" target="_blank" rel="noopener"
               data-event="${esc(r.event)}" data-event-label="${esc(st.label)}">
              <span class="step__t">${esc(st.label)}</span>
              <span class="step__s">${esc(r.label)} <span class="nav__ext" aria-hidden="true">&#8599;</span></span>
            </a>`;
          }).join('')}
          </div>
        </div>`;

  return `<section class="band is-dark band--deepest" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    <div class="adv__top">
      <div data-stagger>
        ${eyebrow(s.eyebrow)}
        <h2 class="m" data-reveal>${s.headline}</h2>
        <p data-reveal>${s.body}</p>
        <div class="acts" data-reveal>
          ${btn(s.primary, 'primary', 'advisor_pathway_click')}
          ${btn(s.secondary, 'quiet', 'document_request')}
        </div>
      </div>
      <div class="adv__img" data-wipe>${figure(s.img, { sizes: '(max-width: 900px) 100vw, 40vw' })}</div>
    </div>

    <div class="ladder" data-reveal>
      <div class="tracks">${s.tracks.map(track).join('')}
      </div>
      <div class="studio">
        <span class="meta studio__k">${esc(s.studio.label)}</span>
        <h3 class="studio__h">${s.studio.head}</h3>
        <p>${s.studio.body}</p>
      </div>
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   7 & 8 · PATHWAYS — organizations, and hospitality partners
   ══════════════════════════════════════════════════════════════════════════ */
function pathways(s) {
  const items = s.pathways.map((p) => `
      <li class="path" data-reveal>
        <h3 class="path__h">${esc(p.head)}</h3>
        <p>${p.body}</p>
      </li>`).join('');

  return `<section class="band ${skinClass(s)} band--slate" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <ul class="paths" data-stagger>${items}
    </ul>
    <div class="acts" data-reveal>
      ${btn(s.primary, 'quiet', s.event || 'organization_inquiry')}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   9 · ECOSYSTEM — Burnout Concierge as a node, not a hub
   ──────────────────────────────────────────────────────────────────────────
   The honest picture: a peer beside Saint Lucia WELL, not an umbrella above
   it. REV renders unlinked because its domain does not resolve, and the brief
   forbids building the appearance of an ecosystem that is not there yet.
   ══════════════════════════════════════════════════════════════════════════ */
function ecosystem(s) {
  const nodes = s.nodes.map((n) => `
      <li class="node${n.self ? ' is-self' : ''}" data-reveal>
        <span class="meta node__role">${esc(n.role)}</span>
        <h3 class="node__h">${n.route ? routeLink(n.route, n.name) : esc(n.name)}</h3>
        <p>${n.body}</p>
      </li>`).join('');

  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <ul class="nodes" data-stagger>${nodes}
    </ul>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   10 · FOUNDER
   ══════════════════════════════════════════════════════════════════════════ */
function founder(s) {
  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap founder">
    <div data-stagger>
      ${eyebrow(s.eyebrow)}
      <h2 class="m" data-reveal>${s.headline}</h2>
      ${s.body.map((p) => `<p data-reveal>${p}</p>`).join('')}
      <div class="acts" data-reveal>${btn(s.primary, 'quiet')}</div>
    </div>
    ${s.img ? `<div class="founder__img" data-wipe>${figure(s.img, { sizes: '(max-width: 900px) 100vw, 40vw' })}</div>` : ''}
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   11 · FINAL CTA
   ══════════════════════════════════════════════════════════════════════════ */
function finalCta(s) {
  return `<section class="final is-dark" id="${esc(s.id || '')}" data-label="${esc(s.label || 'Begin')}">
  ${figure(s.img, { drift: true, sizes: '100vw' })}
  <div class="final__veil"></div>
  <div class="final__inner" data-stagger>
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <div class="acts" data-reveal>
      ${btn(s.primary, 'primary', 'concierge_intake_start')}
      ${btn(s.secondary, 'quiet', 'document_request')}
    </div>
    ${s.note ? `<p class="note" data-reveal>${s.note}</p>` : ''}
  </div>
</section>`;
}


const RENDERERS = {
  hero, columns, rungs, collection, stages, ladder, pathways, ecosystem, founder, finalCta
};

function renderSections(sections) {
  return sections.map((s) => {
    const fn = RENDERERS[s.type];
    if (!fn) throw new Error(`Unknown section type "${s.type}" — add it to lib/components.js`);
    return fn(s);
  }).join('\n\n');
}

module.exports = { renderSections, RENDERERS, figure, btn, routeLink, esc };
