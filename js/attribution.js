/* ============================================================================
   ATTRIBUTION — source and advisor referral, preserved across the ecosystem
   ----------------------------------------------------------------------------
   This is deliberately the SAME contract as Saint Lucia WELL's
   js/attribution.js, down to the parameter names and the first/last-touch
   split. Burnout Concierge and Saint Lucia WELL are two properties in one
   ecosystem: an advisor sends a client to one and the client may finish at the
   other. If the two sites disagreed about what `advisor` means, the funnel
   could not be joined and lead ownership would be unprovable.

   TWO CLASSES OF PARAMETER, DELIBERATELY SEPARATED
     · advisor referral (`advisor`, `ref`) — establishes lead ownership. Only
       these confer ownership, and only the FIRST one seen in a session wins,
       so a later untagged or differently-tagged visit cannot silently
       reassign a lead that somebody else earned.
     · everything else (utm_*, `src`, `campaign`) — last touch, retained for
       attribution and reporting only.

   THE CROSS-DOMAIN HOP
     The advisor pathway runs partly on discoversaintluciawell.com. sessionStorage
     is per-origin, so ownership would be lost at the boundary. Outbound links to
     ecosystem domains therefore carry the ownership param explicitly, and Saint
     Lucia WELL's own script picks it up as its first touch. That single line is
     what makes this an ecosystem rather than two sites.

   Stored in sessionStorage, not a cookie: no consent banner is required for
   first-party session state, and it expires when the visit does. Nothing here
   is sent anywhere on its own — it decorates links and rides along on form
   submissions so a funnel can be reconstructed later.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'bc.attr';

  /* Identical to Saint Lucia WELL. Do not diverge without changing both. */
  var OWNER_PARAMS  = ['advisor', 'ref'];
  var SOURCE_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
                       'utm_term', 'src', 'campaign'];

  /* Where an inbound visitor came from inside the ecosystem. Read on landing
     and persisted, so the advisor gateway can acknowledge that somebody has
     already met the category rather than teaching it from zero, and so the
     concierge page can lead with integration for an Eclipse guest. */
  var SOURCE_CONTEXT = 'source';

  /* Ecosystem domains that ownership travels to. Saint Lucia WELL is live;
     the other two are registered later and are listed here now so the hop
     works the day they are. */
  var ECOSYSTEM = [
    'discoversaintluciawell.com',
    'discoverdestinationwell.com',
    'revoburnoutretreats.com'
  ];

  var CAP = 120;

  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function write(data) {
    try { sessionStorage.setItem(KEY, JSON.stringify(data)); }
    catch (e) { /* private mode — attribution must never break a page */ }
  }

  var params = new URLSearchParams(location.search);
  var stored = read();
  var changed = false;

  /* Advisor ownership: first touch wins and is never overwritten. */
  OWNER_PARAMS.forEach(function (p) {
    var v = params.get(p);
    if (v && !stored.advisor) {
      stored.advisor      = v.slice(0, CAP);
      stored.advisorParam = p;
      stored.advisorAt    = new Date().toISOString();
      changed = true;
    }
  });

  /* Ecosystem context: also first touch. Someone who arrived from the Saint
     Lucia immersion and then wandered in from a newsletter still arrived, the
     first time, as an advisor who has met the category. */
  var ctx = params.get(SOURCE_CONTEXT);
  if (ctx && !stored.context) {
    stored.context = ctx.slice(0, 64);
    changed = true;
  }

  /* Source data: last touch wins — it describes how they got here this time. */
  SOURCE_PARAMS.forEach(function (p) {
    var v = params.get(p);
    if (v) { stored[p] = v.slice(0, CAP); changed = true; }
  });

  if (!stored.landing) {
    stored.landing  = location.pathname;
    stored.referrer = document.referrer || '(direct)';
    stored.landedAt = new Date().toISOString();
    changed = true;
  }
  if (changed) write(stored);


  /* ── Carry ownership across navigation ───────────────────────────────────
     Internal links get the ownership param reattached, so a funnel survives a
     visitor who opens a page in a new tab where the original tab's
     sessionStorage is not shared. Outbound ecosystem links get it too, which
     is the cross-domain hop described above. utm_* stays out of both, to keep
     analytics paths clean. */
  function isEcosystem(host) {
    for (var i = 0; i < ECOSYSTEM.length; i++) {
      if (host === ECOSYSTEM[i] || host.slice(-(ECOSYSTEM[i].length + 1)) === '.' + ECOSYSTEM[i]) {
        return true;
      }
    }
    return false;
  }

  function decorate() {
    if (!stored.advisor) return;
    var key = stored.advisorParam || 'advisor';
    var links = document.querySelectorAll('a[href]');

    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.dataset.noAttr !== undefined) continue;

      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto|tel):/i.test(href)) continue;

      var url;
      try { url = new URL(href, location.origin); } catch (e) { continue; }

      var internal = url.origin === location.origin;
      if (!internal && !isEcosystem(url.hostname)) continue;
      if (url.searchParams.has(key)) continue;

      url.searchParams.set(key, stored.advisor);
      a.setAttribute('href', internal
        ? url.pathname + url.search + url.hash
        : url.toString());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorate);
  } else {
    decorate();
  }


  /* ── Public accessor ─────────────────────────────────────────────────────
     Read by analytics.js to stamp events, and by any form before submission
     so every enquiry arrives with the whole picture attached. */
  window.bcAttribution = function () {
    var s = read();
    return {
      advisor:     s.advisor     || null,
      advisorParam: s.advisorParam || null,
      advisorAt:   s.advisorAt   || null,
      context:     s.context     || null,
      source:      s.utm_source  || s.src || null,
      medium:      s.utm_medium  || null,
      campaign:    s.utm_campaign || s.campaign || null,
      content:     s.utm_content || null,
      term:        s.utm_term    || null,
      landing:     s.landing     || null,
      referrer:    s.referrer    || null,
      landedAt:    s.landedAt    || null
    };
  };

  /* Applied to <html> so CSS and page scripts can adapt to an inbound
     ecosystem arrival without reading storage themselves. */
  if (stored.context) {
    document.documentElement.setAttribute('data-context', stored.context);
  }
})();
