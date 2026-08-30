/* ============================================================================
   MOTION — the choreography
   ----------------------------------------------------------------------------
   Brief Part 3 §G. Slow reveal, lantern glow, horizon movement, pathway
   progression. No scroll hijacking, no autoplay sound, no parallax on text,
   no pulsing CTAs, no cursor followers.

   MODE LADDER
     full    — IntersectionObserver reveals, scroll-linked drift, progress rail
     instant — reduced-motion, automated agents, or ?flat=1. No observers are
               created, nothing is hidden, nothing animates.

   THE ONE HARD GUARANTEE
     Reveal styles are gated on <html class="js">, which this file's companion
     inline snippet sets. If scripting never runs, no element is ever hidden.
     If scripting runs but the observer never fires — a backgrounded tab, a
     prerender, a renderer that suspends rAF — a failsafe force-shows
     everything after 2.5s. And it SNAPS to the end state rather than starting
     a transition, because a suspended renderer never advances one and the
     content would stay invisible either way.

     Animation may never be the reason content cannot be read.

   No GSAP. Everything below is ~2KB and does what the brief asks for; the
   library goes in only when a specific effect demands it.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* The mode was decided synchronously in <head> — see lib/page.js. Reading it
     back rather than recomputing guarantees this file and the CSS can never
     disagree about whether content is currently hidden. */
  if (root.getAttribute('data-motion') !== 'full') return;

  var animated = document.querySelectorAll('[data-reveal], [data-wipe], [data-line]');


  /* ── Reveals ─────────────────────────────────────────────────────────── */

  function snapAll() {
    for (var i = 0; i < animated.length; i++) {
      var el = animated[i];
      el.style.transition = 'none';
      el.style.transitionDelay = '0s';
      el.setAttribute('data-in', '');
      var inner = el.querySelector(':scope > i');
      if (inner) { inner.style.transition = 'none'; inner.style.transform = 'none'; }
    }
  }

  var observerFired = false;

  var io = new IntersectionObserver(function (entries) {
    observerFired = true;
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.setAttribute('data-in', '');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  /* Stagger siblings inside a group so a row of three arrives as a phrase
     rather than three separate events. */
  for (var i = 0; i < animated.length; i++) {
    var el = animated[i];
    var group = el.closest('[data-stagger]');
    if (group) {
      var sibs = Array.prototype.slice.call(group.querySelectorAll('[data-reveal], [data-line]'));
      var idx = sibs.indexOf(el);
      /* 60ms. Emil's range is 30-80: longer than that and the last item in a row
         arrives late enough to read as lag rather than as cascade. */
      if (idx > 0) el.style.transitionDelay = (idx * 0.06).toFixed(2) + 's';
    }
    io.observe(el);
  }

  setTimeout(function () { if (!observerFired) snapAll(); }, 2500);


  /* ── Scroll-linked work ──────────────────────────────────────────────────
     One rAF-throttled handler for drift, the progress rail and the header.
     Each is cheap; together they are one layout read per frame. */

  var drifters = Array.prototype.slice.call(document.querySelectorAll('[data-drift]'));
  var rail     = document.querySelector('[data-rail-fill]');
  var railName = document.querySelector('[data-rail-label]');
  var header   = document.querySelector('[data-header]');
  var hero     = document.querySelector('[data-hero]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[data-label]'));

  var lastY = 0;
  var railDark = null;   /* null so the first pass always writes */

  function drift() {
    var vh = window.innerHeight;
    for (var i = 0; i < drifters.length; i++) {
      var img  = drifters[i];
      var host = img.parentElement;
      var r    = host.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var p = (vh - r.top) / (vh + r.height);
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      img.style.transform =
        'scale(' + (1.02 + p * 0.06).toFixed(4) + ') translateY(' + ((p - .5) * -18).toFixed(2) + 'px)';
    }
  }

  function progress() {
    if (!rail) return;
    var max = document.body.scrollHeight - window.innerHeight;
    rail.style.height = (max > 0 ? (window.scrollY / max) * 100 : 0).toFixed(2) + '%';
    if (!railName || !sections.length) return;
    var cur = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= window.innerHeight * 0.45) cur = sections[i];
    }
    var label = cur.getAttribute('data-label');
    if (railName.textContent !== label) railName.textContent = label;

    /* The rail is fixed and travels the whole page, so its one colour has to
       work over every ground it passes. Gold measures 7.73:1 on obsidian and
       2.27:1 on ivory — unreadable for half the page, and more of the page now
       that the chapters have made it longer.

       We already know which section is current, because the label just used it.
       Reading its ground costs nothing and lets the colour follow. */
    var dark = cur.classList.contains('is-dark') || !!cur.querySelector('.is-dark');
    if (dark !== railDark) {
      railDark = dark;
      railName.classList.toggle('is-over-dark', dark);
    }
  }

  function chrome() {
    if (!header) return;
    var past = hero ? window.scrollY > hero.offsetHeight - 90 : window.scrollY > 80;
    /* Transparent is the enhancement, not the default - see css/chrome.css. */
    header.classList.toggle('is-over-hero', !past);
    /* Hide on the way down, return on the way up — but never over the hero,
       where the header is part of the composition. */
    var down = window.scrollY > lastY && window.scrollY > window.innerHeight * 0.9;
    header.classList.toggle('is-hidden', down);
    lastY = window.scrollY;
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      drift(); progress(); chrome();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* First paint runs synchronously. rAF may be suspended in a background tab,
     and the rail and header should still be correct when it comes forward. */
  progress(); chrome();
  onScroll();

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) onScroll();
  });


  /* ── Threshold — the lantern ignition ────────────────────────────────────
     One branded moment, once per session. The mark draws itself in and warms
     to gold, then the hero resolves behind it. Uses the actual logo as the
     loading device rather than a spinner.

     Skipped entirely in instant mode (we returned long before here) and on
     any repeat visit within the session. */
  var threshold = document.querySelector('[data-threshold]');
  if (threshold) {
    var SEEN = 'bc.threshold';
    var seen;
    try { seen = sessionStorage.getItem(SEEN); } catch (e) { seen = null; }

    if (seen) {
      threshold.setAttribute('data-done', '');
    } else {
      var strokes = threshold.querySelectorAll('path, rect');
      for (var s = 0; s < strokes.length; s++) {
        var el2 = strokes[s], len = 0;
        try { len = el2.getTotalLength ? el2.getTotalLength() : 0; } catch (e) {}
        if (!len) { var b = el2.getBBox(); len = (b.width + b.height) * 2; }
        el2.style.setProperty('--len', Math.ceil(len));
      }
      requestAnimationFrame(function () { threshold.setAttribute('data-go', ''); });
      setTimeout(function () {
        threshold.setAttribute('data-done', '');
        try { sessionStorage.setItem(SEEN, '1'); } catch (e) {}
      }, 1750);
    }
  }
})();
