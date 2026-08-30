/* ============================================================================
   THANK YOU — the scriptless completion
   ----------------------------------------------------------------------------
   Where /api/intake sends a browser that posted a form rather than fetching
   JSON. Two ways to arrive here:

     · scripting is off, so the form posted natively;
     · scripting is on but the fetch failed — a network blip, a cold start —
       and js/intake.js deliberately fell back to a real submission rather
       than losing what somebody had just typed.

   The second is the likelier one, and it is why this page exists. Without it
   that fallback lands on raw JSON, which looks broken at exactly the moment
   somebody has finished trusting you with something.

   Deliberately generic: the specific confirmation is in the email that is
   already on its way.
   ========================================================================== */
'use strict';

const { BOUNDARY } = require('./intakes.js');

module.exports = {
  key: 'thank-you',
  path: '/thank-you',
  surface: 'consumer',
  layout: 'plain',
  noindex: true,
  title: 'Thank you — Burnout Concierge',
  description: 'Your message has reached us.',

  sections: [
    {
      type: 'confirmation',
      id: 'sent',
      label: 'Thank you',
      head: 'That’s reached us.',
      lead: 'A confirmation is on its way to your inbox, and Duncan will read what you sent himself.',
      next: [
        /* Not 'attached'. visitorEmail() in api/intake.js sends a link, and
           since the documents went noindex that link is the only way in. */
        { when: 'Today',      what: 'A confirmation email, with whatever you asked for in it.' },
        { when: '2 days',     what: 'A reply written for your circumstances, not a template.' },
        { when: 'When ready', what: 'A conversation, if and when you want one.' }
      ],
      boundary: BOUNDARY,
      back: { label: 'Back to Burnout Concierge', href: '/' }
    }
  ]
};
