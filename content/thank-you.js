/* ============================================================================
   THANK YOU — the scriptless completion, one page per intake
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

   WHY SEVEN PAGES RATHER THAN ONE WITH A QUERY PARAMETER
     This was a single generic page, so a Studio applicant read "a reply written
     for your circumstances" and a property owner read about a recovery journey.

     The obvious fix — /thank-you?i=studio and a script that swaps the copy — is
     the one fix that cannot work here, because the reason this page exists at
     all is that scripting is off. A query parameter needs JavaScript to read.
     A path does not.

     So there is a real page per intake, built from the same `confirm` block
     that already feeds the in-page confirmation and the body of the email. One
     source, three surfaces, nothing to keep in sync by hand. /thank-you itself
     stays as the fallback for a submission whose intake cannot be identified.

   They share the title "Thank you" rather than naming the form in the browser
   tab. The path says which door you came through; there is no reason to put it
   in a screenshot as well. All are noindex.
   ========================================================================== */
'use strict';

const { INTAKES, BOUNDARY } = require('./intakes.js');

/* Audience is how an intake describes itself, surface is how a page does. The
   same idea in two vocabularies, mapped once here rather than guessed at. */
const SURFACE = {
  traveller:    'consumer',
  advisor:      'advisor',
  organization: 'organization',
  property:     'partner'
};

/* A terminal page should return somebody to where they were rather than to the
   front door. An advisor who has just requested the Prospectus is not looking
   for the consumer homepage. */
const BACK = {
  consumer:     { label: 'Back to Burnout Concierge',        href: '/' },
  advisor:      { label: 'Back to the advisor pathway',      href: '/for-advisors' },
  organization: { label: 'Back to recovery infrastructure',  href: '/organizations' },
  partner:      { label: 'Back to partnership',              href: '/partners' }
};


/* The fallback, reached only when the intake key is missing or unrecognised.
   Deliberately generic, and promises nothing specific because it cannot. */
const GENERIC = {
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
        { when: 'Soon',       what: 'A reply written for your circumstances, not a template.' },
        { when: 'When ready', what: 'A conversation, if and when you want one.' }
      ],
      boundary: BOUNDARY,
      back: BACK.consumer
    }
  ]
};


const PER_INTAKE = Object.entries(INTAKES).map(([key, spec]) => {
  const surface = SURFACE[spec.audience] || 'consumer';
  return {
    key: `thank-you-${key}`,
    path: `/thank-you/${key}`,
    surface,
    layout: 'plain',
    noindex: true,
    title: 'Thank you — Burnout Concierge',
    description: spec.confirm.lead,

    sections: [
      {
        type: 'confirmation',
        id: 'sent',
        label: 'Thank you',
        head: spec.confirm.head,
        lead: spec.confirm.lead,
        next: spec.confirm.next,
        boundary: spec.confirm.boundary,
        back: BACK[surface]
      }
    ]
  };
});


module.exports = [GENERIC, ...PER_INTAKE];
