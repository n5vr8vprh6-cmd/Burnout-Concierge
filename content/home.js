/* ============================================================================
   HOMEPAGE — the category page and routing environment
   ----------------------------------------------------------------------------
   Section order is fixed by the brief and is an argument, not a layout:

     feel it → understand the category → see how it works → see the journeys
     → understand the accompaniment → the advisor pathway → organizations
     → partners → the honest ecosystem → the human → act

   CONSUMER-LED, ADVISOR SECOND
     The primary ICP is the person seeking a burnout retreat, so the hero
     speaks to them. The advisor pathway is the strongest secondary route and
     takes band 6 as full-bleed obsidian — the heaviest single element on the
     page without being the hero. That is how "strong second" reads visually
     rather than only structurally.

   ONE DOOR, REPEATED
     `Find Your Recovery Path` appears three times — hero, offer, final — and
     nothing else on the page may compete with it visually. Copper is spent on
     that button and nowhere else. Every other action is a quiet link.

   LANGUAGE GUARDRAILS
     Nothing here claims burnout is a nervous-system injury, that a journey
     resolves it at the source, that it replaces therapy, or that outcomes are
     reliable. The register is calm certainty: "designed to support", "may
     help", "provides space for". Emotional conviction without medical
     certainty.

   NO VENUE NAMES. Destinations and intentions only, until the property
   relationships are confirmed in writing.
   ========================================================================== */
'use strict';

module.exports = {
  key: 'home',
  path: '/',
  surface: 'consumer',

  /* Cinematic tier. Scroll becomes a timeline here: js/scroll.js is loaded, the
     hero departs on scroll, and two sections pin. Brand Manual §15 banned this
     outright; the ban was lifted for browsing surfaces only. The advisor
     gateway, the intakes, organizations and legal stay on native scroll,
     because taking scroll from somebody mid-task reads as being trapped
     rather than as being carried. */
  tier: 'cinematic',
  title: 'Burnout Concierge — guided burnout recovery travel',
  description:
    'Burnout does not heal where it happened. Burnout Concierge designs and accompanies recovery journeys for people who have run out of room to recover where they are.',
  ogTitle: 'Burnout Concierge',

  sections: [

    /* ── 1 · HERO ────────────────────────────────────────────────────────
       The line is the strongest asset the brand already owns. It is
       evocative, it makes no medical claim, and it justifies travel in six
       words — which is the whole proposition. */
    {
      type: 'hero',
      label: 'Arrival',
      eyebrow: 'Burnout recovery travel',
      headline: "Burnout doesn't heal<br>where it happened.",
      lead: 'We design and guide recovery journeys for people who have run out of room to recover where they are, and we plan the whole of it, so you don’t have to.',
      primary:   { label: 'Find Your Recovery Path', href: '/work-with-a-concierge' },
      secondary: { label: 'Explore the Retreat Collection', href: '#collection' },
      tertiary:  { label: 'I’m a travel advisor →', href: '/for-advisors' },
      img: {
        base: '/assets/images/hero-courtyard', widths: [960, 1440, 1920],
        src: '/assets/images/hero-courtyard-1440.webp', w: 1920, h: 1080,
        alt: 'A lantern-lit courtyard at night, quiet and unoccupied'
      }
    },

    /* ── 2 · THE CATEGORY DISTINCTION ────────────────────────────────────
       Earns the specialty claim before asking for anything. The distinction
       is not price or luxury — it is where the design starts, which is the
       one difference a reader can actually verify against their own
       experience of booking a holiday that did not help. */
    {
      type: 'columns',
      skin: 'light',
      pin: true,
      id: 'difference',
      label: 'The difference',
      headline: 'Rest, wellness travel and guided recovery<br>are not the same thing.',
      lead: 'Most people book one when they needed another. The distinction is not luxury or price. It is where the design starts.',
      columns: [
        {
          label: 'Rest',
          head: 'It stops the drain',
          body: 'Time away, and for many people that is genuinely enough. It rarely changes what you return to.'
        },
        {
          label: 'Wellness travel',
          head: 'It begins with a property',
          body: 'Designed around treatments, facilities and setting. Excellent, and broad, but the starting point is what a property happens to offer.'
        },
        {
          label: 'Guided recovery',
          head: 'It begins with you',
          body: 'Designed around your circumstances, the environment that suits you, and the return home. It starts with a conversation, not a catalogue.'
        }
      ]
    },

    /* ── 3 · THE CONCIERGE OFFER ─────────────────────────────────────────
       The primary conversion, placed high. Three rungs by ascending
       commitment — and critically, none of them is a quiz. The archetype
       makes complexity disappear; an assessment would hand the work back to
       someone who is already depleted. We prepare something instead. */
    {
      type: 'rungs',
      skin: 'light',
      id: 'offer',
      label: 'How this works',
      headline: 'You do not need to work this out on your own.',
      lead: 'Most people arrive unsure whether they need a week away, a month, or something else entirely. That is the normal place to begin, and each of these leads to a person, not a form.',
      rungs: [
        {
          step: '01 — Request',
          head: 'The Recovery Collection',
          body: 'The five journeys in full: the intention behind each, how it runs, and who it tends to suit.',
          cta: 'Request the Collection',
          href: '/work-with-a-concierge?intent=collection'
        },
        {
          step: '02 — Prepared for you',
          head: 'A Personal Recommendation',
          body: 'Tell us a little about your circumstances and timing. We prepare a recommendation and send it to you.',
          cta: 'Request a Recommendation',
          href: '/work-with-a-concierge?intent=recommendation'
        },
        {
          step: '03 — Conversation',
          head: 'A Private Conversation',
          body: 'A calm conversation with a concierge. No pressure, no commitment, and no need to have decided anything.',
          cta: 'Begin a Conversation',
          href: '/work-with-a-concierge?intent=conversation'
        }
      ],
      primary:   { label: 'Find Your Recovery Path', href: '/work-with-a-concierge' },
      secondary: { label: 'Or request the Collection first', href: '/work-with-a-concierge?intent=collection' }
    },

    /* ── 4 · THE COLLECTION ──────────────────────────────────────────────
       Five journeys as full-bleed alternating panels. Status is stated
       plainly on every one: a collection that implies continuous
       availability it does not have costs more trust than an honest
       "In development" ever will.

       Eclipse is a Saint Lucia WELL journey, marked as such. It belongs in a
       burnout collection because it IS a burnout retreat — but the panel says
       whose it is and what our role in it actually is. */
    {
      type: 'collection',
      skin: 'light',
      id: 'collection',
      label: 'The collection',
      headline: 'Five recovery journeys.',
      lead: 'Filtered by intention rather than by tier. Each states plainly where it currently stands.',
      journeys: [
        {
          name: 'Awaken', destination: 'Los Cabos, Mexico',
          intention: 'Quiet luxury and somatic renewal, for when the volume has to come down before anything else can happen.',
          format: 'Seven nights, small group', suits: 'A first recovery journey',
          status: 'Now accepting inquiries', href: '/work-with-a-concierge?intent=recommendation',
          img: { base: '/assets/images/journey-awaken', widths: [760, 1100],
                 src: '/assets/images/journey-awaken-1100.webp', w: 1100, h: 1400,
                 alt: 'Sunrise over calm water on the Baja east cape' }
        },
        {
          name: 'Nagi', destination: 'Kyoto, Japan',
          intention: 'Stillness and Japanese philosophy. The slowest journey in the collection, and deliberately so.',
          format: 'Ten nights, six guests', suits: 'Returning travellers',
          status: 'Private dates available', href: '/work-with-a-concierge?intent=recommendation',
          img: { base: '/assets/images/journey-nagi', widths: [760, 1100],
                 src: '/assets/images/journey-nagi-1100.webp', w: 1100, h: 1400,
                 alt: 'A Kyoto ryokan interior in natural wood, with a private bath' }
        },
        {
          name: 'Transcend', destination: 'Puerto Vallarta, Mexico',
          intention: 'Emotional release and reconnection, held by practitioners who have done this a long time.',
          format: 'Seven nights, small group', suits: 'Those ready for depth',
          status: 'Upcoming cohort', href: '/work-with-a-concierge?intent=recommendation',
          img: { base: '/assets/images/journey-transcend', widths: [760, 1100],
                 src: '/assets/images/journey-transcend-1100.webp', w: 1100, h: 1400,
                 alt: 'Sunrise over the Pacific at Puerto Vallarta' }
        },
        {
          name: 'Revo', destination: 'Toronto, Canada',
          intention: 'An urban nervous-system reset for people who cannot leave for a fortnight.',
          format: 'Three evenings, in the city', suits: 'No room to travel far',
          status: 'In development', href: '/work-with-a-concierge?intent=recommendation',
          img: { base: '/assets/images/journey-revo', widths: [760, 1100],
                 src: '/assets/images/journey-revo-1100.webp', w: 1100, h: 1400,
                 alt: 'An intimate modern gathering space arranged for a small group' }
        },
        {
          name: 'Eclipse', destination: 'Saint Lucia',
          intention: 'When rest alone is no longer enough — six phases, from arrival through to the return home.',
          format: 'Six phases, practitioner-led', suits: 'The overextended achiever',
          status: 'Advisor-led access',
          partner: 'A Saint Lucia WELL journey. Burnout Concierge holds the ninety-day integration.',
          route: 'dsw.eclipse', cta: 'See Eclipse',
          img: { base: '/assets/images/journey-eclipse', widths: [760, 1100],
                 src: '/assets/images/journey-eclipse-1100.webp', w: 1100, h: 1400,
                 alt: 'Calm ocean meeting a jungle coastline from above' }
        }
      ]
    },

    /* ── 5 · THE CONCIERGE JOURNEY ───────────────────────────────────────
       The brand manual's own four stages. Integrate is the one that matters
       commercially and the one most travel omits, so it is written as the
       part that decides whether any of the rest holds. */
    {
      type: 'stages',
      skin: 'dark',
      pin: true,
      id: 'journey',
      label: 'The journey',
      headline: 'Four stages, and a person at each one.',
      stages: [
        { step: '01', head: 'Connect',
          body: 'A calm conversation to understand your circumstances, your timing and what you are working around.' },
        { step: '02', head: 'Curate',
          body: 'A recommendation prepared for you — the journey, the timing and the shape of it. Never guesswork.' },
        { step: '03', head: 'Experience',
          body: 'The journey itself, with your concierge quietly available throughout rather than handing you over.' },
        { step: '04', head: 'Integrate',
          body: 'Return planning and reflection. The part most travel forgets, and the part that decides whether any of it holds.' }
      ],
      primary: { label: 'Work With a Concierge', href: '/work-with-a-concierge' }
    },

    /* ── 6 · THE ADVISOR PATHWAY ─────────────────────────────────────────
       Two inlets, one destination. Inlet A is live on Saint Lucia WELL and we
       link to it rather than duplicating a funnel already in market. Inlet B
       is ours. Both converge on the Venture Studio, which exists nowhere else
       in the ecosystem — which is precisely why it is the deepest rung. */
    {
      type: 'ladder',
      id: 'advisors',
      label: 'For advisors',
      eyebrow: 'For travel advisors',
      headline: 'Build the confidence to guide recovery journeys — not simply book wellness travel.',
      body: 'Burnout is the most differentiated specialty inside wellness travel, and the least well served. There are two ways in, depending on where you are starting from.',
      primary:   { label: 'Explore the Advisor Pathway', href: '/for-advisors' },
      secondary: { label: 'Request the Advisor Prospectus', href: '/for-advisors/prospectus' },
      img: { base: '/assets/images/advisor-conversation', widths: [760, 1100],
             src: '/assets/images/advisor-conversation-1100.webp', w: 1100, h: 733,
             alt: 'Two people in unhurried conversation across a low table' },
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
          who: 'The wellness-credentialed advisor adding burnout and chronic stress.',
          steps: [
            { label: 'Burnout as a category',      owner: 'Burnout Concierge' },
            { label: 'Burnout specialist training', owner: 'Burnout Concierge' },
            { label: 'A burnout retreat',           owner: 'Burnout Concierge' }
          ]
        }
      ],
      studio: {
        label: 'Both inlets converge',
        head: 'Concierge<br>Venture Studio',
        body: 'Selective admission. The deepest commitment in the ecosystem, and ours alone.',
        href: '/venture-studio',
        cta: 'See the Studio'
      }
    },

    /* ── 7 · ORGANIZATIONS ───────────────────────────────────────────────
       Recovery infrastructure rather than resilience training. The
       differentiation is sabbaticals, executive recovery, travel and return —
       not another workshop. */
    {
      type: 'pathways',
      skin: 'light',
      id: 'organizations',
      label: 'Organizations',
      headline: 'When rest is not enough,<br>recovery needs structure.',
      lead: 'Four pathways for employers, founders and executive sponsors who have discovered that time off, on its own, does not bring people back.',
      pathways: [
        { head: 'Recovery sabbatical programmes',
          body: 'Structured leave that is designed to return someone, rather than simply to pause them.' },
        { head: 'Executive recovery',
          body: 'Discreet, individually designed journeys for leaders carrying significant responsibility.' },
        { head: 'Leadership reintegration',
          body: 'The return itself — planned, supported, and treated as part of the work rather than the end of it.' },
        { head: 'Advisor-supported recovery travel',
          body: 'Coordination through your existing travel programme, with the specialty layered on top.' }
      ],
      primary: { label: 'Discuss an Organizational Pathway', href: '/organizations' },
      event: 'organization_inquiry'
    },

    /* ── 8 · PARTNERS ────────────────────────────────────────────────────
       Hospitality leaders are a distinct audience the original brief folded
       into a general partner bucket. They get their own language here. */
    {
      type: 'pathways',
      skin: 'light',
      id: 'partners',
      label: 'Partners',
      headline: 'Recovery-ready is a design brief,<br>not an amenity list.',
      lead: 'For hospitality leaders, destinations and practitioners building environments that hold people rather than simply host them.',
      pathways: [
        { head: 'Properties and resorts',
          body: 'What a recovery-ready environment provides, and what it deliberately leaves out.' },
        { head: 'Destinations and tourism boards',
          body: 'Positioning a destination around wellbeing, with burnout as the sharpest entry point.' },
        { head: 'Practitioners and guides',
          body: 'Working inside a designed journey, with a defined scope and clear clinical boundaries.' },
        { head: 'Advisor networks and consortia',
          body: 'Bringing the specialty to a membership that is already selling wellness travel.' }
      ],
      primary: { label: 'Propose a Collaboration', href: '/partners' },
      event: 'partnership_inquiry'
    },

    /* ── 9 · THE ECOSYSTEM ───────────────────────────────────────────────
       Burnout Concierge is a peer here, not an umbrella. Saying so plainly is
       more credible than implying a hub that does not exist — and REV appears
       unlinked because its domain is not registered. An ecosystem map that
       links to nothing is worse than one that admits what is still being
       built. */
    {
      type: 'ecosystem',
      skin: 'dark',
      id: 'ecosystem',
      label: 'The ecosystem',
      headline: 'A specialist inside wellness travel.',
      lead: 'Burnout is the most differentiated part of the wellness travel category. Burnout Concierge is the specialist within it, working alongside the destinations and programmes below rather than above them.',
      nodes: [
        { role: 'Guide', name: 'Burnout Concierge', self: true,
          body: 'Recovery journeys, the concierge relationship, and the advisor specialty. This site.' },
        { role: 'Discover', name: 'Saint Lucia WELL', route: 'dsw.home',
          body: 'A Well Destination: six wellness villages, island-wide experiences, and the Eclipse journey.' },
        { role: 'Return', name: 'REV', route: 'rev.home',
          body: 'Urban integration experiences, for the part of recovery that happens after you are home.' }
      ]
    },

    /* ── 10 · THE FOUNDER ────────────────────────────────────────────────
       No AI-generated portrait here. The photography library is generated
       imagery and works as atmosphere, but a synthetic face beside a named
       person is exactly the kind of quiet dishonesty that costs more trust
       than it buys. Text only until there is a real photograph. */
    {
      type: 'founder',
      skin: 'light',
      id: 'founder',
      label: 'The founder',
      headline: 'Recovery should not be another journey you have to navigate alone.',
      body: [
        'Burnout Concierge grew out of a decade of work on burnout — first inside organizations, then in the recovery travel that kept proving more effective than anything that happened at a desk.',
        'What became obvious was that the travel industry could book a beautiful week almost anywhere, and had almost no way to tell whether that week was the right one. The environment, the pacing, the practitioners and the return home all matter, and none of them are on a rate sheet.',
        'So this is a specialty rather than an agency: the small, unglamorous work of understanding a person’s circumstances first, and designing backwards from what they will come home to.'
      ],
      primary: { label: 'Meet Duncan So', href: '/about' }
    },

    /* ── 11 · FINAL ──────────────────────────────────────────────────────
       The brand manual's own on-brand exemplar, almost verbatim. It is the
       register the whole site is trying to hold. */
    {
      type: 'finalCta',
      id: 'begin',
      label: 'Begin',
      headline: 'A calm conversation<br>is the first step.',
      lead: 'No pressure. No commitment. And no need to have worked out what you need before you speak to us.',
      primary:   { label: 'Find Your Recovery Path', href: '/work-with-a-concierge' },
      secondary: { label: 'Request the Collection', href: '/work-with-a-concierge?intent=collection' },
      note: 'Burnout Concierge provides guided recovery travel. It is designed to complement, rather than replace, medical or mental-health support. Outcomes vary by individual.',
      img: {
        base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
        src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
        alt: 'Golden horizon light emerging from shadow over open water'
      }
    }
  ]
};
