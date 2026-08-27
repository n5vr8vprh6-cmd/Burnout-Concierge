/* ============================================================================
   SITE — small behaviours that are not motion and not measurement
   ----------------------------------------------------------------------------
   Deliberately thin. Anything that grows past a few dozen lines belongs in its
   own file rather than in a bag marked "misc".
   ========================================================================== */
(function () {
  'use strict';

  /* An advisor arriving from the Saint Lucia immersion has already met the
     category; an Eclipse guest is asking about integration, not selection.
     attribution.js has already put the context on <html>. Announcing it once
     here means a section can adapt without every component reading storage. */
  var ctx = document.documentElement.getAttribute('data-context');
  if (ctx && window.bcTrack) {
    if (ctx === 'dsw-immersion') window.bcTrack('advisor_inbound_dsw');
  }

  /* ── Mobile menu ────────────────────────────────────────────────────────
     A disclosure, not a drawer. The panel is hidden with `display`, so its
     links leave the tab order entirely when collapsed — visually hiding them
     while leaving them focusable is the classic way to strand a keyboard
     user in an invisible menu. */
  var nav = document.querySelector('[data-header]');
  var toggle = nav && nav.querySelector('.nav__toggle');

  if (toggle) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* Choosing a destination closes it. */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__links a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Resizing past the breakpoint leaves the panel open but its styles gone,
       which reads as a broken header. Close it when the query stops matching. */
    var mq = window.matchMedia('(min-width: 1081px)');
    var sync = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  }


  /* Smooth in-page jumps still need to land on a focusable target, or a
     keyboard user follows a link and their focus stays where it was. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"], a[href^="/#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href').replace(/^\/?#/, '');
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', '#' + id);
  });
})();
