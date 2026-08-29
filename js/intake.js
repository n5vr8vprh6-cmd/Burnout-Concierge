/* ============================================================================
   INTAKE — one question at a time
   ----------------------------------------------------------------------------
   The engine behind all six intakes. It knows nothing about any particular
   one: the server renders every step into the page as a <fieldset>, and this
   file shows one at a time, collects the answers, and posts them.

   NO SCRIPTING, NO PROBLEM
     Without this file the form is an ordinary long form with every question
     visible and a working submit button. That is the whole fallback: the
     steps are real fieldsets in document order, `hidden` is only ever applied
     by script, and the <form> posts to the same endpoint either way.

     A one-question-at-a-time form that renders blank without JavaScript would
     be the worst possible failure for this particular audience.

   NO PROGRESS BAR
     Deliberate. A progress bar turns three questions into a chore to endure
     and invites the count to creep upward. The step line says "2 of 5" in
     words, quietly, and that is enough.

   NO SCORE, NO RESULT
     The final screen confirms that a person is preparing something. It never
     rates, ranks, profiles or diagnoses. If you are ever tempted to add a
     result screen here, read content/intakes.js first.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.querySelector('[data-intake]');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
  if (steps.length < 2) return;          /* a single-step intake needs no engine */

  var counter  = form.querySelector('[data-step-count]');
  var backBtn  = form.querySelector('[data-back]');
  var nextBtn  = form.querySelector('[data-next]');
  var submitBtn = form.querySelector('[data-submit]');
  var live     = form.querySelector('[data-live]');
  var reduced  = document.documentElement.getAttribute('data-motion') !== 'full';

  var at = 0;

  /* Progressive enhancement starts here: until this line runs, every step is
     visible and the form is usable. */
  form.setAttribute('data-enhanced', '');

  function stepIsAnswered(step) {
    var inputs = step.querySelectorAll('input, textarea, select');
    var radios = step.querySelectorAll('input[type=radio]');

    if (radios.length) {
      for (var r = 0; r < radios.length; r++) if (radios[r].checked) return true;
      return false;
    }
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      if (el.required && !el.value.trim()) return false;
      if (el.type === 'email' && el.value && !el.checkValidity()) return false;
    }
    return true;
  }

  function show(index, focus) {
    at = Math.max(0, Math.min(steps.length - 1, index));

    steps.forEach(function (s, i) {
      var current = i === at;
      s.hidden = !current;
      if (current) s.removeAttribute('hidden');
    });

    var last = at === steps.length - 1;
    if (counter)   counter.textContent = (at + 1) + ' of ' + steps.length;
    if (backBtn)   backBtn.hidden = at === 0;
    if (nextBtn)   nextBtn.hidden = last;
    if (submitBtn) submitBtn.hidden = !last;

    if (focus !== false) {
      var target = steps[at].querySelector('input, textarea, select, button');
      if (target) {
        try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      }
      /* Announce the new question, since visually it replaced the old one but
         to a screen reader nothing obviously happened. */
      if (live) {
        var q = steps[at].querySelector('legend');
        live.textContent = (q ? q.textContent.trim() : '') + ' — step ' + (at + 1) + ' of ' + steps.length;
      }
    }

    if (!reduced) {
      steps[at].classList.remove('is-entering');
      /* reflow, so the class re-applies and the crossfade runs again */
      void steps[at].offsetWidth;
      steps[at].classList.add('is-entering');
    }
  }

  function advance() {
    if (!stepIsAnswered(steps[at])) {
      var invalid = steps[at].querySelector('input:invalid, select:invalid');
      if (invalid) invalid.reportValidity();
      else if (live) live.textContent = 'Choose an option to continue.';
      return;
    }
    if (at < steps.length - 1) show(at + 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', advance);
  if (backBtn) backBtn.addEventListener('click', function () { show(at - 1); });

  /* Choosing an option moves on by itself. On a five-question form that is the
     difference between answering and filling in. Text fields do not, because
     you are still typing. */
  form.addEventListener('change', function (e) {
    if (e.target.type !== 'radio') return;
    if (reduced) { advance(); return; }
    setTimeout(advance, 260);
  });

  /* Enter advances rather than submitting a half-finished form. */
  form.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (e.target.tagName === 'TEXTAREA') return;
    if (at < steps.length - 1) { e.preventDefault(); advance(); }
  });

  show(0, false);


  /* ── Submission ──────────────────────────────────────────────────────────
     Posts JSON and swaps in the confirmation. If the request fails for any
     reason the form falls back to a normal POST, so a submission is never
     silently lost — the visitor either sees a confirmation or a real page. */
  form.addEventListener('submit', function (e) {
    /* The form carries `novalidate` so the engine can control when validation
       fires rather than having the browser interrupt every step change. That
       means an unanswered final step would otherwise submit silently — so the
       check has to block and raise the message itself. */
    if (!stepIsAnswered(steps[at])) {
      e.preventDefault();
      var bad = steps[at].querySelector('input:invalid, select:invalid')
             || steps[at].querySelector('input, select');
      if (bad && bad.reportValidity) bad.reportValidity();
      if (live) live.textContent = 'Please complete this step before sending.';
      return;
    }

    e.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
    }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    if (window.bcAttribution) data.attribution = window.bcAttribution();

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function () {
        var confirm = document.querySelector('[data-confirm]');
        if (!confirm) { form.submit(); return; }
        form.hidden = true;
        confirm.hidden = false;
        confirm.setAttribute('tabindex', '-1');
        confirm.focus({ preventScroll: true });
        confirm.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        if (window.bcTrack) {
          window.bcTrack('intake_complete', { intake: form.dataset.intake });
        }
      })
      .catch(function () {
        /* Network, server, or anything else: hand it back to the browser. */
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.label || 'Send';
        }
        form.removeAttribute('data-enhanced');
        steps.forEach(function (s) { s.hidden = false; });
        form.submit();
      });
  });

  if (window.bcTrack) window.bcTrack('intake_start', { intake: form.dataset.intake });
})();
