/* ============================================================================
   THE ADVISOR GATEWAY — the commercial priority
   ----------------------------------------------------------------------------
   The 2026–2027 objective is moving travel advisors through a pathway, and
   this is the page that does it. It is also the page the original rebuild
   document got structurally wrong, because it assumed one ladder.

   TWO INLETS, ONE DESTINATION
     A · the general advisor adding wellness. Their rungs are ALREADY LIVE on
         Saint Lucia WELL — introduction, foundations, immersion — so we link
         to a funnel already in market rather than rebuilding it.
     B · the wellness-credentialled advisor adding burnout and chronic stress
         as a specialty. That ladder is ours.

     Both converge on the Concierge Venture Studio, which exists nowhere else
     in the ecosystem. That convergence is the argument: whichever door you
     came through, the deep end is the same and it is only here.

   THE FUNCTIONAL TIER
     Part 3 §B: cinema is spent where it persuades and withheld where people
     work. An advisor arrived to find something out — what it costs them, who
     owns the client, where the clinical line sits. So this page gets reveals
     and generous air, and none of the homepage's 100svh hero, drifting
     imagery or ground choreography. Same type scale, same palette, a quarter
     of the theatre.

   SELF-SELECTION IS THE WHOLE JOB OF BAND 2
     Naming who this is NOT for is what lets the right advisor recognise
     themselves. A general advisor should read it and route to Saint Lucia; a
     WTA-credentialled one should read it and know they are already qualified
     for the direct ladder. Saying "for everyone" would serve neither.

   NO INCOME PROMISES. §16 forbids them and the category cannot support them.
   The commercial section describes what the specialty changes about a
   practice, and says plainly that we do not publish earnings figures.
   ========================================================================== */
'use strict';

module.exports = {
  key: 'advisors',
  path: '/for-advisors',
  surface: 'advisor',
  layout: 'plain',
  title: 'For travel advisors — Burnout Concierge',
  description:
    'Build the confidence to guide recovery journeys, not simply book wellness travel. Two pathways into the burnout specialty, and the Concierge Venture Studio they converge on.',

  sections: [

    /* ── 1 · HEADER ──────────────────────────────────────────────────────── */
    {
      type: 'pageHeader',
      label: 'For advisors',
      eyebrow: 'For travel advisors',
      headline: 'Build the confidence to guide<br>recovery journeys.',
      lead: 'Not simply book wellness travel. Burnout is the most differentiated specialty inside the category, and the least well served.',
      primary:   { label: 'Request the Advisor Prospectus', href: '/for-advisors/prospectus' },
      primaryEvent: 'document_request',
      secondary: { label: 'See the two pathways', href: '#pathways' }
    },

    /* ── 2 · WHO THIS IS FOR ─────────────────────────────────────────────
       The self-selection band. An arrival from the Saint Lucia immersion is
       acknowledged rather than re-taught — they have already walked Inlet A,
       and Eclipse is itself a burnout retreat. */
    {
      type: 'fit',
      skin: 'light',
      id: 'who',
      label: 'Who this is for',
      eyebrow: 'Who this is for',
      headline: 'A specialty, not a starting point.',
      lead: 'This works best on top of something. If wellness travel is new to you, the Saint Lucia WELL pathway builds the base first — and that is genuinely the better route, not a consolation.',
      contextNotes: {
        'dsw-immersion':
          'You’ve come from the Saint Lucia WELL immersion, so you have already walked the first pathway — and Eclipse is itself a burnout retreat. Skip to the direct ladder below.'
      },
      forWhom: {
        label: 'This fits you if',
        items: [
          'Wellness travel is already your specialty, or where you are deliberately heading',
          'You hold a credential — Wellness Travel Association, Wellness Travel University, a coaching or wellbeing qualification',
          'Clients already bring you the conversation that starts <em>I just need to get away</em>',
          'You have completed the Saint Lucia WELL immersion, or an equivalent destination programme',
          'You would rather go deep on one category than broad across several'
        ]
      },
      notFor: {
        label: 'This is not for you if',
        items: [
          'You are looking for a lead-generation programme — no leads are supplied',
          'You want a certification to display rather than a practice to build',
          'You are hoping for a passive referral fee arrangement',
          'You are new to travel advising altogether — the base has to come first',
          'You would want to describe what you do in clinical terms. We do not, and neither can you'
        ]
      }
    },

    /* ── 3 · THE PROBLEM ─────────────────────────────────────────────────
       Named from the advisor's side of the desk rather than ours. Each of
       these is a thing an advisor has actually experienced, which is what
       makes the specialty legible as a solution rather than an upsell. */
    {
      type: 'numbered',
      skin: 'light',
      id: 'problem',
      label: 'The problem',
      eyebrow: 'Why this is hard',
      headline: 'Wellness is broad. Burnout is specific.',
      lead: 'Three things make this category difficult to sell well, and none of them are solved by knowing more destinations.',
      items: [
        {
          head: 'Clients cannot articulate what they need',
          body: 'Somebody asking for “a week somewhere quiet” may need a fortnight, or may need not to travel at all yet. The brief you are given is rarely the brief that is true, and the gap is not something a client can close on their own.'
        },
        {
          head: 'Destination knowledge has been commoditised',
          body: 'Everything a property offers is on its own website, and increasingly summarised by a machine before anybody reaches you. What cannot be commoditised is knowing which environment suits which person, and why.'
        },
        {
          head: 'The return home is where it comes apart',
          body: 'A journey that works and a return that does not is a journey that did not work. Almost nothing in travel is designed for the fortnight after somebody lands, which is exactly where recovery is won or lost.'
        }
      ]
    },

    /* ── 4 · WHAT YOU LEARN ──────────────────────────────────────────────── */
    {
      type: 'pathways',
      skin: 'light',
      id: 'learn',
      label: 'What you learn',
      eyebrow: 'What the specialty gives you',
      headline: 'Discovery, design, and the return.',
      lead: 'The skills are unglamorous and they are what the category is short of.',
      pathways: [
        { head: 'A deeper discovery conversation',
          body: 'How to hear what somebody is actually describing, and how to ask about circumstance without straying into territory that is not yours.' },
        { head: 'Matching person to environment',
          body: 'Why pace, light, altitude, food, group size and distance from home matter more than amenity lists, and how to reason about them.' },
        { head: 'Designing the whole arc',
          body: 'Arrival, regulation, the work itself, and the return — as one designed sequence rather than a booking with activities attached.' },
        { head: 'Coordinating practitioners',
          body: 'Working alongside facilitators and health professionals with a defined scope, and knowing precisely where yours ends.' },
        { head: 'Return-home integration',
          body: 'The ninety days after landing: what to plan for, what to hand over, and what to leave well alone.' },
        { head: 'Language that holds up',
          body: 'How to speak about burnout with conviction and without a single claim you could not defend.' }
      ],
      primary: { label: 'Request the Advisor Prospectus', href: '/for-advisors/prospectus' },
      event: 'document_request'
    },

    /* ── 5 · THE TWO PATHWAYS ────────────────────────────────────────────
       The structural heart. Rendered without the ladder's intro block,
       because this page has already introduced itself. */
    {
      type: 'ladder',
      id: 'pathways',
      label: 'The two pathways',
      eyebrow: 'Two ways in, one destination',
      lead: 'Which one you take depends on where you are starting from. Both end in the same place.',
      tracks: [
        {
          label: 'Inlet A — via the ecosystem',
          who: 'The general advisor adding wellness. Already live; we link, we don’t rebuild.',
          steps: [
            { label: 'Introduction', route: 'dsw.intro' },
            { label: 'Foundations',  route: 'dsw.foundations' },
            { label: 'Immersion',    route: 'dsw.immersion' }
          ]
        },
        {
          label: 'Inlet B — direct',
          who: 'The wellness-credentialled advisor adding burnout and chronic stress.',
          steps: [
            { label: 'Burnout as a category',       owner: 'Burnout Concierge' },
            { label: 'Burnout specialist training', owner: 'Burnout Concierge' },
            { label: 'A burnout retreat',           owner: 'Burnout Concierge' }
          ]
        }
      ],
      studio: {
        label: 'Both inlets converge',
        head: 'Concierge<br>Venture Studio',
        body: 'Selective admission. The deepest commitment in the ecosystem, and ours alone.'
      }
    },

    /* ── 6 · COMMERCIAL VALUE, WITHOUT PROMISES ──────────────────────────
       §16 forbids income claims and the category cannot support them. What
       can be said honestly is what the specialty changes about a practice —
       and then, plainly, that we do not publish figures. Saying so is more
       persuasive to a serious advisor than a number would be. */
    {
      type: 'numbered',
      skin: 'light',
      id: 'commercial',
      label: 'The commercial case',
      eyebrow: 'What it changes',
      headline: 'What a specialty does to a practice.',
      lead: 'We do not publish income figures, projections or averages. Nobody can support them honestly in a category this young, and an advisor serious enough for this work would not believe them anyway.',
      items: [
        {
          head: 'Fewer conversations, further along',
          body: 'A specialist is approached by people who have already decided what kind of help they want. The qualifying happens before the call rather than during it.'
        },
        {
          head: 'Journeys rather than bookings',
          body: 'A recovery journey has more moving parts than a holiday — practitioners, pacing, sequencing, the return. More of the value sits in the design, and design is billable in a way that booking increasingly is not.'
        },
        {
          head: 'A reason to be chosen',
          body: 'Clients do not compare specialists the way they compare generalists. Being the person who handles this particular thing is a different competitive position from being another good advisor.'
        },
        {
          head: 'Relationships that continue',
          body: 'Integration runs for ninety days after somebody lands, which means the relationship does not end at the airport. That is unusual in travel and it compounds.'
        }
      ]
    },

    /* ── 7 · FAQ ─────────────────────────────────────────────────────────
       The questions an advisor actually asks before committing, including
       the two most people avoid answering in public: who owns the client, and
       where the clinical boundary sits. */
    {
      type: 'faq',
      skin: 'light',
      id: 'questions',
      label: 'Questions',
      eyebrow: 'Before you ask',
      headline: 'The questions advisors actually ask.',
      items: [
        {
          q: 'Who owns the client?',
          a: ['You do. An advisor-referred client remains yours throughout — we work through you rather than around you, and the concierge relationship sits alongside yours rather than replacing it.',
              'Referral attribution travels with the link you send, across both this site and Saint Lucia WELL, and the first referral recorded is the one that holds. A later untagged visit cannot reassign a client you introduced.']
        },
        {
          q: 'How does commission work?',
          a: ['It depends on the journey and on whether it is ours or a partner’s, so it is set per journey rather than as a blanket rate — and it is agreed in writing before anything is sold, never after.',
              'We publish the structure in the Advisor Prospectus rather than on a public page, because the honest answer has conditions and a number without them would be misleading.']
        },
        {
          q: 'Do I need to leave my host agency or consortium?',
          a: ['No. This is a specialty layered onto the practice you already have, not an agency you join. Advisors here sit with several different host agencies and consortia.',
              'If your agreement restricts what you can sell or how you can be paid, that is worth checking before the training rather than after it.']
        },
        {
          q: 'Am I expected to give clinical advice?',
          a: ['No, and you must not. The boundary is firm: advisors design and coordinate travel. Practitioners and licensed professionals do clinical work, and the two are never blurred.',
              'A meaningful part of the training is about that line — how to recognise when somebody in front of you needs something other than a journey, and how to say so well.']
        },
        {
          q: 'What if my client is not ready to travel?',
          a: ['Then the right answer is that they should not, and saying so is part of the job. Some people need a different kind of support first, and some need to not be making decisions at all for a while.',
              'An advisor who can tell a client that is worth considerably more to them than one who books whatever is asked for.']
        },
        {
          q: 'How much time does this take?',
          a: ['The category introduction is an hour. The training beyond it is measured in days rather than months, and the retreat experience is a journey you actually travel on.',
              'The Venture Studio is the serious commitment, and it is deliberately not open to everybody who asks — see below.']
        },
        {
          q: 'Do I have to start at the beginning?',
          a: ['Not if you have already done the equivalent elsewhere. An advisor who has completed the Saint Lucia WELL immersion has met the category — Eclipse is itself a burnout retreat — and starts further along.',
              'Tell us where you are when you request the Prospectus and the pathway we send back reflects it.']
        }
      ]
    },

    /* ── 8 · FINAL ───────────────────────────────────────────────────────── */
    {
      type: 'finalCta',
      id: 'begin',
      label: 'Begin',
      eyebrow: 'The next step',
      headline: 'Start with the Prospectus.',
      lead: 'Three questions, so the pathway we send back is the one that actually fits your practice. Then a conversation, if it looks like a fit from both sides.',
      primary:   { label: 'Request the Advisor Prospectus', href: '/for-advisors/prospectus' },
      secondary: { label: 'See the Saint Lucia WELL introduction', href: 'https://www.discoversaintluciawell.com/advisors/intro' },
      note: 'Burnout Concierge provides guided recovery travel. Advisors design and coordinate travel; they do not provide clinical care. Outcomes vary by individual.',
      img: {
        base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
        src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
        alt: 'Golden horizon light emerging from shadow over open water'
      }
    }
  ]
};
