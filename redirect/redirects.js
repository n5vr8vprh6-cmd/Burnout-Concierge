/* ============================================================================
   redirects.js — the BRA retirement map, and the only copy of it
   ----------------------------------------------------------------------------
   Both the handler and verify.js read this file, so the thing that runs and the
   thing that checks it cannot disagree. A redirect map maintained in two places
   is a map that is wrong in one of them.

   Built from the 97 URLs in burnoutrecoveryaccelerator.com/sitemap.xml, read
   live rather than from memory. Three verdicts, and every one of the 97 has
   exactly one.

   WHY NOT SEND EVERYTHING TO THE HOMEPAGE
     Because Google reads a mass redirect to one page as a soft 404 and drops
     the URL anyway, so you lose the authority you were trying to keep AND the
     visitor lands somewhere that does not answer them. A page with no
     equivalent is better off saying plainly that it is gone.
   ========================================================================== */
'use strict';

const TARGET = 'https://www.burnoutconcierge.co';

/* ── 301 · has a real equivalent ──────────────────────────────────────────
   Every destination below was checked against the built site. The old plan's
   map sent /retreats to /retreats and / to /transition, and neither page
   existed — /retreats is still Phase 2, and /transition had to be built for
   this. Anything pointing at a 404 is worse than no redirect at all. */
const MOVED = {
  '/':                      '/transition',

  /* The retreats. There is no /retreats page — the journeys live as chapters
     on the homepage, so these land on the sequence itself. */
  '/retreats':              '/#collection',
  '/retreats-2025':         '/#collection',
  '/retreats2020':          '/#collection',
  '/travel-accomodations':  '/#collection',

  /* Property pages, straight to the chapter for that journey. /fsloscabos was
     flagged in the original plan as needing to avoid implying a Four Seasons
     relationship. That relationship is now confirmed in writing and named on
     the site, so the constraint is spent and the honest destination is the
     Awaken chapter, which names the property itself. */
  '/fsloscabos':            '/#awaken',
  '/maxwellpv':             '/#transcend',
  '/transcend':             '/#transcend',

  '/accelerator-2025':      '/work-with-a-concierge',

  '/workplaces':            '/organizations',
  '/workplaces-2025':       '/organizations',
  '/burnoutproof':          '/organizations',
  '/trauma-assist':         '/organizations',
  '/survey':                '/organizations',

  '/travel-partners':       '/partners',
  '/tourism':               '/partners',

  '/about':                 '/about',
  '/our-team':              '/about',

  '/contact':               '/contact',
  '/referrals':             '/contact'
};

/* ── 410 · genuinely gone ─────────────────────────────────────────────────
   Pandemic-era funnels, one-off workshops, a small store, and the debris every
   site of this age carries. 410 rather than 404 because it tells a crawler the
   removal is deliberate and permanent, which clears them from the index faster
   and more cleanly than letting them rot as 404s. */
const GONE = new Set([
  '/covid19', '/covid19-survey', '/covid19-thanks', '/covid-relief-dl',
  '/quitsmoking', '/staycation', '/workingmoms', '/webinargift',
  '/burnout-relief-hypnosis-dl', '/download-ebook',
  '/makepayment',
  '/store/categories', '/store/categories/online-program',
  '/store/products/burnout-relief-program',
  '/thank-you-1', '/thankyou-booking', '/relief-thanks',
  '/don-t-delete-link-to-more-pages', '/in-development-pages', '/links',
  '/sunday', '/pledge', '/survey-thescore',
  '/careers', '/wellbeing-monitoring-app',
  '/community', '/research', '/resources',
  '/events', '/events-2024',
  '/invitationonly'
]);

/* ── 302 · the writing, and the reason cutover is not ready ───────────────
   THE SITEMAP HAS 46 BLOG POSTS. The plan said sixteen. They are the only part
   of the old site with real accumulated authority and they have nowhere to go
   yet — /insights is Phase 2 and does not exist.

   This is a SEQUENCING PROBLEM, not a mapping one. The moment BRA's DNS points
   here, Strikingly stops serving and 46 indexed articles are gone. So:

     · they are 302, not 301 — temporary, because the destination is genuinely
       going to change. A 301 would tell Google this is final and burn the URL;
       a 410 would delete it outright.
     · verify.js reports them as BLOCKING. It will not pass while they are
       unmapped, which makes the constraint mechanical instead of a note in a
       document somebody has to remember to read.

   When /insights ships, map each post to its new URL and promote these to 301. */
const HELD = /^\/blog\//;
const HELD_TARGET = '/transition';

module.exports = { TARGET, MOVED, GONE, HELD, HELD_TARGET };
