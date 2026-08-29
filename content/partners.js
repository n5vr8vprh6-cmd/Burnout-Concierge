/* ============================================================================
   PARTNERS — properties, destinations, and distribution
   ----------------------------------------------------------------------------
   Three pages: the gateway, the collaboration intake, and the Property Brief.

   TWO AUDIENCES, ONE PAGE, TWO DOORS
     The brief lists eight partner types in one bucket. They are not one
     audience. A resort wanting to become recovery-ready and a host agency
     wanting to bring the specialty to two hundred advisors want opposite
     things, and a page that averages them serves neither.

     So the page splits explicitly:
       · properties, destinations and practitioners → the Property Brief and
         a collaboration conversation
       · host agencies, consortia and advisor networks → the Advisor
         Prospectus, because what they are distributing IS the advisor
         pathway. Sending them a property brief would be a category error.

     That second route deliberately reuses the advisor intake rather than
     inventing an eighth spec. A network partner needs to understand the
     pathway their members would walk, and that document already exists.

   HOSPITALITY IS A DISTINCT ICP
     Not in the original brief, which folded properties into a general partner
     bucket. They get their own language here: recovery-ready is a design
     brief, not an amenity list, and the substance is in what a property
     deliberately leaves out.

   EDITORIAL TIER — Part 3 §B. Air and reveals, no theatre and no pinning.
   ========================================================================== */
'use strict';

const { BOUNDARY } = require('./intakes.js');

module.exports = [

  {
    key: 'partners',
    path: '/partners',
    surface: 'partner',
    layout: 'plain',
    title: 'Partners — Burnout Concierge',
    description:
      'For properties, destinations and practitioners building environments that hold people, and for the networks bringing the burnout specialty to their advisors.',

    sections: [

      {
        type: 'pageHeader',
        label: 'Partners',
        eyebrow: 'For destinations, properties and networks',
        headline: 'Recovery-ready is a design brief,<br>not an amenity list.',
        lead: 'For the people building environments that hold guests rather than simply hosting them, and for the networks bringing this specialty to their advisors.',
        primary:   { label: 'Propose a Collaboration', href: '/partners/collaboration' },
        primaryEvent: 'partnership_inquiry',
        secondary: { label: 'What recovery-ready means', href: '#substance' }
      },

      /* ── What recovery-ready actually means ─────────────────────────────
         The substance section, and the one that earns the page. Most of it
         is about restraint, which is exactly what a property does not
         normally hear from somebody selling them a programme. */
      {
        type: 'numbered',
        skin: 'light',
        id: 'substance',
        label: 'What it means',
        headline: 'Mostly it is about what you leave out.',
        lead: 'Recovery-ready is not a treatment menu or a spa upgrade. Four things matter more than any facility, and three of them cost nothing to build.',
        items: [
          {
            head: 'Somewhere to be unobserved',
            body: 'Depleted people need to be able to eat, move and do nothing without being seen doing it. A property with no unwatched space is difficult to recover in, however beautiful the rooms are.'
          },
          {
            head: 'Pace that does not require negotiation',
            body: 'An optional schedule is still a schedule if declining it takes explaining. The properties that work best make doing nothing the default rather than the thing you opt into.'
          },
          {
            head: 'Staff who know not to fix it',
            body: 'Somebody sitting alone looking unhappy may be doing exactly what they came to do. Hospitality instinct says intervene; recovery says leave them be and stay visible. That is a training question, not a facilities one.'
          },
          {
            head: 'Continuity of person',
            body: 'The same faces across a stay matter more than the range of services offered. Being re-introduced to a new person every day is work, and it is the kind of work these guests have none of to spare.'
          }
        ]
      },

      /* ── Partnership models ──────────────────────────────────────────── */
      {
        type: 'pathways',
        skin: 'light',
        id: 'models',
        label: 'How we work together',
        headline: 'Six ways this usually starts.',
        lead: 'Most partnerships begin narrow and specific rather than as a framework agreement.',
        pathways: [
          { head: 'Recovery journey development',
            body: 'Designing a journey at your property — the arc, the practitioners, the pacing, and bringing guests to it.' },
          { head: 'Recovery-ready review',
            body: 'An assessment of an existing property against what recovery guests actually need, with what to change and what to leave alone.' },
          { head: 'Destination development',
            body: 'Positioning a destination around wellbeing with burnout as the sharpest entry point. This is Destination WELL territory and we work alongside it.' },
          { head: 'Practitioner collaboration',
            body: 'Working inside a designed journey with a defined scope, clear clinical boundaries, and a proper handover.' },
          { head: 'Co-branded advisor introduction',
            body: 'Hosting an introduction to the category for your advisors, your members, or your market.' },
          { head: 'Referral and distribution',
            body: 'Bringing the specialty to an existing membership — where the thing being distributed is the advisor pathway rather than a product.' }
        ]
      },

      /* ── The two doors ──────────────────────────────────────────────────
         A resort and a host agency want opposite things. Averaging them
         would serve neither, so the page routes them apart and says why. */
      {
        type: 'fit',
        skin: 'light',
        id: 'routes',
        label: 'Two routes',
        eyebrow: 'Which one are you',
        headline: 'Two different conversations.',
        lead: 'These are genuinely different partnerships and they start in different places. Take whichever fits, and if it is both, take the first.',
        forWhom: {
          label: 'Properties, destinations, practitioners',
          items: [
            'A resort, hotel or dedicated retreat property',
            'A destination or tourism board positioning around wellbeing',
            'A practitioner group working inside designed journeys',
            'Start with the Recovery-Ready Property Brief, then a conversation'
          ]
        },
        notFor: {
          label: 'Host agencies, consortia, networks',
          items: [
            'A host agency or consortium with advisors to bring',
            'An advisor network or membership organization',
            'A training body whose members want the specialty',
            'Start with the Advisor Prospectus — what you would be distributing is the pathway itself'
          ]
        }
      },

      {
        type: 'finalCta',
        id: 'begin',
        label: 'Begin',
        headline: 'Propose a collaboration.',
        lead: 'Three questions, then the Brief and a conversation about what it would actually involve at your property.',
        primary:   { label: 'Propose a Collaboration', href: '/partners/collaboration' },
        secondary: { label: 'Networks: start with the Prospectus', href: '/for-advisors/prospectus' },
        note: 'Burnout Concierge designs and coordinates recovery travel. Practitioners work within their own scope and licensing; we do not provide clinical care.',
        img: {
          base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
          src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
          alt: 'Golden horizon light emerging from shadow over open water'
        }
      }
    ]
  },

  {
    key: 'partner-intake',
    path: '/partners/collaboration',
    surface: 'partner',
    layout: 'plain',
    title: 'Propose a Collaboration — Burnout Concierge',
    description:
      'Three questions, so the collaboration outline reflects what you already have rather than what a template assumes.',
    sections: [
      { type: 'intake', id: 'intake', label: 'Propose a collaboration', intake: 'property' }
    ]
  },

  {
    key: 'property-brief',
    path: '/property-brief',
    surface: 'partner',
    layout: 'document',
    title: 'The Recovery-Ready Property Brief — Burnout Concierge',
    description:
      'What a recovery-ready environment provides, what it deliberately leaves out, and how collaborations are structured.',
    sections: [
      {
        type: 'prose',
        id: 'brief',
        label: 'The Recovery-Ready Property Brief',
        eyebrow: 'Burnout Concierge · For properties and destinations',
        headline: 'The Recovery-Ready<br>Property Brief',
        lead: 'What these guests actually need, what to change, and — more often — what to leave alone.',
        boundary: BOUNDARY,
        blocks: [
          { type: 'lead', text: 'Most properties are closer to recovery-ready than they assume, and the gap is rarely a facility. It is usually pace, staffing and permission.' },

          { type: 'h', text: 'Who these guests are' },
          { type: 'p', text: 'People who are depleted rather than unwell, and who are frequently high-functioning right up until they are not. They are often used to being looked after well and are not looking for more of it. What they are short of is capacity — for decisions, for conversation, and for being observed.' },

          { type: 'h', text: 'The four things that matter most' },
          { type: 'p', text: 'Somewhere to be unobserved. A pace that does not require negotiation to decline. Staff who understand that somebody sitting alone may be doing exactly what they came for. And continuity of person across a stay — the same faces matter more than the range of services.' },
          { type: 'p', text: 'Three of those four are training and scheduling rather than capital expenditure. That is usually the useful finding.' },

          { type: 'h', text: 'What to leave out' },
          { type: 'p', text: 'Optional programming that is socially expensive to decline. Welcome rituals that require performance on arrival, which is the worst possible moment. Anything framed as transformation, breakthrough or challenge. And any language that implies a clinical outcome — that is a boundary we hold firmly and would need you to hold too.' },

          { type: 'h', text: 'How collaborations are structured' },

          { type: 'entry', name: 'Recovery-ready review', destination: 'An existing property',
            body: 'An assessment against what these guests need, with a short list of what to change and a longer one of what to leave alone.',
            format: 'Site visit and written review', suits: 'Established properties', status: 'Available' },

          { type: 'entry', name: 'Recovery journey development', destination: 'At your property',
            body: 'Designing a journey with you — the arc, the practitioners, the pacing, and bringing guests to it.',
            format: 'Design and distribution', suits: 'Properties ready to host', status: 'By conversation' },

          { type: 'entry', name: 'Practitioner collaboration', destination: 'Inside a journey',
            body: 'Working within a designed journey with a defined scope, clear boundaries and a proper handover.',
            format: 'Per journey', suits: 'Practitioner groups', status: 'Available' },

          { type: 'entry', name: 'Destination development', destination: 'Region or board',
            body: 'Positioning a destination around wellbeing with burnout as the entry point. Runs alongside Destination WELL rather than in competition with it.',
            format: 'Programme', suits: 'DMOs and tourism boards', status: 'By conversation' },

          { type: 'h', text: 'What we ask of a partner' },
          { type: 'p', text: 'Honesty about what the property is not, which is more useful to us than a list of what it is. Willingness to brief staff on a different instinct from the usual hospitality one. And a shared line on language: nothing clinical, nothing promising outcomes, and no claim either party could not defend.' },

          { type: 'note', text: 'Prepared for you by Burnout Concierge. Not for distribution.' }
        ]
      }
    ]
  }
];
