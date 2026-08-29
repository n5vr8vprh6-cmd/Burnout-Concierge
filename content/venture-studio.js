/* ============================================================================
   THE CONCIERGE VENTURE STUDIO — where both inlets converge
   ----------------------------------------------------------------------------
   The deepest commitment in the ecosystem and the only rung that exists
   nowhere else. Saint Lucia WELL teaches a destination; this builds a practice.

   POSITIONING, AND WHAT IT IS NOT
     The brief is unusually specific about the negative space, and it is right
     to be: this is NOT a course, a certification, an agency service, a
     franchise, or a passive lead programme. Every one of those is a thing
     somebody will assume it is, and each assumption brings the wrong
     applicant. Naming them costs a few lines and saves both sides an
     interview.

   NO PRICING, AND A SECTION SAYING WHY
     The brief says publish pricing only when the offer, admission model and
     deliverables are fixed. They are not yet. The obvious move is to say
     nothing — but a page about a serious commitment with a conspicuous silence
     where the money goes reads as evasion, not discretion.

     So there is a short section that says plainly there is no price yet, why,
     and what happens instead. An advisor considering this is exactly the
     person who will notice the omission, and answering it before they ask is
     worth more than the number would be.

   EDITORIAL TIER
     Part 3 §B. Reveals and generous air, no pinning and no motifs. More
     considered than the advisor gateway, less cinematic than the homepage —
     which matches what it is: the place somebody arrives having already
     decided to take this seriously.
   ========================================================================== */
'use strict';

module.exports = [

  {
    key: 'venture-studio',
    path: '/venture-studio',
    surface: 'advisor',
    layout: 'plain',
    title: 'The Concierge Venture Studio — Burnout Concierge',
    description:
      'A selective business-building environment for travel advisors specialising in burnout recovery. Admission by conversation, not enrolment.',

    sections: [

      /* ── 1 · HEADER ────────────────────────────────────────────────────── */
      {
        type: 'pageHeader',
        label: 'The Studio',
        eyebrow: 'The Concierge Venture Studio',
        headline: 'Build the advisory practice<br>the category will need.',
        lead: 'Training teaches you the category. It does not, on its own, produce a positioned practice with an offer, a process and demand. That gap is what the Studio is for.',
        primary:   { label: 'Request a Studio Conversation', href: '/venture-studio/conversation' },
        primaryEvent: 'venture_studio_application',
        secondary: { label: 'See the advisor pathway', href: '/for-advisors' }
      },

      /* ── 2 · THE GAP ───────────────────────────────────────────────────
         Named from the advisor's side. Each of these is something that
         happens after training and surprises people, which is what makes the
         Studio legible as an answer rather than an upsell. */
      {
        type: 'numbered',
        skin: 'light',
        id: 'gap',
        label: 'The gap',
        eyebrow: 'Why training is not enough',
        headline: 'Knowing the category<br>is not the same as having a practice.',
        lead: 'Three things reliably do not follow from a credential, and all three are what actually determine whether the specialty becomes a business.',
        items: [
          {
            head: 'Positioning does not arrive with knowledge',
            body: 'Knowing how to design a recovery journey does not tell a client why you, specifically. Most advisors who complete training describe themselves afterwards in almost exactly the words they used before it.'
          },
          {
            head: 'Demand does not follow competence',
            body: 'Being good at something new is invisible until somebody says so out loud, repeatedly, in a way the right people encounter. That is a distribution problem, and it is not solved by knowing more.'
          },
          {
            head: 'A practice is a set of systems, not an intention',
            body: 'A discovery process that runs the same way every time, a portfolio you can actually sell from, workflows that survive a busy month. Without those, a specialty stays a thing you do occasionally when someone happens to ask.'
          }
        ]
      },

      /* ── 3 · WHAT IT BUILDS ────────────────────────────────────────────
         The brief lists eleven deliverables. Rendered as eleven atoms they
         read as a syllabus; grouped into six they read as a practice. */
      {
        type: 'pathways',
        skin: 'light',
        id: 'builds',
        label: 'What it builds',
        eyebrow: 'What you leave with',
        headline: 'A practice, not a portfolio of notes.',
        lead: 'The Studio is a build rather than a curriculum. What follows is what exists at the end of it that did not exist at the start.',
        pathways: [
          { head: 'A defined niche and offer',
            body: 'Who specifically you serve inside burnout recovery, what you sell them, and what it costs — written down and defensible rather than assembled per enquiry.' },
          { head: 'A discovery process that repeats',
            body: 'The conversation that turns a vague enquiry into a brief, run the same way every time so it improves instead of being reinvented.' },
          { head: 'A client journey end to end',
            body: 'From first contact through design, travel and the ninety days after landing — with your role, and its limits, defined at every stage.' },
          { head: 'A portfolio you can sell from',
            body: 'Journeys, partners and destinations you actually know, presented so a client can choose rather than be persuaded.' },
          { head: 'Messaging and the assets to carry it',
            body: 'Language that holds up under scrutiny, and the handful of pieces that carry it — because most of this work is saying the same true thing consistently.' },
          { head: 'Workflows, systems and activation',
            body: 'The operational spine, including Concierge OS where it fits, and a plan for the first ninety days that is specific enough to follow.' }
        ],
        primary: { label: 'Request a Studio Conversation', href: '/venture-studio/conversation' },
        event: 'venture_studio_application'
      },

      /* ── 4 · WHAT IT IS AND IS NOT ─────────────────────────────────────
         The negative column is the more useful one. Each item is a thing
         somebody will otherwise assume, and every wrong assumption costs an
         interview on both sides. */
      {
        type: 'fit',
        skin: 'light',
        id: 'definition',
        label: 'What it is',
        eyebrow: 'Plainly',
        headline: 'What the Studio is,<br>and what it is not.',
        lead: 'The second column matters more than the first. Each of these is something people reasonably assume, and every wrong assumption wastes a conversation.',
        forWhom: {
          label: 'What it is',
          items: [
            'A build. You leave with a positioned practice, not a set of notes',
            'Selective, by interview, and small enough that the work is specific to you',
            'Advisory — you are doing the building, with someone who has done it beside you',
            'Connected to a real network of journeys, practitioners and destinations',
            'Finite. It has an end, and the end is an activated practice'
          ]
        },
        notFor: {
          label: 'What it is not',
          items: [
            'Not a course. There is no syllabus you could complete without changing anything',
            'Not a certification. Nothing here is a badge, and no one is accredited by us',
            'Not an agency. You do not join us and we do not take over your clients',
            'Not a franchise. You are not buying a model to operate under our name',
            'Not a lead programme. No enquiries are supplied, and none are promised'
          ]
        }
      },

      /* ── 5 · THE MODEL ─────────────────────────────────────────────────── */
      {
        type: 'numbered',
        skin: 'light',
        id: 'model',
        label: 'How it runs',
        eyebrow: 'How it runs',
        headline: 'Interview, build, activate.',
        lead: 'The shape is deliberately unglamorous. Most of the value is in doing the work with someone who will tell you when it is not good enough yet.',
        items: [
          {
            head: 'Admission by conversation',
            body: 'A conversation about your practice, not a sales call. Both sides decide, and a no comes with a reason and a better route rather than a follow-up sequence.'
          },
          {
            head: 'Build phases, in order',
            body: 'Positioning before offer, offer before process, process before assets. Working out of order is the most common way this stalls, so the sequence is not optional.'
          },
          {
            head: 'Advisory support while you build',
            body: 'Regular sessions on your actual work rather than generic material — your discovery calls, your portfolio, your language.'
          },
          {
            head: 'Systems and network',
            body: 'The operational spine, and introductions to the journeys, practitioners and destinations that make a portfolio real rather than aspirational.'
          },
          {
            head: 'Activation, then out',
            body: 'A defined first ninety days, and then it ends. A programme you never graduate from is a subscription, and that is a different thing being sold.'
          }
        ]
      },

      /* ── 6 · ADMISSION PATHWAY ─────────────────────────────────────────
         The first rungs are Saint Lucia WELL's and link out through the same
         route table as everywhere else. "Or demonstrated experience" is a real
         door, not a courtesy — an advisor who has built a wellness practice
         elsewhere does not need to be taught the category from scratch. */
      {
        type: 'numbered',
        skin: 'light',
        id: 'admission',
        label: 'Getting in',
        eyebrow: 'The route in',
        headline: 'How advisors reach the Studio.',
        lead: 'Both inlets end here. Which rungs you have already climbed changes where the conversation starts, not whether you can have it.',
        items: [
          {
            marker: '01',
            head: 'Meet the category',
            body: 'The Saint Lucia WELL introduction, or our own burnout category introduction. An hour, and the cheapest way to find out whether any of this is for you.',
            route: 'dsw.intro',
            linkLabel: 'The Saint Lucia WELL introduction'
          },
          {
            marker: '02',
            head: 'Foundations, or the equivalent',
            body: 'Three live days on the Well Destination framework — or, on the direct ladder, burnout specialist training. An advisor who has built a wellness practice elsewhere may already have this.',
            route: 'dsw.foundations',
            linkLabel: 'Well Destination Foundations'
          },
          {
            marker: '03',
            head: 'Travel one',
            body: 'The Saint Lucia WELL immersion or a burnout retreat. Both are journeys you go on rather than programmes you attend, and neither is replaceable by reading about them.',
            route: 'dsw.immersion',
            linkLabel: 'The Saint Lucia WELL immersion'
          },
          {
            marker: '04',
            head: 'A Studio conversation',
            body: 'Where category understanding, stewardship and commercial intent are actually assessed — by talking, in both directions.',
            href: '/venture-studio/conversation',
            linkLabel: 'Request a conversation',
            event: 'venture_studio_application'
          },
          {
            marker: '05',
            head: 'Build and activate',
            body: 'The Studio itself, and then a practice that runs without it.'
          }
        ]
      },

      /* ── 7 · ON PRICING ────────────────────────────────────────────────
         Saying nothing would be the conventional move and it would read as
         evasion to precisely the person this page is for. */
      {
        type: 'numbered',
        skin: 'light',
        id: 'pricing',
        label: 'On cost',
        eyebrow: 'On cost',
        headline: 'There is no price on this page yet.',
        lead: 'That is deliberate, and here is the reason rather than a silence where the number should be.',
        items: [
          {
            marker: '—',
            head: 'The offer is still being fixed',
            body: 'Admission model, phases and deliverables are settled enough to describe and not yet settled enough to price. Publishing a figure now would mean revising it, and a price that moves is worse than a price that waits.'
          },
          {
            marker: '—',
            head: 'What happens instead',
            body: 'Cost is discussed in the conversation, in full, before anything is agreed. Nobody is asked to commit to a number they have not seen written down, and there is no urgency attached to it.'
          },
          {
            marker: '—',
            head: 'What we will not do',
            body: 'No income projections, no earnings claims, and no return-on-investment arithmetic. Nobody can support those honestly in a category this young, and an advisor serious enough for the Studio would not believe them anyway.'
          }
        ]
      },

      /* ── 8 · FINAL ─────────────────────────────────────────────────────── */
      {
        type: 'finalCta',
        id: 'begin',
        label: 'Begin',
        eyebrow: 'If this is yours',
        headline: 'Start with a conversation.',
        lead: 'Four questions, then a conversation about your practice — and an honest answer either way, with a reason attached to it.',
        primary:   { label: 'Request a Studio Conversation', href: '/venture-studio/conversation' },
        secondary: { label: 'Or start with the Prospectus', href: '/for-advisors/prospectus' },
        note: 'The Concierge Venture Studio is a business-building programme for travel advisors. It is not a certification, and it confers no clinical qualification of any kind.',
        img: {
          base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
          src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
          alt: 'Golden horizon light emerging from shadow over open water'
        }
      }
    ]
  },

  {
    key: 'studio-conversation',
    path: '/venture-studio/conversation',
    surface: 'advisor',
    layout: 'plain',
    title: 'Request a Studio Conversation — Burnout Concierge',
    description:
      'The Studio admits by interview rather than enrolment. Four questions, and then a conversation.',
    sections: [
      {
        type: 'intake',
        id: 'intake',
        label: 'A Studio Conversation',
        intake: 'studio',
        contextNotes: {
          'dsw-immersion':
            'You’ve come from the Saint Lucia WELL immersion, so you have travelled the category already. That puts you further along than most people asking.'
        }
      }
    ]
  }
];
