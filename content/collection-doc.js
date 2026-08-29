/* ============================================================================
   THE RECOVERY COLLECTION — the first prepared document
   ----------------------------------------------------------------------------
   The document that rung 1 delivers, and the standard the other three follow.

   IT IS AN HTML PAGE, NOT A PDF, AND THAT IS A DECISION
     The plan said "rendered to PDF at build time". Doing that properly means
     Puppeteer — roughly 300 MB of headless Chromium — on a site whose entire
     dependency list is otherwise one package. That is a poor trade for a
     document most people will read on a phone.

     So the document is a real page, typeset to print specification with @page
     rules and print styles. It reads well on screen, prints or saves to PDF
     from any browser with correct margins and no site chrome, stays in version
     control, updates with the site, and is accessible and linkable in a way a
     PDF attachment is not.

     `npm run pdf` remains available for when a physical run is wanted; it
     installs Puppeteer on demand rather than carrying it permanently.

   NO VENUE NAMES. Destination and intention only, until the property
   relationships are confirmed in writing. The status line on each entry is
   what keeps the collection honest about what is actually bookable.
   ========================================================================== */
'use strict';

const { BOUNDARY } = require('./intakes.js');

module.exports = {
  /* noindex, and deliberately not in the footer. This document closes with
     "Not for distribution", and that was untrue while it sat one footer click
     away and in the sitemap. The intake is the door: api/intake.js emails the
     link to whoever asks. Reachable by URL, just not advertised or crawled.

     The Infrastructure Brief is the exception and stays public — it says
     "Circulate freely inside your organisation", which is what it is for. */
  noindex: true,
  key: 'collection-doc',
  path: '/collection',
  surface: 'consumer',
  layout: 'document',
  title: 'The Recovery Collection — Burnout Concierge',
  description:
    'Five guided recovery journeys — the intention behind each, how it runs, and who it tends to suit.',

  sections: [
    {
      type: 'prose',
      id: 'collection-doc',
      label: 'The Recovery Collection',
      eyebrow: 'Burnout Concierge',
      headline: 'The Recovery<br>Collection',
      lead: 'Five guided journeys, and how to know which one is yours.',
      boundary: BOUNDARY,
      blocks: [
        { type: 'lead', text: 'Each journey is built around a single intention. The right one is usually obvious once the intention is named, which is why the first conversation is about your circumstances rather than a catalogue.' },

        { type: 'h', text: 'How to read this' },
        { type: 'p', text: 'Every entry states its format, who it tends to suit, and — plainly — where it currently stands. A journey marked <em>in development</em> is exactly that. We would rather tell you a thing is not ready than imply a permanent availability we cannot hold.' },
        { type: 'p', text: 'Nothing here is a treatment, and none of it is designed to replace care you may already have. It is travel, designed carefully, around a person rather than a package.' },

        { type: 'h', text: 'The five journeys' },

        { type: 'entry', name: 'Awaken', destination: 'Los Cabos, Mexico',
          body: 'Quiet luxury and somatic renewal, for when the volume has to come down before anything else can happen. The least demanding journey in the collection, and often the right first one.',
          format: 'Seven nights, small group', suits: 'A first recovery journey',
          status: 'Now accepting inquiries' },

        { type: 'entry', name: 'Nagi', destination: 'Kyoto, Japan',
          body: 'Stillness and Japanese philosophy. The slowest journey we run, and deliberately so — the pace is the intervention rather than a setting for one.',
          format: 'Ten nights, six guests', suits: 'Returning travellers',
          status: 'Private dates available' },

        { type: 'entry', name: 'Transcend', destination: 'Puerto Vallarta, Mexico',
          body: 'Emotional release and reconnection, held by practitioners who have done this a long time. The most demanding of the five, and not usually the place to start.',
          format: 'Seven nights, small group', suits: 'Those ready for depth',
          status: 'Upcoming cohort' },

        { type: 'entry', name: 'Revo', destination: 'Toronto, Canada',
          body: 'An urban nervous-system reset for people who cannot leave for a fortnight. Three evenings in the city, built for the constraint rather than apologising for it.',
          format: 'Three evenings, in the city', suits: 'No room to travel far',
          status: 'In development' },

        { type: 'entry', name: 'Eclipse', destination: 'Saint Lucia',
          body: 'When rest alone is no longer enough — six phases, from arrival through to the return home.',
          partner: 'A Saint Lucia WELL journey. Burnout Concierge holds the ninety-day integration that follows it.',
          format: 'Six phases, practitioner-led', suits: 'The overextended achiever',
          status: 'Advisor-led access' },

        { type: 'h', text: 'What happens next' },
        { type: 'p', text: 'If one of these stands out, reply to the email this arrived with. If none of them quite does, which is common and not a problem, say so and we will work backwards from your circumstances instead.' },
        { type: 'note', text: 'Prepared for you by Burnout Concierge. Not for distribution.' }
      ]
    }
  ]
};
