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
const { INTAKES } = require('../content/intakes.js');

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


/* ── The pin scaffolding ─────────────────────────────────────────────────────
   A pinned section is an ordinary section wrapped in two divs: a tall track,
   and a stage that sticks to the viewport while the track scrolls past it.
   Scroll progress through the track drives which [data-step] child is active.

   Both wrappers are INERT until js/scroll.js sets <html data-pinned>. So this
   markup costs a scriptless or reduced-motion visitor two elements and nothing
   else: the section is normal height, and every child is visible. The gate is
   in the stylesheet rather than here because the markup has to be identical
   either way for that guarantee to hold.

   A section may only be pinned if its advancing children contain nothing
   focusable. Clearing a link from view while leaving it in the tab order is
   how you strand a keyboard user. */
const pinAttrs = (s, mode, steps) =>
  s.pin === true ? ` data-pin data-pin-mode="${mode}" style="--steps:${steps}"` : '';

const pinTrack = (inner) => `<div class="pin__track">
    <div class="pin__stage">
      ${inner}
    </div>
  </div>`;
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
  const pin = s.pin === true;

  /* Pinned, the state attribute owns opacity. Leaving data-reveal on as well
     would put two systems in charge of whether a column can be seen. */
  const cols = s.columns.map((c, i) => `
      <div class="col"${pin ? ` data-step="${i}"` : ' data-reveal'}>
        <span class="meta col__k">${esc(c.label)}</span>
        <h3 class="col__h">${esc(c.head)}</h3>
        <p>${c.body}</p>
      </div>`).join('');

  const body = `<div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <div class="cols${pin ? ' cols--pin' : ''}"${pin ? '' : ' data-stagger'}>${cols}
    </div>
  </div>`;

  return `<section class="band ${skinClass(s)}${pin ? ' band--pin' : ''}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}"${pinAttrs(s, 'accumulate', s.columns.length)}>
  ${pin ? pinTrack(body) : body}
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
  const pin = s.pin === true;

  const items = s.stages.map((st, i) => `
      <div class="stage"${pin ? ` data-step="${i}"` : ' data-reveal'}>
        <span class="meta stage__n">${esc(st.step)}</span>
        <h3 class="stage__h">${esc(st.head)}</h3>
        <p>${st.body}</p>
      </div>`).join('');

  /* The call to action sits outside the advancing group deliberately. It is the
     one focusable thing in the section and it stays put and reachable through
     every stage. */
  const body = `<div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    <div class="stages${pin ? ' stages--pin' : ''}"${pin ? '' : ' data-stagger'}>${items}
    </div>
    <div class="acts" data-reveal>${btn(s.primary, 'primary', 'concierge_intake_start')}</div>
  </div>`;

  return `<section class="band ${skinClass(s)}${pin ? ' band--pin' : ''}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}"${pinAttrs(s, 'replace', s.stages.length)}>
  ${pin ? pinTrack(body) : body}
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

  /* On the homepage the ladder introduces itself, because it is arriving out
     of nowhere between two consumer bands. On the advisor gateway the page has
     already done that, so the intro block is omitted and the ladder is just
     the diagram. */
  const intro = s.headline ? `
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
      ${s.img ? `<div class="adv__img" data-wipe>${figure(s.img, { sizes: '(max-width: 900px) 100vw, 40vw' })}</div>` : ''}
    </div>` : `
    ${eyebrow(s.eyebrow)}
    ${s.lead ? `<p class="lede" data-reveal>${s.lead}</p>` : ''}`;

  return `<section class="band is-dark band--deepest" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${intro}

    <div class="ladder" data-reveal>
      <div class="tracks">${s.tracks.map(track).join('')}
      </div>
      ${s.studio.href
        ? `<a class="studio is-link" href="${esc(s.studio.href)}" data-event="venture_studio_application" data-event-label="ladder">
        <span class="meta studio__k">${esc(s.studio.label)}</span>
        <h3 class="studio__h">${s.studio.head}</h3>
        <p>${s.studio.body}</p>
        <span class="studio__go">${esc(s.studio.cta || 'See the Studio')} &rarr;</span>
      </a>`
        : `<div class="studio">
        <span class="meta studio__k">${esc(s.studio.label)}</span>
        <h3 class="studio__h">${s.studio.head}</h3>
        <p>${s.studio.body}</p>
      </div>`}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   7 & 8 · PATHWAYS — organizations, and hospitality partners
   ══════════════════════════════════════════════════════════════════════════ */
function pathways(s) {
  const items = s.pathways.map((p) => {
    const inner = `<h3 class="path__h">${esc(p.head)}</h3>
        <p>${p.body}</p>
        ${p.cta ? `<span class="path__go">${esc(p.cta)} &rarr;</span>` : ''}`;
    /* A routing page is a list of doors, so the whole item is the target
       rather than a link buried at the end of a paragraph. */
    return p.href
      ? `
      <li class="path is-link" data-reveal><a href="${esc(p.href)}"${p.event ? ` data-event="${esc(p.event)}"` : ''}>${inner}</a></li>`
      : `
      <li class="path" data-reveal>${inner}</li>`;
  }).join('');

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


/* ══════════════════════════════════════════════════════════════════════════
   INTAKE — the concierge form
   ──────────────────────────────────────────────────────────────────────────
   Every step is rendered into the page as a real <fieldset> in document order.
   js/intake.js then shows one at a time. Without scripting it is an ordinary
   long form that submits — which matters more here than anywhere else on the
   site, because a blank form is the one failure this audience should never
   have to work around.

   The confirmation is rendered too, hidden, so the success state is part of
   the document rather than something assembled at runtime.
   ══════════════════════════════════════════════════════════════════════════ */
function intake(s) {
  const spec = INTAKES[s.intake];
  if (!spec) throw new Error(`Unknown intake "${s.intake}" — see content/intakes.js`);

  const step = (st, i) => {
    const n = i + 1;
    let body;

    if (st.type === 'choice') {
      body = `<div class="opts">${st.options.map((o, oi) => `
            <label class="opt">
              <input type="radio" name="${esc(st.name)}" value="${esc(o.value)}"${st.required === false ? '' : ' required'}>
              <span class="opt__label">${esc(o.label)}</span>
              <span class="opt__tick" aria-hidden="true">&#10003;</span>
            </label>`).join('')}
          </div>`;
    } else if (st.type === 'contact') {
      body = `<div class="fields">${st.fields.map((f) => `
            <p class="field">
              <label class="field__label" for="f-${esc(f.name)}">${esc(f.label)}</label>
              <input class="field__input" id="f-${esc(f.name)}" name="${esc(f.name)}"
                     type="${esc(f.type)}"${f.required ? ' required' : ''}
                     autocomplete="${esc(f.autocomplete || 'off')}">
            </p>`).join('')}
          </div>`;
    } else {
      body = `<p class="field">
              <label class="field__label sr-only" for="f-${esc(st.name)}">${esc(st.question)}</label>
              <input class="field__input" id="f-${esc(st.name)}" name="${esc(st.name)}" type="text"
                     placeholder="${esc(st.placeholder || '')}"
                     maxlength="${st.maxlength || 300}"
                     autocomplete="${esc(st.autocomplete || 'off')}">
            </p>`;
    }

    return `
        <fieldset class="step-q" data-step>
          <legend class="q">${esc(st.question)}</legend>
          ${st.note ? `<p class="q__note">${esc(st.note)}</p>` : ''}
          ${body}
        </fieldset>`;
  };

  const c = spec.confirm;

  return `<section class="band is-light intake" id="${esc(s.id || 'intake')}" data-label="${esc(s.label || spec.title)}">
  <div class="wrap intake__wrap">

    <form class="intake__form" data-intake data-intake-name="${esc(s.intake)}"
          action="/api/intake" method="post" novalidate>
      <input type="hidden" name="intake" value="${esc(s.intake)}">

      <header class="intake__head">
        <span class="meta">${esc(spec.title)}</span>
        <p class="lede">${esc(spec.lead)}</p>
        ${Object.entries(s.contextNotes || {}).map(([ctx, note]) =>
          `<p class="intake__context" data-for-context="${esc(ctx)}">${esc(note)}</p>`).join('')}
        <span class="meta intake__count" data-step-count></span>
      </header>

      ${spec.steps.map(step).join('')}

      <p class="sr-only" role="status" aria-live="polite" data-live></p>

      <div class="intake__acts">
        <button class="btn btn--primary" type="button" data-next>Continue</button>
        <button class="btn btn--primary" type="submit" data-submit hidden>Send</button>
        <button class="btn btn--quiet" type="button" data-back hidden>Back</button>
      </div>
    </form>

    <div class="confirm" data-confirm hidden>
      ${mark('44px')}
      <h2 class="m confirm__head">${esc(c.head)}</h2>
      <p class="lede">${esc(c.lead)}</p>
      <ol class="confirm__next">${c.next.map((n) => `
        <li><span class="meta">${esc(n.when)}</span><span>${esc(n.what)}</span></li>`).join('')}
      </ol>
      <p class="confirm__boundary">${esc(c.boundary)}</p>
    </div>

  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   PROSE — a document page, typeset for reading and for print
   ══════════════════════════════════════════════════════════════════════════ */
function prose(s) {
  const blocks = s.blocks.map((b) => {
    if (b.type === 'h')    return `<h2 class="doc__h">${b.text}</h2>`;
    if (b.type === 'lead') return `<p class="lede doc__lead">${b.text}</p>`;
    if (b.type === 'note') return `<p class="doc__note">${b.text}</p>`;
    if (b.type === 'entry') {
      return `<article class="entry">
        <div class="entry__head">
          <span class="meta entry__dest">${esc(b.destination)}</span>
          <h3 class="entry__name">${esc(b.name)}</h3>
        </div>
        <div class="entry__body">
          <p>${b.body}</p>
          ${b.partner ? `<p class="partner">${b.partner}</p>` : ''}
        </div>
        <dl class="entry__meta">
          <div><dt>Format</dt><dd>${esc(b.format)}</dd></div>
          <div><dt>Suits</dt><dd>${esc(b.suits)}</dd></div>
          <div><dt>Status</dt><dd class="is-status">${esc(b.status)}</dd></div>
        </dl>
      </article>`;
    }
    return `<p>${b.text}</p>`;
  }).join('\n      ');

  return `<article class="doc" id="${esc(s.id || 'doc')}" data-label="${esc(s.label || '')}">
  <div class="doc__wrap">
    <header class="doc__cover">
      ${mark('40px')}
      <span class="meta">${esc(s.eyebrow)}</span>
      <h1 class="l doc__title">${s.headline}</h1>
      <p class="lede">${esc(s.lead)}</p>
    </header>
    <div class="doc__body">
      ${blocks}
    </div>
    <footer class="doc__foot">
      <p class="doc__note">${esc(s.boundary)}</p>
    </footer>
  </div>
</article>`;
}


/* A standalone confirmation page — see content/thank-you.js. Shares the shape
   of the in-form confirmation so the two cannot drift apart visually. */
function confirmation(s) {
  return `<section class="band is-light intake" id="${esc(s.id || 'sent')}" data-label="${esc(s.label || '')}">
  <div class="wrap intake__wrap">
    <div class="confirm">
      ${mark('44px')}
      <h1 class="m confirm__head">${esc(s.head)}</h1>
      <p class="lede">${esc(s.lead)}</p>
      <ol class="confirm__next">${s.next.map((n) => `
        <li><span class="meta">${esc(n.when)}</span><span>${esc(n.what)}</span></li>`).join('')}
      </ol>
      <p class="confirm__boundary">${esc(s.boundary)}</p>
      ${s.back ? `<div class="acts"><a class="btn btn--quiet" href="${esc(s.back.href)}">${esc(s.back.label)}</a></div>` : ''}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   PAGE HEADER — a hero for a page that has work to do
   ──────────────────────────────────────────────────────────────────────────
   The homepage hero is 100svh with a drifting photograph, because its job is
   to establish a category before anybody reads a word. This one is a third of
   that height and carries no image, because an advisor arrived to find
   something out and a full screen of atmosphere between them and it is a cost,
   not a welcome. Same type scale, same grounds, a quarter of the theatre.
   ══════════════════════════════════════════════════════════════════════════ */
function pageHeader(s) {
  return `<section class="pagehead is-dark" data-hero data-label="${esc(s.label || '')}">
  <div class="wrap pagehead__inner" data-stagger>
    ${eyebrow(s.eyebrow)}
    <h1 class="l">${lines(s.headline)}</h1>
    ${lede(s.lead)}
    <div class="acts" data-reveal>
      ${btn(s.primary, 'primary', s.primaryEvent || 'document_request')}
      ${btn(s.secondary, 'quiet', 'advisor_pathway_click')}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   FIT — who this is for, and who it is not
   ──────────────────────────────────────────────────────────────────────────
   The second column is the point. Naming who should NOT do this is what lets
   the right advisor recognise themselves, and it costs nothing except the
   enquiries that were never going to work. A page that only says "for you" to
   everybody says nothing to anybody.

   An arrival from the Saint Lucia immersion has already walked the first
   ladder, so the note acknowledges it rather than teaching the category twice.
   ══════════════════════════════════════════════════════════════════════════ */
function fit(s) {
  const col = (c, kind) => `
      <div class="fit__col fit__col--${kind}" data-reveal>
        <span class="meta fit__k">${esc(c.label)}</span>
        <ul class="fit__list">${c.items.map((i) => `
          <li>${i}</li>`).join('')}
        </ul>
      </div>`;

  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    ${Object.entries(s.contextNotes || {}).map(([ctx, note]) =>
      `<p class="ctxnote" data-for-context="${esc(ctx)}">${esc(note)}</p>`).join('')}
    <div class="fit" data-stagger>
      ${col(s.forWhom, 'yes')}
      ${col(s.notFor, 'no')}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   FAQ
   ──────────────────────────────────────────────────────────────────────────
   <details>, so it opens without scripting, is findable by in-page search when
   open, and needs no ARIA of its own. The questions are the ones an advisor
   actually asks before committing — commission, client ownership, and where
   the clinical boundary sits — rather than the ones that are comfortable to
   answer.
   ══════════════════════════════════════════════════════════════════════════ */
function faq(s) {
  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    <div class="faq" data-stagger>${s.items.map((q) => `
      <details class="faq__item" data-reveal>
        <summary class="faq__q">${esc(q.q)}<span class="faq__mark" aria-hidden="true"></span></summary>
        <div class="faq__a">${q.a.map((p) => `<p>${p}</p>`).join('')}</div>
      </details>`).join('')}
    </div>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   NUMBERED — an ordered argument
   ══════════════════════════════════════════════════════════════════════════ */
function numbered(s) {
  return `<section class="band ${skinClass(s)}" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap">
    ${eyebrow(s.eyebrow)}
    <h2 class="l" data-reveal>${s.headline}</h2>
    ${lede(s.lead)}
    <ol class="numbered" data-stagger>${s.items.map((it, i) => {
      /* A step may live on another property — the first rungs of the Studio's
         admission pathway are Saint Lucia WELL's, not ours. The link renders
         through the same route table as everything else, so a rung that is not
         live yet shows its status instead of a dead link. */
      const link = it.route
        ? `<p class="numbered__go">${routeLink(it.route, it.linkLabel || 'Open')}</p>`
        : it.href
          ? `<p class="numbered__go"><a href="${esc(it.href)}"${it.event ? ` data-event="${esc(it.event)}"` : ''}>${esc(it.linkLabel || 'More')} &rarr;</a></p>`
          : '';
      return `
      <li class="numbered__item" data-reveal>
        <span class="meta numbered__n">${esc(it.marker || String(i + 1).padStart(2, '0'))}</span>
        <div>
          <h3 class="numbered__h">${esc(it.head)}</h3>
          <p>${it.body}</p>
          ${link}
        </div>
      </li>`;
    }).join('')}
    </ol>
  </div>
</section>`;
}


/* ══════════════════════════════════════════════════════════════════════════
   LONGFORM — legal and policy pages
   ──────────────────────────────────────────────────────────────────────────
   Site chrome kept, unlike the prepared documents: somebody reading the
   privacy policy should be one click from everything else, and a policy page
   that strands you is its own small hostility.

   A contents list because these are scanned for one answer far more often
   than they are read, and a visible "last reviewed" date because a policy
   with no date is a policy nobody is maintaining.
   ══════════════════════════════════════════════════════════════════════════ */
function longform(s) {
  const toc = s.blocks.filter((b) => b.type === 'h' && b.id);

  const body = s.blocks.map((b) => {
    if (b.type === 'h')    return `<h2 class="lf__h" id="${esc(b.id || '')}">${esc(b.text)}</h2>`;
    if (b.type === 'sub')  return `<h3 class="lf__sub">${esc(b.text)}</h3>`;
    if (b.type === 'lead') return `<p class="lede lf__lead">${b.text}</p>`;
    if (b.type === 'list') return `<ul class="lf__list">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    if (b.type === 'defs') return `<dl class="lf__defs">${b.items.map((i) =>
      `<div><dt>${esc(i.term)}</dt><dd>${i.def}</dd></div>`).join('')}</dl>`;
    /* A note that needs to be impossible to skim past — the crisis signpost,
       and anywhere a limit of the service is being stated. */
    if (b.type === 'callout') return `<div class="lf__callout"><p>${b.text}</p></div>`;
    return `<p>${b.text}</p>`;
  }).join('\n      ');

  return `<section class="band is-light lf" id="${esc(s.id || '')}" data-label="${esc(s.label || '')}">
  <div class="wrap lf__wrap">
    <header class="lf__head" data-stagger>
      ${eyebrow(s.eyebrow)}
      <h1 class="l" data-reveal>${s.headline}</h1>
      ${s.lead ? `<p class="lede" data-reveal>${s.lead}</p>` : ''}
      <p class="meta lf__date" data-reveal>Last reviewed ${esc(s.reviewed)}</p>
    </header>

    ${toc.length ? `<nav class="lf__toc" aria-label="On this page" data-reveal>
      <h2 class="meta lf__toc-h">On this page</h2>
      <ol>${toc.map((b) => `<li><a href="#${esc(b.id)}">${esc(b.text)}</a></li>`).join('')}
      </ol>
    </nav>` : ''}

    <div class="lf__body" data-reveal>
      ${body}
    </div>
  </div>
</section>`;
}


const RENDERERS = {
  hero, columns, rungs, collection, stages, ladder, pathways, ecosystem, founder, finalCta,
  intake, prose, confirmation,
  pageHeader, fit, faq, numbered, longform
};

function renderSections(sections) {
  return sections.map((s) => {
    const fn = RENDERERS[s.type];
    if (!fn) throw new Error(`Unknown section type "${s.type}" — add it to lib/components.js`);
    return fn(s);
  }).join('\n\n');
}

module.exports = { renderSections, RENDERERS, figure, btn, routeLink, esc };
