/* ============================================================================
   ORGANIZATIONS — recovery infrastructure, not resilience training
   ----------------------------------------------------------------------------
   Three pages: the gateway, the intake, and the Brief it delivers.

   THE POSITIONING DECISION
     The brief is explicit that workshops, generic resilience training and the
     old workplace education belong low on this page or out of the launch
     entirely. That is a real commercial choice, not tidying: training is what
     everybody sells and it is what this brand used to sell. The
     differentiation is recovery infrastructure — sabbaticals, executive
     recovery, travel, and the return.

     So there is no training section, and the page says why. An HR leader who
     wanted a resilience workshop should leave knowing we are not the right
     supplier, quickly.

   THE FUNCTIONAL TIER
     Part 3 §B. Somebody arrived with a person in mind and a budget cycle in
     mind. Reveals and air, no theatre.

   WHO PAYS, AND WHO IT IS FOR
     The person reading is rarely the person travelling. That gap runs through
     the whole page: confidentiality, what the employer does and does not get
     told, and who the client actually is. It is the first thing a serious
     buyer will ask and the FAQ answers it first.
   ========================================================================== */
'use strict';

const { BOUNDARY } = require('./intakes.js');

module.exports = [

  {
    key: 'organizations',
    path: '/organizations',
    surface: 'organization',
    layout: 'plain',
    title: 'For organizations — Burnout Concierge',
    description:
      'When rest is not enough, recovery needs structure. Recovery sabbaticals, executive recovery, leadership reintegration and advisor-supported recovery travel.',

    sections: [

      {
        type: 'pageHeader',
        label: 'Organizations',
        eyebrow: 'For organizations',
        headline: 'When rest is not enough,<br>recovery needs structure.',
        lead: 'For employers, founders and executive sponsors who have discovered that time off, on its own, does not bring people back.',
        /* Part 3 §J: one label per intent. All three routes to the briefing
           intake now say the same thing, and only the document link mentions
           the Infrastructure Brief by name. */
        primary:   { label: 'Request an Executive Briefing', href: '/organizations/briefing' },
        primaryEvent: 'organization_inquiry',
        secondary: { label: 'See the four pathways', href: '#pathways' }
      },

      /* ── The problem, from the employer's side ───────────────────────────
         Each of these is a thing an organization has already watched happen,
         which is what makes infrastructure legible as the answer. */
      {
        type: 'numbered',
        skin: 'light',
        id: 'problem',
        label: 'The problem',
        headline: 'Time off is not a plan.',
        lead: 'Three patterns show up in almost every organization that has tried to solve this with leave policy alone.',
        items: [
          {
            head: 'They come back to exactly what they left',
            body: 'Nothing about the workload, the calendar or the expectations changed while they were away. Four weeks of rest against an unchanged return is a pause, and it is usually spent within a fortnight.'
          },
          {
            head: 'The leave is unstructured, so it is spent badly',
            body: 'Somebody depleted enough to need extended leave is rarely in a position to design it well. Left to plan it themselves, most people either do too much or spend the first three weeks unable to do anything.'
          },
          {
            head: 'Nobody owns the return',
            body: 'Departure has a process. Return has a calendar invitation. The fortnight after somebody comes back is where the whole investment is either consolidated or lost, and it is almost never designed.'
          }
        ]
      },

      /* ── The four pathways ─────────────────────────────────────────────── */
      {
        type: 'pathways',
        skin: 'light',
        id: 'pathways',
        label: 'The four pathways',
        headline: 'Four pathways, one principle.',
        lead: 'Recovery is designed backwards from the return. Each of these can run on its own or as part of a wider programme.',
        pathways: [
          { head: 'Recovery sabbatical programmes',
            body: 'Structured leave designed to return somebody rather than simply pause them — including what changes at work while they are away, and what changes when they are back.' },
          { head: 'Executive recovery',
            body: 'Discreet, individually designed journeys for leaders carrying significant responsibility, arranged so that being away is defensible and the absence is contained.' },
          { head: 'Leadership reintegration',
            body: 'The return itself, treated as part of the work: pacing, scope, what is handed back and in what order, and who is accountable for holding it.' },
          { head: 'Advisor-supported recovery travel',
            body: 'Coordination through your existing travel programme or agency, with the burnout specialty layered on top rather than replacing what already works.' }
        ],
        primary: { label: 'Request an Executive Briefing', href: '/organizations/briefing' },
        event: 'organization_inquiry'
      },

      /* ── What we do not sell ────────────────────────────────────────────
         The brief says keep training out. Saying so plainly is faster for
         everybody than letting somebody discover it on a call. */
      {
        type: 'fit',
        skin: 'light',
        id: 'scope',
        label: 'Scope',
        eyebrow: 'Plainly',
        headline: 'What we do,<br>and what we do not.',
        lead: 'The second column is the useful one. If what you need is in it, we would rather say so now than three conversations from here.',
        forWhom: {
          label: 'What we do',
          items: [
            'Design and run recovery journeys for individuals your organization is sponsoring',
            'Structure sabbatical and extended leave so the time is spent well',
            'Design the return — pacing, scope and accountability for the fortnight that decides it',
            'Work alongside your EAP, benefits provider or occupational health rather than around them',
            'Coordinate through your existing travel programme where you have one'
          ]
        },
        notFor: {
          label: 'What we do not do',
          items: [
            'Resilience workshops, or training days about burnout. Plenty of good suppliers do',
            'Anything clinical. We are not a provider and we do not diagnose or treat',
            'Employee assistance programmes, counselling or crisis response',
            'Engagement surveys, culture audits, or wellbeing platform software',
            'Anything that asks an employee to disclose a health condition to their employer'
          ]
        }
      },

      /* ── How it runs ────────────────────────────────────────────────────── */
      {
        type: 'numbered',
        skin: 'light',
        id: 'how',
        label: 'How it runs',
        headline: 'Briefing, design, journey, return.',
        items: [
          {
            head: 'An executive briefing',
            body: 'A conversation about the specific situation rather than a capability deck. Usually forty-five minutes, and usually enough to establish whether there is anything here for you.'
          },
          {
            head: 'Design, with the individual',
            body: 'The person travelling is our client for the design. The organization sponsors it and sets the boundaries of time and budget; it does not specify the journey.'
          },
          {
            head: 'The journey itself',
            body: 'Coordinated end to end, with a concierge available throughout — to them, not to their employer.'
          },
          {
            head: 'The return, planned in advance',
            body: 'Agreed before departure rather than improvised on the Monday: what they come back to, at what pace, and who is holding it.'
          }
        ]
      },

      /* ── FAQ ────────────────────────────────────────────────────────────
         Confidentiality first, because it is the question that decides
         whether a serious buyer keeps reading. */
      {
        type: 'faq',
        skin: 'light',
        id: 'questions',
        label: 'Questions',
        headline: 'The questions that decide it.',
        items: [
          {
            q: 'What does the employer get told?',
            a: ['That the journey happened, that it is complete, and anything about scheduling or logistics you need in order to plan around it. Nothing else.',
                'You do not receive a report on what somebody worked through, how they seemed, or what they said. If an employee wants to share something, that is theirs to share. Sponsoring a recovery journey does not buy visibility into it, and an arrangement that did would not work anyway — nobody uses a benefit they believe is being reported on.']
          },
          {
            q: 'Who is the client — us or the employee?',
            a: ['You are the customer; they are the client. The organization sets the envelope of time and budget, and the design is done with the person travelling.',
                'That distinction is what makes it work. A journey designed to satisfy an employer produces a compliant fortnight and no recovery.']
          },
          {
            q: 'Is this clinical care?',
            a: ['No. Burnout Concierge designs and coordinates travel. Practitioners on a journey work within their own scope and licensing, and we do not diagnose, treat or provide therapy.',
                'It is designed to complement medical and mental-health support rather than replace it, and where somebody clearly needs something other than a journey, saying so is part of the work.']
          },
          {
            q: 'How does this sit with our EAP or benefits provider?',
            a: ['Alongside. An EAP is for access to support; this is for the design and coordination of a recovery period. They solve different problems and neither substitutes for the other.',
                'Where you have occupational health involved, we work within whatever they have advised rather than in parallel to it.']
          },
          {
            q: 'What does it cost?',
            a: ['It depends on the pathway, the journey and the number of people, so it is quoted per engagement rather than as a rate card, and always in writing before anything is agreed.',
                'The Infrastructure Brief sets out how engagements are structured. We publish no case-study return-on-investment figures, because the honest ones have too many variables to generalise from.']
          },
          {
            q: 'Can we run one person first?',
            a: ['That is usually the right way in, and it is what most organizations do. A single executive recovery or one sabbatical, designed properly, tells you more than a pilot programme designed in the abstract.']
          }
        ]
      },

      {
        type: 'finalCta',
        id: 'begin',
        label: 'Begin',
        headline: 'Start with a briefing.',
        lead: 'Three questions, then the Infrastructure Brief and a conversation about the specific situation you have in mind.',
        primary:   { label: 'Request an Executive Briefing', href: '/organizations/briefing' },
        secondary: { label: 'Read the Infrastructure Brief', href: '/infrastructure-brief' },
        note: 'Burnout Concierge designs and coordinates recovery travel. It is not a clinical provider, an employee assistance programme, or a substitute for medical or mental-health care.',
        img: {
          base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
          src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
          alt: 'Golden horizon light emerging from shadow over open water'
        }
      }
    ]
  },

  {
    key: 'organization-intake',
    path: '/organizations/briefing',
    surface: 'organization',
    layout: 'plain',
    title: 'Request an Executive Briefing — Burnout Concierge',
    description:
      'Three questions, so the outline we send is about your situation rather than a generic programme.',
    sections: [
      { type: 'intake', id: 'intake', label: 'Executive briefing', intake: 'organization' }
    ]
  },

  {
    key: 'infrastructure-brief',
    path: '/infrastructure-brief',
    surface: 'organization',
    layout: 'document',
    title: 'The Recovery Infrastructure Brief — Burnout Concierge',
    description:
      'Recovery sabbaticals, executive recovery, leadership reintegration and recovery travel — written to be forwarded.',
    sections: [
      {
        type: 'prose',
        id: 'brief',
        label: 'The Recovery Infrastructure Brief',
        eyebrow: 'Burnout Concierge · For organizations',
        headline: 'The Recovery<br>Infrastructure Brief',
        lead: 'What recovery infrastructure is, why leave policy alone does not produce it, and how engagements are structured.',
        boundary: BOUNDARY,
        blocks: [
          /* Written to be forwarded to somebody who was not on the call. That
             is the actual job of this document: it has to survive being read
             cold by a CFO who did not ask for it. */
          { type: 'lead', text: 'This is written to be forwarded. If it reached you from a colleague and you were not part of the original conversation, it should still make sense on its own.' },

          { type: 'h', text: 'The problem it addresses' },
          { type: 'p', text: 'Organizations that take burnout seriously usually reach for leave: more of it, or better protected. It is the right instinct and it is rarely sufficient. People return to an unchanged workload, having spent unstructured time badly, into a return nobody designed, and the recovery is spent within a fortnight.' },
          { type: 'p', text: 'Recovery infrastructure is the set of things that make extended leave actually work: structure while away, a designed return, and somebody accountable for both.' },

          { type: 'h', text: 'The four pathways' },

          { type: 'entry', name: 'Recovery sabbatical programmes', destination: 'Structured extended leave',
            body: 'Designed leave for people who need weeks rather than days. Covers what changes at work during the absence, how the time itself is shaped, and what the return looks like.',
            format: 'Programme or single case', suits: 'Organizations designing leave policy', status: 'Available' },

          { type: 'entry', name: 'Executive recovery', destination: 'Individually designed',
            body: 'Discreet journeys for leaders carrying significant responsibility, arranged so the absence is contained and defensible.',
            format: 'Individual', suits: 'A specific leader', status: 'Available' },

          { type: 'entry', name: 'Leadership reintegration', destination: 'The return',
            body: 'The fortnight that decides whether the rest of it held. Pacing, scope, what is handed back and in what order, and who owns it.',
            format: 'Standalone or with a journey', suits: 'Someone returning now', status: 'Available' },

          { type: 'entry', name: 'Advisor-supported recovery travel', destination: 'Through your programme',
            body: 'Coordination through your existing travel programme or agency, with the burnout specialty layered on top.',
            format: 'Via your travel supplier', suits: 'Established travel programmes', status: 'Available' },

          { type: 'h', text: 'Confidentiality' },
          { type: 'p', text: 'The organization is the customer; the person travelling is the client. You are told that the journey happened, that it is complete, and whatever you need for scheduling. You are not told what somebody worked through or how they seemed. Sponsoring a recovery journey does not buy visibility into it, and an arrangement that did would not be used.' },

          { type: 'h', text: 'Scope, and the clinical boundary' },
          { type: 'p', text: 'Burnout Concierge designs and coordinates travel. Practitioners on a journey work within their own scope and licensing. We do not diagnose, treat, or provide therapy or counselling, and this is not an employee assistance programme. It is designed to complement medical and mental-health support, not to replace it.' },
          { type: 'p', text: 'We do not sell resilience training, workshops, culture audits or wellbeing platforms. Where that is what an organization needs, there are good suppliers and we are not one of them.' },

          { type: 'h', text: 'How engagements are structured' },
          { type: 'p', text: 'An executive briefing first — a conversation about the specific situation rather than a capability presentation. Then design with the individual, inside the envelope of time and budget you have set. Then the journey, coordinated end to end. Then the return, agreed before departure rather than improvised on the Monday.' },
          { type: 'p', text: 'Cost is quoted per engagement and always in writing before anything is agreed. We publish no return-on-investment figures: the honest ones have too many variables to generalise from, and the confident ones are not honest.' },

          { type: 'h', text: 'Where most organizations start' },
          { type: 'p', text: 'One person. A single executive recovery or one properly designed sabbatical will tell you more than a programme designed in the abstract, and it commits you to considerably less.' },

          { type: 'note', text: 'Prepared for you by Burnout Concierge. Circulate freely inside your organization.' }
        ]
      }
    ]
  }
];
