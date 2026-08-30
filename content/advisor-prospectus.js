/* ============================================================================
   THE ADVISOR PROSPECTUS — intake, and the document it delivers
   ----------------------------------------------------------------------------
   Two pages from one file, because they are two halves of one thing.

     /for-advisors/prospectus  — three questions, then a prepared pathway
     /advisor-prospectus       — the document itself

   The intake decides Inlet A or Inlet B and shows the advisor none of it. They
   receive the Prospectus and a human follow-up; the routing appears only in
   the email that reaches us. See routeAdvisor() in content/intakes.js.
   ========================================================================== */
'use strict';

const { BOUNDARY } = require('./intakes.js');

module.exports = [

  {
    key: 'advisor-intake',
    path: '/for-advisors/prospectus',
    surface: 'advisor',
    layout: 'plain',
    title: 'Request the Advisor Prospectus — Burnout Concierge',
    description:
      'Three questions, so the pathway we send back is the one that fits your practice.',
    sections: [
      {
        type: 'intake',
        id: 'intake',
        label: 'The Advisor Prospectus',
        intake: 'advisor',
        contextNotes: {
          'dsw-immersion':
            'You’ve come from the Saint Lucia WELL immersion, so we already know you have met the category. These three still help us pitch the reply correctly.'
        }
      }
    ]
  },

  {
    /* noindex, and deliberately not in the footer. This document closes with
       "Not for distribution", and that was untrue while it sat one footer click
       away and in the sitemap. The intake is the door: api/intake.js emails the
       link to whoever asks. Reachable by URL, just not advertised or crawled.

       The Infrastructure Brief is the exception and stays public — it says
       "Circulate freely inside your organisation", which is what it is for. */
    noindex: true,
    key: 'advisor-prospectus',
    path: '/advisor-prospectus',
    surface: 'advisor',
    layout: 'document',
    title: 'The Advisor Prospectus — Burnout Concierge',
    description:
      'The category, the specialty, both pathways, and the Concierge Venture Studio.',
    sections: [
      {
        type: 'prose',
        id: 'prospectus',
        label: 'The Advisor Prospectus',
        eyebrow: 'Burnout Concierge · For travel advisors',
        headline: 'The Advisor<br>Prospectus',
        lead: 'The category, the specialty, and the two pathways into it.',
        boundary: BOUNDARY,
        blocks: [
          { type: 'lead', text: 'Burnout is the most differentiated part of wellness travel and the least well served. This is what the specialty involves, who it suits, and how to enter it.' },

          { type: 'h', text: 'The category' },
          { type: 'p', text: 'Rest stops the drain. Wellness travel is designed around what a property offers. Guided recovery is designed around a person’s circumstances, the environment that suits them, and the return home, and it begins with a conversation rather than a catalogue.' },
          { type: 'p', text: 'That third thing is a specialty rather than a segment. It cannot be sold from a rate sheet, which is precisely why it has not been commoditised.' },

          { type: 'h', text: 'What the specialty involves' },
          { type: 'p', text: 'A deeper discovery conversation. Matching person to environment rather than to amenity. Designing the whole arc — arrival, regulation, the work, and the return. Coordinating practitioners inside a defined scope. Ninety days of return-home integration. And language that holds up under scrutiny, with no claim you could not defend.' },

          { type: 'h', text: 'Two pathways' },

          { type: 'entry', name: 'Inlet A — via the ecosystem', venue: 'Hosted by Saint Lucia WELL',
            body: 'For the general advisor adding wellness. Introduction, Foundations and the Immersion are live now on discoversaintluciawell.com, and they build the destination base first. We link to them rather than duplicating a programme already in market.',
            format: 'Three rungs, externally hosted', suits: 'New to wellness travel',
            status: 'Live now' },

          { type: 'entry', name: 'Inlet B — direct', venue: 'Ours, end to end',
            body: 'For the advisor whose wellness practice is already established. Burnout as a category, then specialist training, then a burnout retreat travelled rather than read about.',
            format: 'Three rungs, ours', suits: 'Wellness-credentialled advisors',
            status: 'Cohorts forming' },

          { type: 'entry', name: 'The Concierge Venture Studio', venue: 'Where both pathways converge',
            body: 'A selective business-building environment for qualified advisors: positioning, offer, client journey, discovery process, portfolio, workflows and activation. It is not a course, a certification, a franchise or a lead programme, and admission is by interview.',
            format: 'Interview-based admission', suits: 'Demonstrated category commitment',
            status: 'Admission by conversation' },

          { type: 'h', text: 'Commercial terms' },
          { type: 'p', text: 'Commission is set per journey rather than as a blanket rate, because it differs between our own journeys and partner journeys, and it is agreed in writing before anything is sold. Client ownership stays with you throughout; referral attribution travels with your link across both properties, and the first referral recorded is the one that holds.' },
          { type: 'p', text: 'We publish no income figures, projections or averages. Nobody can support them honestly in a category this young.' },

          { type: 'h', text: 'The boundary' },
          { type: 'p', text: 'Advisors design and coordinate travel. Practitioners and licensed professionals do clinical work. The line between those is firm, and a meaningful part of the training is about recognising when somebody needs something other than a journey, and how to say so well.' },

          { type: 'h', text: 'Where to start' },
          { type: 'p', text: 'If wellness travel is new to you, begin with the Saint Lucia WELL introduction. If it is already your specialty, begin with us. If you have completed the Saint Lucia immersion, you have met the category already — Eclipse is itself a burnout retreat, and you start further along.' },

          { type: 'note', text: 'Prepared for you by Burnout Concierge. Not for distribution.' }
        ]
      }
    ]
  }
];
