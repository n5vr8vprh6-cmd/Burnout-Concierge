# Pre-launch

Everything that has to happen before `burnoutconcierge.co` points at this site.
Kept current as work lands — if you find something missing, add it here rather
than in a message.

**Status key** — ☐ not started · ◐ in progress · ☑ done · ⚠ needs a decision from Duncan

Last updated: 29 August 2026 (design pass applied)

---

## 1 · Blocking. The site cannot go live without these.

| | Item | Notes |
|---|---|---|
| ⚠ | **Legal review of `/terms`** | The page says on its face that it needs a qualified lawyer. Written to be accurate about the service; not a substitute for legal advice. |
| ⚠ | **Operating entity, registered address, governing law** | Currently unstated on `/terms` rather than guessed. Needed for terms and privacy. |
| ☐ | **`hello@burnoutconcierge.co` mailbox exists** | Referenced on contact, privacy and accessibility. Three pages point at an address that must receive mail. |
| ☐ | **`RESEND_API_KEY` set, sending domain verified** | Without it the endpoint validates and logs but sends nothing. See `.env.example`. |
| ☐ | **SPF, DKIM and DMARC on `burnoutconcierge.co`** | Resend needs the DNS anyway. Do it before any send volume moves. |
| ☐ | **`CONCIERGE_INBOX` and `CONCIERGE_FROM` set in Vercel** | Inbox defaults to `duncan.so@phinklife.org`; change if enquiries should go elsewhere. |
| ☐ | **Vercel project created, repo connected** | `github.com/n5vr8vprh6-cmd/Burnout-Concierge`, build command `npm run build`, output `dist`. |
| ☐ | **DNS cutover for `burnoutconcierge.co`** | Currently Strikingly. Review on a Vercel preview URL at 375 / 768 / 1280 first. |
| ☐ | **Redirects from the current Strikingly site** | Its `/retreats` and `/concierge` must 301 to `/retreats` and `/work-with-a-concierge`. |

## 2 · The BRA retirement

| | Item | Notes |
|---|---|---|
| ☐ | **Redirect project deployed** | A separate minimal Vercel project holding only `next.config.js` redirects. Strikingly cannot serve a page-level 301 map. |
| ☐ | **97-URL map implemented** | Three verdicts per URL — map to a real page, hold on BRA, or retire. Full breakdown in the plan file, Part 4. |
| ☐ | **`burnoutrecoveryaccelerator.com` DNS pointed at it** | Keep the domain renewing indefinitely. It is a redirect asset now, not a brand. |
| ☐ | **Verify with a script** | Curl all 97 URLs, assert expected status and destination. |
| ☐ | **`/fsloscabos` checked specifically** | Must not redirect anywhere implying a Four Seasons relationship. |
| ☐ | **16 `/blog/*` posts left live on BRA** | They move to `/insights` in Phase 2. Redirecting them now burns the authority we are preserving. |
| ☐ | **`/transition` page reviewed** | The migration statement. Retire it ~6 months after launch. |

## 3 · Content that needs Duncan's confirmation

| | Item | Notes |
|---|---|---|
| ⚠ | **Venue names** | Every journey currently shows destination and intention only. Which properties can be named in writing? |
| ⚠ | **Retreat statuses** | Awaken *accepting inquiries*, Nagi *private dates*, Transcend *upcoming cohort*, Revo *in development*, Eclipse *advisor-led*. All accurate? |
| ⚠ | **Eclipse partnership** | The site names Burnout Concierge as holding Eclipse's 90-day integration. Confirmed with Saint Lucia WELL? |
| ⚠ | **Reciprocal link on Saint Lucia WELL** | Their Eclipse page references an unnamed "concierge". Naming us there is the other half of a route this build creates. |
| ⚠ | **Advisor commission structure** | The Prospectus says it is set per journey and agreed in writing. Confirm before an advisor reads it. |
| ⚠ | **Studio pricing** | `/venture-studio` has a section explaining there is no price yet. Replace it with a real number when the offer is fixed — do not just delete it. |
| ☐ | **Founder photograph** | There is deliberately no portrait: the image library is AI-generated and a synthetic face beside a named person is dishonest. Needs a real photograph. |
| ☐ | **Testimonials** | None on the site by design. Each needs documented written consent and accurate attribution before it appears. |
| ☐ | **Partner logos and references** | Only confirmed relationships get named. |

## 4 · Technical, before or shortly after launch

| | Item | Notes |
|---|---|---|
| ☐ | **Advisor/referral ID format checked against Saint Lucia WELL** | Our contract matches theirs parameter-for-parameter (`advisor` / `ref`, first-touch). Confirm the ID *format* matches too, before advisor traffic scales. |
| ☐ | **Analytics destination** | `GTM_ID` is empty and nothing third-party fires. Either enable Vercel Analytics or set a GTM id. Events are already named and firing. |
| ☐ | **Lighthouse on the real deployment** | Target ≥ 90 performance, 100 accessibility. LCP must be the hero poster image. |
| ☐ | **axe DevTools clean pass** | Automated checks only; not a substitute for item below. |
| ☐ | **Assistive-technology testing with disabled users** | Listed as outstanding on `/accessibility`. The honest gap. |
| ☐ | **200% zoom verified** | Every page, every breakpoint. Also listed as outstanding. |
| ☐ | **Kling video** | 1 hero loop + 6 section motifs. ≤2.5 MB each, ≤8 MB total, `preload="none"` behind poster frames. The section schema already has the `video` field. |
| ☐ | **`og-home.jpg` reviewed** | Social card is a crop of the hero. Fine, but worth a look. |

## 5 · The wider integration (after the site is live)

| | Item | Notes |
|---|---|---|
| ☐ | **Register `discoverdestinationwell.com`** | Then flip the routes in `lib/brand.js`. One edit — the site is pre-wired. |
| ☐ | **Register `revoburnoutretreats.com`** | REV currently renders as a labelled non-link. Same one-edit flip. |
| ☐ | **LinkedIn: rename the BRA company page** | Rename rather than create — it preserves followers and history. Then banner, mark, tagline, About, one migration post. |
| ☐ | **Email migration to `@burnoutconcierge.co`** | Old domain forwards for 12+ months. |
| ☐ | **Logo variant coverage confirmed** | Mark and wordmark are extracted and working. Check favicon set and any print variants still needed. |

## 6 · Design-pass notes, for whoever picks this up next

Two conventions were deliberately kept against skill guidance, with reasons:

| Item | Why it stays |
|---|---|
| **The ivory / gold / obsidian palette** | Anti-slop guidance flags warm-cream-plus-brass as the default AI reach for premium-consumer briefs. It is, but here it comes from the Brand Manual by name. Brand direction outranks the heuristic. |
| **`window.addEventListener('scroll')` in `js/motion.js`** | Flagged as banned in favour of IntersectionObserver. Ours is rAF-throttled and passive, and the progress rail genuinely needs scroll position rather than intersection. Rewriting it to observers would be a worse solution to satisfy a rule aimed at unthrottled handlers. |

And one worth watching: **eyebrows are capped at roughly one per three sections.** Adding one above every new section is the fastest way to make the site read as templated again. The rule is mechanical — count `class="meta eyebrow"` against section count.

## 7 · Phase 2, explicitly deferred

Not launch blockers. Listed so they are not mistaken for oversights.

- `/insights` and the six cornerstone articles, then the 16 BRA blog posts move
- `/journeys`, `/retreats`, `/sabbaticals`, `/executive-recovery` and individual retreat pages
- `/advisor-client` — the route and data model are prepared, the page is not built
- `/media`, case studies, an advisor directory
- Supabase, if advisor visit-logging is wanted beyond what submissions capture
- Inlet B rungs 2 and 3 as their own pages, once the training offer and cohort dates are fixed
