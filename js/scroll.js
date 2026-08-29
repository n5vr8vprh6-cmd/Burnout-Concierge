/* ============================================================================
   SCROLL — the cinematic tier only
   ----------------------------------------------------------------------------
   Part 3 §G originally forbade scroll hijacking outright, per Brand Manual §15.
   That was reversed deliberately: the cinematic surfaces (home, journeys,
   retreats, the Collection) may now take scroll as a timeline. The functional
   surfaces — advisor gateway, intakes, organizations, legal — may not, and this
   file is loaded only where `tier: 'cinematic'` is set. See lib/page.js.

   WHY IT IS SAFE TO TAKE SCROLL HERE AND NOWHERE ELSE
     Taking scroll away from somebody browsing reads as being carried. Taking it
     away from somebody trying to finish a form reads as being trapped. That is
     the whole distinction, and it is why the tier gate lives in the page layer
     rather than as a flag inside this file.

   TWO SEPARATE MECHANISMS, AND THEY DEGRADE DIFFERENTLY

     1 · THE GLIDE. Wheel events are captured and the scroll position is eased
         toward its target. This is the weight that makes a held page feel held
         rather than sticky. It runs on fine pointers ONLY. Touch is left
         completely alone: iOS momentum scrolling is better than anything we
         would write, and intercepting it is where hijacking earns its bad name.

         The wheel delta is applied 1:1. We ease WHERE the page is, never HOW
         FAR a gesture travels. Multiplying the delta is what makes a smoothed
         page feel like it is disobeying, and we do not do it.

     2 · THE PIN. A section grows tall, its stage sticks to the viewport, and
         progress through the tall part drives which child is active. This rides
         NATIVE scroll position. It needs no wheel interception, so it behaves
         identically for touch, trackpad, keyboard, scrollbar dragging and
         find-in-page.

   THE CONTENT GUARANTEE, UNCHANGED FROM js/motion.js
     Pinning is the most dangerous thing on this site, because a tall section
     whose stage never advances is a screen of nothing. So the CSS that makes a
     section tall is gated on <html data-pinned>, which is set BY THIS FILE at
     the very bottom, after the engine is known to be running. Three failure
     modes all land on plain, readable, normal-height sections:

       · no scripting at all      → data-motion never set, data-pinned never set
       · reduced motion / ?flat=1 → data-motion="instant", we return immediately
       · this file fails to parse → data-pinned never set

     A child is only ever hidden by [data-state], which is likewise only ever
     set from here. Nothing in the stylesheet hides pinned content on its own.

   NOTHING FOCUSABLE IS EVER PINNED OUT OF VIEW
     The one pinned section on the homepage — the four journey stages — carries
     no links or controls inside its advancing children. That is a precondition,
     not a coincidence: hiding a focusable element from sight while leaving it in
     the tab order strands keyboard users, exactly as the mobile menu comment in
     js/site.js describes. Any future pin must clear the same bar, and the
     focusin handler below is the backstop if one does not.

   ONE DEVICE, DELIBERATELY
     A second pin mode was built and removed. It held the page for three screens
     to arrive at a layout almost identical to the unpinned one, which is scroll
     cost without a payoff. Pinning earns its keep where it genuinely transforms
     a section, and a numbered process is the clearest such case.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* Decided synchronously in <head>. Reading it back rather than recomputing
     guarantees this file and motion.js can never disagree. */
  if (root.getAttribute('data-motion') !== 'full') return;

  var pins   = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var depart = document.querySelector('[data-hero] .hero__inner');
  if (!pins.length && !depart) return;

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var maxScroll = function () {
    return Math.max(0, root.scrollHeight - window.innerHeight);
  };


  /* ── 1 · The glide ────────────────────────────────────────────────────── */

  /* Slow settle. Higher is snappier; past about 0.12 the easing stops reading
     as weight and starts reading as lag on the pointer. */
  var GLIDE = 0.085;

  var canGlide = false;
  try {
    canGlide = matchMedia('(hover: hover) and (pointer: fine)').matches
            && !matchMedia('(pointer: coarse)').matches;
  } catch (e) { canGlide = false; }

  var target = 0, current = 0, gliding = false, written = -1, ticking = false;

  /* A wheel over something that scrolls on its own — an overflowing table, the
     open mobile panel — belongs to that thing, not to the page. */
  function overScroller(node) {
    for (var el = node; el && el !== document.body; el = el.parentElement) {
      if (el.scrollHeight - el.clientHeight > 2) {
        var oy = getComputedStyle(el).overflowY;
        if (oy === 'auto' || oy === 'scroll') return true;
      }
    }
    return false;
  }

  function onWheel(e) {
    if (e.ctrlKey || e.defaultPrevented) return;          /* pinch zoom */
    if (document.querySelector('.nav.is-open')) return;   /* menu is open */
    if (overScroller(e.target)) return;

    var d = e.deltaY;
    if (e.deltaMode === 1) d *= 16;                       /* lines */
    else if (e.deltaMode === 2) d *= window.innerHeight;  /* pages */
    if (!d) return;

    e.preventDefault();

    /* Re-seat on the real position before starting, so a glide beginning after
       a keyboard jump or an anchor link does not snap backwards first. */
    if (!gliding) { current = target = window.scrollY; }

    target = clamp(target + d, 0, maxScroll());
    if (!gliding) { gliding = true; requestAnimationFrame(frame); }
  }


  /* ── 2 · The pins ─────────────────────────────────────────────────────── */

  var tracked = pins.map(function (sec) {
    return {
      sec: sec,
      stage: sec.querySelector('.pin__stage'),
      steps: Array.prototype.slice.call(sec.querySelectorAll('[data-step]')),
      last: -1
    };
  }).filter(function (p) { return p.steps.length; });

  /* One at a time. Steps behind the active one leave upward, steps ahead of it
     wait below, so the direction of travel matches the direction of scroll. */
  function stateFor(i, active) {
    return i < active ? 'past' : i === active ? 'active' : 'future';
  }

  /* `force` skips both the viewport reject and the unchanged-index check. It is
     used once at startup, because in replace mode the steps share a single grid
     cell: a step with no data-state yet is fully opaque, so an unvisited section
     would be all four stages stacked on top of one another. Every step has to
     hold a state before the stylesheet is allowed to stack them. */
  function updatePins(force) {
    var vh = window.innerHeight;

    for (var n = 0; n < tracked.length; n++) {
      var p = tracked[n];
      var r = p.sec.getBoundingClientRect();

      /* Cheap reject for anything nowhere near the viewport. */
      if (!force && (r.bottom < -vh || r.top > vh * 2)) continue;

      /* Measured against the stage, not innerHeight. The stage is sized in svh
         and the two disagree on mobile while the browser chrome is showing. */
      var run = p.sec.offsetHeight - (p.stage ? p.stage.offsetHeight : vh);
      var prog = run > 0 ? clamp(-r.top / run, 0, 1) : 0;
      p.sec.style.setProperty('--p', prog.toFixed(4));

      var active = clamp(Math.floor(prog * p.steps.length), 0, p.steps.length - 1);
      if (active === p.last && !force) continue;
      p.last = active;

      for (var i = 0; i < p.steps.length; i++) {
        p.steps[i].setAttribute('data-state', stateFor(i, active));
      }
    }
  }

  /* Backstop. If a pinned section ever does gain focusable content, tabbing
     into a cleared step scrolls that step into view rather than leaving focus
     somewhere invisible. */
  document.addEventListener('focusin', function (e) {
    var step = e.target.closest && e.target.closest('[data-step]');
    if (!step || step.getAttribute('data-state') === 'active') return;
    var sec = step.closest('[data-pin]');
    if (!sec) return;
    var steps = Array.prototype.slice.call(sec.querySelectorAll('[data-step]'));
    var stage = sec.querySelector('.pin__stage');
    var run = sec.offsetHeight - (stage ? stage.offsetHeight : window.innerHeight);
    gliding = false;
    window.scrollTo(0, sec.offsetTop + run * ((steps.indexOf(step) + 0.5) / steps.length));
  });


  /* ── 3 · The hero's departure ─────────────────────────────────────────── */

  function updateHero() {
    if (!depart) return;
    var p = clamp(window.scrollY / (window.innerHeight * 0.85), 0, 1);
    /* Eased so the hero holds its ground briefly before it goes, rather than
       beginning to dissolve on the first notch of the wheel. */
    var e2 = p * p;
    depart.style.opacity = (1 - e2).toFixed(3);
    depart.style.transform =
      'translateY(' + (-e2 * 42).toFixed(1) + 'px) scale(' + (1 - e2 * 0.04).toFixed(4) + ')';
  }


  /* ── The one loop ─────────────────────────────────────────────────────── */

  function frame() {
    if (gliding) {
      /* Something other than us moved the page — keyboard, scrollbar drag,
         find-in-page, an anchor jump. Hand it back rather than fighting it. */
      if (written >= 0 && Math.abs(window.scrollY - written) > 2) {
        current = target = window.scrollY;
        gliding = false;
      } else {
        current += (target - current) * GLIDE;
        if (Math.abs(target - current) < 0.4) { current = target; gliding = false; }
        written = Math.round(current);
        window.scrollTo(0, written);
      }
    }

    updatePins();
    updateHero();

    if (gliding) requestAnimationFrame(frame);
    else { written = -1; ticking = false; }
  }

  function onScroll() {
    if (gliding || ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updatePins(); updateHero(); ticking = false; });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    for (var i = 0; i < tracked.length; i++) tracked[i].last = -1;
    onScroll();
  });

  if (canGlide) {
    window.addEventListener('wheel', onWheel, { passive: false });

    /* The stylesheet sets scroll-behavior: smooth for anchor jumps. Left on, it
       would run its own animation against every scrollTo the glide makes. */
    root.setAttribute('data-glide', '');

    /* Anchor links hand off to the glide instead of jumping — see js/site.js. */
    window.bcGlideTo = function (y) {
      current = window.scrollY;
      target = clamp(y, 0, maxScroll());
      if (!gliding) { gliding = true; requestAnimationFrame(frame); }
    };
  }

  /* Order matters. Every step gets a state BEFORE the stylesheet is allowed to
     stack them, or a replace-mode section paints as four overlapping stages for
     one frame. Then again afterwards, because the stage only has its sticky
     height once data-pinned is on and the first pass measured it at zero. */
  updatePins(true);
  root.setAttribute('data-pinned', '');
  updatePins(true);
  updateHero();
})();
