# Burnout Concierge

The website for [burnoutconcierge.co](https://www.burnoutconcierge.co) — guided
burnout recovery travel.

## Running it

```
npm install      # one dependency: resend
npm run build    # → dist/
npm run serve    # build, then serve dist/ on :4321
```

`dist/` is plain static HTML with clean URLs and no runtime dependency. Any
static host serves it as-is. **Edit source, never `dist/`.**

## Shape

```
build.js        page registry → dist/
content/        one module per page; a page is data, not markup
lib/            page shell, section renderers, brand + ecosystem routes
css/            tokens.css is the single source of brand truth, loaded first
js/             attribution, analytics, motion, misc
assets/         self-hosted fonts, responsive images, the marks
```

Adding a page is a new `content/*.js` module and one line in `build.js`.

## Conventions worth knowing before you change anything

**The ecosystem route table** (`lib/brand.js`) is the only place that knows
where another property lives. The advisor pathway currently points at Saint
Lucia WELL; when Destination WELL launches, that is one edit here rather than a
search across the content. A route marked `status: 'planned'` renders as a
labelled non-link, never a dead one.

**Attribution** (`js/attribution.js`) is deliberately the same contract as
Saint Lucia WELL, down to the parameter names. `advisor` and `ref` establish
lead ownership and are first-touch — a later visit cannot reassign a lead.
Everything else is last-touch and reporting-only. Ownership is forwarded across
the ecosystem hop so a referral survives the move between domains. **Do not
diverge from this without changing both properties.**

**Nothing may be hidden by animation.** The reveal styles are gated on
`data-motion="full"`, set synchronously in `<head>`. Without scripting, under
reduced motion, or for an automated agent, the attribute is never `full` and
nothing is ever hidden. If the observer fails to fire anyway, a failsafe snaps
everything visible after 2.5s. Keep this property.

**Two colours have text-only variants.** Copper on white measures 3.84:1 and
gold on ivory 2.27:1, so `--copper-deep` and `--gold-deep` exist for text. The
Brand Manual's own values are unchanged and still used everywhere they are not
carrying text. See the note at the top of `css/tokens.css`.

**The type scale has nine steps and a deliberate gap.** Nothing sits between
17px body and 24px sub — the lead is the smallest *display* size, set in the
serif. Adding a size in that gap undoes the thing that makes the page read as
designed rather than assembled.

**Fonts are self-hosted** because a font request is a disclosure. All three
faces are SIL OFL 1.1; see `assets/fonts/OFL.txt`.
