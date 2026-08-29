/* ============================================================================
   WORK WITH A CONCIERGE — the private consumer entry
   ----------------------------------------------------------------------------
   Three rungs, three real paths:

     /work-with-a-concierge               → A Personal Recommendation
     /work-with-a-concierge/collection    → request the Collection
     /work-with-a-concierge/conversation  → a private conversation

   WHY PATHS RATHER THAN ?intent=
     One page switching form by query parameter would need JavaScript to
     choose, which means the scriptless fallback is three stacked forms — and
     the whole point of the fallback is that it stays usable. Three paths
     deep-link, share a layout, and each renders exactly one form whether or
     not anything runs.

   THE ECLIPSE ARRIVAL
     Somebody arriving with ?source=eclipse has already travelled. They are
     asking about integration, not selection, and the page acknowledges that
     before asking them anything. attribution.js puts the context on <html>;
     the note is in the markup and CSS reveals it. No layout shift, and it is
     simply absent for everybody else.
   ========================================================================== */
'use strict';

const RUNGS = [
  {
    key: 'concierge',
    path: '/work-with-a-concierge',
    intake: 'recommendation',
    title: 'Work with a concierge — Burnout Concierge',
    description:
      'You do not need to choose the right journey before speaking with us. Tell us a little about your circumstances and we will prepare a recommendation.'
  },
  {
    key: 'concierge-collection',
    path: '/work-with-a-concierge/collection',
    intake: 'collection',
    title: 'Request The Recovery Collection — Burnout Concierge',
    description:
      'The five guided recovery journeys in full — the intention behind each, how it runs, and who it tends to suit.'
  },
  {
    key: 'concierge-conversation',
    path: '/work-with-a-concierge/conversation',
    intake: 'conversation',
    title: 'Begin a private conversation — Burnout Concierge',
    description:
      'A calm conversation with a concierge. No pressure, no commitment, and no need to have decided anything beforehand.'
  }
];

module.exports = RUNGS.map((r) => ({
  key: r.key,
  path: r.path,
  surface: 'consumer',
  layout: 'plain',
  title: r.title,
  description: r.description,
  sections: [
    {
      type: 'intake',
      id: 'intake',
      label: 'Work with a concierge',
      intake: r.intake,
      contextNotes: {
        eclipse:
          'You’ve travelled with Eclipse. Integration support is what we hold after a journey — so answer only what still applies, and we’ll pick up from where you are.'
      }
    }
  ]
}));
