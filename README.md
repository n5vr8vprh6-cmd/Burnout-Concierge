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

## The intake

Seven intakes, one engine. `content/intakes.js` is the single definition of
what each form may ask; `js/intake.js` shows one question at a time;
`api/intake.js` validates against the same spec and sends two emails.

Set `RESEND_API_KEY` to send for real — see `.env.example`. Without it the
endpoint validates, logs the payload and reports success, so the whole flow can
be walked locally without a mail provider.

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

**Assets are versioned by content hash.** `build.js` appends `?v=<hash>` to
every stylesheet and script. Without it a returning visitor keeps whatever
their browser cached, so a CSS change reaches new visitors and not the people
who already came once — exactly backwards. The hash changes when the file does
and not otherwise.

**Three brand colours have text-only variants.** Copper on white is 3.84:1,
gold on ivory 2.27:1 and olive on ivory 3.35:1, so `--copper-deep`,
`--gold-deep` and `--olive-deep` exist for text. The Brand Manual's own values
are unchanged and still used wherever they are not carrying text — rules,
icons, decorative marks, and every use on obsidian. See the note at the top of
`css/tokens.css`.

**The type scale has nine steps and a deliberate gap.** Nothing sits between
17px body and 24px sub — the lead is the smallest *display* size, set in the
serif. Adding a size in that gap undoes the thing that makes the page read as
designed rather than assembled.

**Fonts are self-hosted** because a font request is a disclosure. All three
faces are SIL OFL 1.1; see `assets/fonts/OFL.txt`.

**The intake never scores anybody.** No quiz, no profile, no readiness rating,
no result screen — the confirmation says a person is preparing something. The
advisor intake decides Inlet A or B and shows the advisor none of it.

**There is no price on the Venture Studio page, and a section explaining why.**
The brief says publish pricing only once the offer and admission model are
fixed. They are not. Saying nothing would read as evasion to exactly the person
that page is for, so it says plainly that there is no price yet, why, and what
happens instead. Remove that section only when a real number replaces it.

**No question may ask about symptoms.** §14 forbids collecting health or
emotional history through a marketing form. There are no textareas anywhere in
the intake and no open "tell us what you're experiencing" field, and the
endpoint drops any field the spec did not ask for — so a forged payload cannot
put a medical history in the inbox either. If a new question cannot be answered
by a calendar, a map, or a yes/no, it probably does not belong.

The one open field on the site is in the Studio intake and asks an advisor
about their own practice. That is a different act from asking a depleted person
to describe their state, which is the distinction §14 actually turns on. It is
capped at 300 characters server-side regardless of what is submitted.

**Documents are HTML, not PDFs.** They are typeset to print specification and
save to PDF from any browser. Making the build depend on Puppeteer would add
~300 MB of Chromium for a document most people read on a phone. `npm run pdf`
is there for a physical run, and installs Puppeteer only when you ask for it.
