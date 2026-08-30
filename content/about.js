/* ============================================================================
   ABOUT — purpose, the founder, and the limits of what this is
   ----------------------------------------------------------------------------
   Editorial tier.

   THE TRUST WARNING GOVERNS THIS PAGE
     The brief is blunt: specific but anonymous testimonials, implied
     partnerships, and highly developed pages without confirmed availability
     reduce trust more than restrained proof. So this page carries no
     testimonials at all, names no partner that has not confirmed, and shows
     no photograph of the founder — the image library is AI-generated and a
     synthetic face beside a named person is precisely the quiet dishonesty
     that costs more than it buys.

     When there is a real photograph and a client who has consented in
     writing, both belong here. Until then their absence is the honest state,
     and it reads better than a stock face would.

   THE EVOLUTION IS STATED, NOT HIDDEN
     Burnout Recovery Accelerator is becoming part of Burnout Concierge, and a
     visitor who knew the old brand should find that acknowledged rather than
     quietly erased. It also explains the shape of the thing: education first,
     then travel, then a specialty inside wellness travel.

   SCOPE AND EMERGENCY LIMITS ARE ON THIS PAGE, NOT ONLY IN THE POLICY
     Somebody trying to work out whether this is for them is reading About,
     not Terms. The limits belong where the decision is being made.
   ========================================================================== */
'use strict';

module.exports = {
  key: 'about',
  path: '/about',
  surface: 'consumer',
  layout: 'plain',
  title: 'About — Burnout Concierge',
  description:
    'Why Burnout Concierge exists, who is behind it, where it sits in the wider wellness travel ecosystem, and what it is deliberately not.',

  sections: [

    {
      type: 'pageHeader',
      label: 'About',
      eyebrow: 'Why this exists',
      headline: 'Recovery should not be another journey<br>you navigate alone.',
      lead: 'Burnout Concierge designs and accompanies recovery journeys, and is deliberately a specialist rather than an agency.',
      primary:   { label: 'Begin a Private Conversation', href: '/work-with-a-concierge/conversation' },
      primaryEvent: 'concierge_intake_start',
      secondary: { label: 'See the journeys', href: '/#collection' }
    },

    /* ── Why it exists, and what it grew out of ─────────────────────────── */
    {
      type: 'founder',
      skin: 'light',
      id: 'story',
      label: 'The founder',
      headline: 'From education, to travel, to a specialty.',
      body: [
        'Burnout Concierge grew out of a decade of work on burnout — first inside organizations as education and advisory, then in the recovery travel that kept proving more effective than anything that happened at a desk.',
        'What became obvious was that the travel industry could book a beautiful week almost anywhere, and had almost no way of telling whether that week was the right one. The environment, the pacing, the practitioners and the return home all matter enormously, and none of them appear on a rate sheet.',
        'The earlier work ran as <em>Burnout Recovery Accelerator</em>. That brand is being folded into this one rather than run alongside it — a narrower, sharper thing rather than a broader one. Burnout is the most differentiated part of wellness travel, and doing that properly is more useful than doing everything adequately.',
        'So this is a specialty rather than an agency: the small, unglamorous work of understanding somebody’s circumstances first, and designing backwards from what they will come home to.'
      ],
      /* Part 3 §J: the nav already calls this door by its name. */
      primary: { label: 'Find Your Recovery Path', href: '/work-with-a-concierge' }
    },

    /* ── Values, from the Brand Manual ──────────────────────────────────── */
    {
      type: 'pathways',
      skin: 'light',
      id: 'values',
      label: 'How we work',
      headline: 'Six things we try to be.',
      lead: 'These are operating values rather than marketing ones — each is a decision we make repeatedly, and each has a version of itself we are trying to avoid.',
      pathways: [
        { head: 'Presence',
          body: 'Being genuinely available during a journey rather than reachable in theory. The opposite is a handover and a booking reference.' },
        { head: 'Guidance',
          body: 'Walking beside rather than directing. Somebody depleted does not need another person with a plan for them.' },
        { head: 'Flow',
          body: 'Movement over force. Where something is difficult, the usual answer is that the pacing is wrong rather than that more effort is required.' },
        { head: 'Transformation',
          body: 'Designing for what changes rather than what happens. A wonderful week that changes nothing is a wonderful week.' },
        { head: 'Stewardship',
          body: 'Of the person, of the destinations, and of the practitioners. Nobody here is a supplier to be squeezed.' },
        { head: 'Integration',
          body: 'The return matters more than the departure, and it is the part almost everything in travel forgets.' }
      ]
    },

    /* ── Where this sits ────────────────────────────────────────────────── */
    {
      type: 'ecosystem',
      skin: 'dark',
      id: 'ecosystem',
      label: 'The ecosystem',
      headline: 'A specialist inside wellness travel.',
      lead: 'Burnout Concierge works alongside the destinations and programmes below rather than above them. Saying that plainly is more useful than implying a hub that does not exist.',
      nodes: [
        { role: 'Guide', name: 'Burnout Concierge', self: true,
          body: 'Recovery journeys, the concierge relationship, and the advisor specialty. This site.' },
        { role: 'Discover', name: 'Saint Lucia WELL', route: 'dsw.home',
          body: 'A Well Destination: six wellness villages, island-wide experiences, and the Eclipse journey.' },
        { role: 'Return', name: 'REV', route: 'rev.home',
          body: 'Urban integration experiences, for the part of recovery that happens once you are home.' }
      ]
    },

    /* ── Scope and limits ───────────────────────────────────────────────
       On the page where the decision is being made, not buried in Terms. */
    {
      type: 'fit',
      skin: 'light',
      id: 'scope',
      label: 'Scope',
      headline: 'What we are,<br>and what we are not.',
      lead: 'The second column matters. If what you need is in it, we would rather you knew now.',
      forWhom: {
        label: 'What we are',
        items: [
          'A travel specialty. We design and coordinate recovery journeys',
          'A concierge relationship that continues through the journey and the return',
          'A partner to travel advisors, working through them rather than around them',
          'Nervous-system-informed in how journeys are paced and designed',
          'Willing to tell you that travel is not the right next thing'
        ]
      },
      notFor: {
        label: 'What we are not',
        items: [
          'Not clinicians. We do not diagnose, treat, or provide therapy or counselling',
          'Not a crisis service, and not able to respond to emergencies',
          'Not a substitute for medical or mental-health care of any kind',
          'Not able to promise outcomes — journeys are designed to support recovery, and results vary',
          'Not a booking engine. If you know exactly what you want, a good agent is cheaper'
        ]
      }
    },

    /* ── Proof, and the absence of it ───────────────────────────────────
       An explicit account of why there are no testimonials or partner logos
       yet. The brief's trust warning says restrained proof beats decorated
       proof; saying why it is restrained is stronger still. */
    {
      type: 'numbered',
      /* Four parallel statements about what is deliberately absent. No order —
         and the em-dash markers these carried were the same admission made on
         the Studio's pricing section. */
      ordered: false,
      skin: 'light',
      id: 'proof',
      label: 'On proof',
      eyebrow: 'On proof',
      headline: 'What is not on this page.',
      lead: 'A page like this usually carries testimonials and partner logos. This one does not yet, and the reasons are worth stating.',
      items: [
        {
          head: 'No testimonials',
          body: 'Recovery journeys are private, and a quote attributed to “a Chief People Officer” proves nothing while implying a great deal. When somebody consents in writing to being named, their words will appear with their name on them.'
        },
        {
          head: 'No partner logos',
          body: 'Only relationships confirmed in writing get named, and the properties named across this site are all agreed. What you will not find is their logos: a logo wall reads as endorsement, and being welcome to bring guests somewhere is a different thing from a brand standing behind you. Revo has no property named against it because it does not have one yet.'
        },
        {
          head: 'No photographs of people',
          body: 'The imagery on this site is generated rather than photographed, which is fine as atmosphere and not fine beside a named person. There is no portrait here until there is a real one.'
        },
        {
          head: 'Status stated on every journey',
          body: 'Each journey says plainly whether it is accepting enquiries, running private dates, forming a cohort, or still in development. Implying continuous availability would cost more trust than admitting a gap.'
        }
      ]
    },

    {
      type: 'finalCta',
      id: 'begin',
      label: 'Begin',
      headline: 'A calm conversation<br>is the first step.',
      lead: 'No pressure, no commitment, and no need to have worked out what you need beforehand.',
      primary:   { label: 'Begin a Private Conversation', href: '/work-with-a-concierge/conversation' },
      secondary: { label: 'Or request the Collection', href: '/work-with-a-concierge/collection' },
      note: 'Burnout Concierge provides guided recovery travel. It is designed to complement, rather than replace, medical or mental-health support. It is not a crisis service. Outcomes vary by individual.',
      img: {
        base: '/assets/images/final-horizon', widths: [960, 1440, 1920],
        src: '/assets/images/final-horizon-1440.webp', w: 1920, h: 1080,
        alt: 'Golden horizon light emerging from shadow over open water'
      }
    }
  ]
};
