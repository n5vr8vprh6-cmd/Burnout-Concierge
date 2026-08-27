/* ============================================================================
   ANALYTICS — named events, stamped with attribution
   ----------------------------------------------------------------------------
   Brief §18. The site measures movement BETWEEN ecosystem properties, not just
   conversion on this one, so every event carries the advisor referral and the
   inbound context alongside it.

   Load order matters and is fixed in lib/page.js: attribution.js must parse
   before this file, because `page_view` fires at parse time and reads
   window.bcAttribution() to stamp itself. Loaded the other way round, every
   pageview ships without its attribution and the funnel cannot be joined.

   No third party fires by default. GTM_ID is empty; Vercel Analytics is used
   only if the deployment injects it. Nothing here sets a cookie.
   ========================================================================== */
(function () {
  'use strict';

  var GTM_ID = '';   /* deliberately empty — see privacy policy §10 */

  function attr() {
    try { return window.bcAttribution ? window.bcAttribution() : {}; }
    catch (e) { return {}; }
  }

  /* The named event vocabulary. Kept as a list so a typo throws in dev rather
     than silently creating a new event nobody ever reports on.

     The external_* names are deliberately unchanged from the brief even though
     they currently point at Saint Lucia WELL rather than Destination WELL. When
     the pathway moves domains the events keep their names, and the funnel
     history stays continuous across the cutover. */
  var EVENTS = [
    'page_view', 'scroll_depth',
    /* advisor */
    'advisor_pathway_click', 'advisor_inbound_dsw', 'dsw_advisor_click',
    'external_intro_click', 'external_foundations_click', 'external_immersion_click',
    'venture_studio_application',
    /* consumer */
    'consumer_path_click', 'retreat_view', 'eclipse_click',
    'concierge_intake_start', 'concierge_intake_complete',
    /* documents and intakes */
    'document_request', 'intake_start', 'intake_complete',
    /* other audiences */
    'organization_inquiry', 'partnership_inquiry',
    /* ecosystem */
    'revo_external_click', 'substack_click'
  ];

  function track(name, detail) {
    if (EVENTS.indexOf(name) === -1) {
      if (location.hostname === 'localhost') {
        throw new Error('Unknown analytics event "' + name + '" — add it to EVENTS or fix the caller.');
      }
      return;
    }
    var a = attr();
    var payload = {
      event: name,
      advisor: a.advisor || null,
      context: a.context || null,
      source: a.source || null,
      medium: a.medium || null,
      campaign: a.campaign || null,
      path: location.pathname
    };
    if (detail) for (var k in detail) if (detail.hasOwnProperty(k)) payload[k] = detail[k];

    if (GTM_ID) { (window.dataLayer = window.dataLayer || []).push(payload); }
    if (window.va) { try { window.va('event', { name: name, data: payload }); } catch (e) {} }
    if (location.hostname === 'localhost' && window.console) console.debug('[track]', name, payload);
  }

  window.bcTrack = track;

  track('page_view');

  /* Ecosystem and CTA clicks are declared in markup rather than wired by
     selector, so a new link carries its own event and nothing has to be
     remembered here. */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-event]') : null;
    if (!el) return;
    var detail = {};
    if (el.dataset.eventLabel) detail.label = el.dataset.eventLabel;
    if (el.href) detail.href = el.href;
    track(el.dataset.event, detail);
  }, { passive: true });

  /* Scroll depth, once per threshold. A cinematic page is long; knowing how
     far people actually get is the difference between "they bounced" and
     "they read it and did not act". */
  var marks = [25, 50, 75, 100], hit = {};
  window.addEventListener('scroll', function () {
    var max = document.body.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = (window.scrollY / max) * 100;
    for (var i = 0; i < marks.length; i++) {
      if (pct >= marks[i] && !hit[marks[i]]) {
        hit[marks[i]] = true;
        track('scroll_depth', { depth: marks[i] });
      }
    }
  }, { passive: true });
})();
