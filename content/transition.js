/* ============================================================================
   TRANSITION — where burnoutrecoveryaccelerator.com lands
   ----------------------------------------------------------------------------
   The Burnout Recovery Accelerator is being retired into Burnout Concierge.
   Its homepage is the single highest-traffic URL on the old domain, and
   sending that traffic to a homepage that never mentions the change would
   leave anybody who bookmarked BRA quietly disoriented.

   So the old homepage lands here instead of on `/`. Every other BRA URL that
   has a real equivalent goes straight to it — this page is for the person who
   arrived at the front door, not for someone following a deep link.

   NOINDEX, deliberately. It exists to catch people mid-migration, not to be
   found. Retire it roughly six months after cutover, when the redirects have
   done their work and the old domain is quiet.

   It was in the information architecture from the first plan and never got
   built, which only surfaced when the redirect map needed a target for `/`.
   ========================================================================== */
'use strict';

const REVIEWED = '30 August 2026';

module.exports = {
  key: 'transition',
  path: '/transition',
  surface: 'consumer',
  layout: 'plain',
  noindex: true,
  title: 'The Burnout Recovery Accelerator is now Burnout Concierge',
  description:
    'The Burnout Recovery Accelerator has become Burnout Concierge. What changed, what did not, and where to find what you were looking for.',

  sections: [
    {
      type: 'longform',
      id: 'transition',
      label: 'What changed',
      eyebrow: 'A note for returning visitors',
      headline: 'The Accelerator is now<br>Burnout Concierge.',
      lead: 'Same person behind it, same work, a clearer name for what it actually is. If you were looking for something specific, it is almost certainly still here.',
      reviewed: REVIEWED,
      blocks: [
        { type: 'h', id: 'why', text: 'Why the name changed' },
        { type: 'p', text: 'The Burnout Recovery Accelerator described a programme. What the work had become was a concierge service: designing and accompanying recovery journeys, one person at a time, around their circumstances rather than around a curriculum. Two names for one business was confusing for everybody, including us, so there is now one.' },
        { type: 'p', text: 'Nothing about who runs it has changed. Duncan So is still the person who reads your enquiry and still the person who replies.' },

        { type: 'h', id: 'where', text: 'Where things went' },
        { type: 'defs', items: [
          { term: 'The retreats',
            def: 'Now <a href="/#collection">the collection</a> — Awaken in Los Cabos, Nagi in Kyoto, Transcend in Puerto Vallarta, and Eclipse in Saint Lucia. The properties are named on each.' },
          { term: 'Working with us',
            def: 'Start with <a href="/work-with-a-concierge">a concierge</a>. No form to fight, and it ends in a conversation with a person rather than a booking engine.' },
          { term: 'For organisations',
            def: '<a href="/organizations">Recovery infrastructure</a> — sabbaticals, executive recovery and the return, which is the part most programmes leave out.' },
          { term: 'For travel advisors',
            def: '<a href="/for-advisors">The advisor pathway</a>, and the <a href="/venture-studio">Concierge Venture Studio</a> beyond it.' },
          { term: 'The writing',
            def: 'Still on the old domain for now. It moves here in its own time, and the links you have will keep working until it does.' }
        ] },

        { type: 'h', id: 'gone', text: 'What is not here' },
        { type: 'p', text: 'Some of the old site was of its moment and has not travelled: the pandemic-era resources, a handful of one-off workshops, and a small online store. Those pages are retired rather than redirected, because sending you to something unrelated is worse than telling you plainly that a thing is gone.' },

        { type: 'callout', text: '<strong>If you had something in progress with us, it is not lost.</strong> Write to <a href="mailto:hello@burnoutconcierge.co">hello@burnoutconcierge.co</a> and say what it was. The same person picks that up.' },

        { type: 'h', id: 'boundary', text: 'One thing that has not changed' },
        { type: 'p', text: 'Burnout Concierge provides guided recovery travel. It is designed to complement, rather than replace, medical or mental-health support, and outcomes vary by individual. If you need help now, <a href="/contact">the contact page</a> lists where to find it.' }
      ]
    }
  ]
};
