/* ============================================================================
   INTAKES — the question specs
   ----------------------------------------------------------------------------
   Seven intakes, one engine (js/intake.js). Each is a list of steps; the
   engine knows nothing about any particular one.

   THE GOVERNING PRINCIPLE
     The archetype "makes complexity disappear". So nothing here scores anybody,
     ranks anybody, or returns a result. There is no quiz, no profile, no
     readiness rating. The visitor gives a little context and a person prepares
     something for them. The final screen confirms that something is being
     prepared — it is not an answer.

   THE HARD CONSTRAINT — §14 and §16
     A "personal recommendation" naturally invites people to explain what they
     are going through, and an open text field is exactly where somebody
     discloses a diagnosis, a medication, or a crisis. The brief forbids
     collecting health or emotional history through a marketing form, and
     forbids anything that reads as clinical assessment.

     So, deliberately:
       · NO symptom questions, and no severity scales
       · NO open "tell us what you're experiencing" field anywhere

     The single open field on the site is in the Studio intake, and it asks an
     advisor about their own practice. That is a different act from asking a
     depleted person to describe their state, and it is the distinction §14
     actually turns on.
       · every traveller question is about CIRCUMSTANCE or LOGISTICS —
         timing, origin, companionship, whether an advisor is already involved
       · the one question that touches motivation offers fixed choices about
         timing and intent, never about how somebody feels

     If a future question cannot be answered by a calendar, a map, or a yes/no,
     it probably does not belong here. That is the test.

   ADVISOR ROUTING IS INVISIBLE
     The advisor intake gathers enough to decide Inlet A or Inlet B, and the
     advisor is never shown a score, a tier, or a verdict. Routing appears only
     in the email that reaches us. See `routeAdvisor()` at the foot of the file.
   ========================================================================== */
'use strict';

/* Every intake ends with the same contact step. Written once so a future
   intake cannot quietly ask for more than the others. */
const CONTACT = {
  type: 'contact',
  question: 'Where should we send it?',
  note: 'We reply personally. No list, no sequence, no automated follow-up.',
  fields: [
    { name: 'name',  label: 'Your name',     type: 'text',  required: true,  autocomplete: 'name' },
    { name: 'email', label: 'Email address', type: 'email', required: true,  autocomplete: 'email' }
  ]
};

/* The medical boundary, on every confirmation without exception. */
const BOUNDARY =
  'Burnout Concierge provides guided recovery travel. It is designed to complement, ' +
  'rather than replace, medical or mental-health support. Outcomes vary by individual.';


const INTAKES = {

  /* ── TRAVELLER · rung 1 — request the Collection ───────────────────────
     The lightest rung. An email address, and the document arrives. Asking
     anything more of somebody who only wanted to read something would be
     charging admission for a brochure. */
  collection: {
    audience: 'traveller',
    title: 'The Recovery Collection',
    lead: 'The five journeys in full — the intention behind each, how it runs, and who it tends to suit.',
    document: 'collection',
    steps: [CONTACT],
    confirm: {
      head: 'It’s on its way.',
      lead: 'The Collection is in your inbox now. Read it whenever suits — there is no follow-up sequence attached to it.',
      next: [
        { when: 'Now',        what: 'The Recovery Collection arrives, with nothing else attached.' },
        { when: 'Whenever',   what: 'If a journey stands out, reply to that email and we’ll talk about it.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── TRAVELLER · rung 2 — a Personal Recommendation ────────────────────
     The middle rung, and the most important mechanic on the site. This is
     what replaced the assessment: same qualification data, opposite feeling.
     Five questions, none of them about symptoms. */
  recommendation: {
    audience: 'traveller',
    title: 'A Personal Recommendation',
    lead: 'Five short questions about your circumstances. Duncan reads every one himself and prepares a recommendation — a specific journey, why it suits you, and what it would involve.',
    document: 'collection',
    steps: [
      {
        type: 'choice',
        question: 'What’s drawing you toward a journey now?',
        note: 'Whichever is closest. There is no wrong answer, and you can say more later.',
        name: 'impulse',
        options: [
          { value: 'urgent',    label: 'Something needs to change, and fairly soon' },
          { value: 'planning',  label: 'I’m planning ahead for a break I know I need' },
          { value: 'not-held',  label: 'I’ve taken time off before and it didn’t hold' },
          { value: 'for-other', label: 'I’m looking on behalf of someone else' },
          { value: 'rather-talk', label: 'I’d rather explain it in a conversation' }
        ]
      },
      {
        type: 'choice',
        question: 'When are you hoping to travel?',
        note: 'An approximate window is enough. Nothing here is binding.',
        name: 'timing',
        options: [
          { value: '0-3m',   label: 'Within the next three months' },
          { value: '3-6m',   label: 'Three to six months from now' },
          { value: '6m+',    label: 'Later this year, or next' },
          { value: 'open',   label: 'I’d rather talk it through first' }
        ]
      },
      {
        type: 'text',
        question: 'Where would you be travelling from?',
        note: 'A city or country. It shapes what is realistic more than most things.',
        name: 'origin',
        placeholder: 'Toronto, Canada',
        autocomplete: 'country-name'
      },
      {
        type: 'choice',
        question: 'Would you be travelling alone?',
        name: 'company',
        options: [
          { value: 'alone',   label: 'On my own' },
          { value: 'partner', label: 'With a partner' },
          { value: 'friend',  label: 'With a friend or family member' },
          { value: 'group',   label: 'As part of a small group' },
          { value: 'unsure',  label: 'Not decided yet' }
        ]
      },
      {
        type: 'choice',
        question: 'Do you already work with a travel advisor?',
        note: 'If you do, we work through them rather than around them.',
        name: 'advisor',
        options: [
          { value: 'yes',     label: 'Yes, and I’d like them involved' },
          { value: 'yes-not', label: 'Yes, but not for this' },
          { value: 'no',      label: 'No' }
        ]
      },
      CONTACT
    ],
    confirm: {
      head: 'We’re preparing your recommendation.',
      lead: 'Duncan reads these himself and replies within two working days — with a specific journey, why it suits your circumstances, and what it would involve.',
      next: [
        { when: 'Today',      what: 'A short confirmation arrives, with The Recovery Collection attached.' },
        { when: '2 days',     what: 'Your recommendation follows — written for your circumstances, not a template.' },
        { when: 'When ready', what: 'A private conversation, if and when you want one.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── TRAVELLER · rung 3 — a private conversation ───────────────────────
     The deepest rung, and therefore the shortest form. Somebody who is ready
     to talk should not be made to fill in five screens first. */
  conversation: {
    audience: 'traveller',
    title: 'A Private Conversation',
    lead: 'A calm conversation with a concierge. No pressure, no commitment, and no need to have decided anything before it.',
    steps: [
      {
        type: 'choice',
        question: 'How would you prefer to talk?',
        name: 'channel',
        options: [
          { value: 'call',   label: 'A phone or video call' },
          { value: 'email',  label: 'Over email, to begin with' },
          { value: 'either', label: 'Either is fine' }
        ]
      },
      {
        type: 'choice',
        question: 'Roughly when suits?',
        note: 'We will send a couple of specific times rather than a booking link.',
        name: 'when',
        options: [
          { value: 'week',  label: 'This week if possible' },
          { value: 'soon',  label: 'In the next couple of weeks' },
          { value: 'later', label: 'No rush' }
        ]
      },
      CONTACT
    ],
    confirm: {
      head: 'We’ll be in touch shortly.',
      lead: 'You’ll hear from Duncan within one working day, with a couple of times rather than a calendar link.',
      next: [
        { when: '1 day',      what: 'A short note with two or three times that might suit.' },
        { when: 'The call',   what: 'Thirty minutes. Nothing to prepare, and nothing to decide on it.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── ADVISOR ───────────────────────────────────────────────────────────
     Gathers exactly enough to decide which inlet this advisor belongs on,
     and shows them none of it. They receive a prepared pathway and a human
     follow-up; the routing happens behind that. */
  advisor: {
    audience: 'advisor',
    title: 'The Advisor Prospectus',
    lead: 'Three questions, so the pathway we send back is the one that actually fits your practice.',
    document: 'prospectus',
    steps: [
      {
        type: 'choice',
        question: 'How would you describe your practice today?',
        name: 'practice',
        options: [
          { value: 'wellness',  label: 'Wellness travel is already my specialty' },
          { value: 'some',      label: 'I sell some wellness alongside other travel' },
          { value: 'general',   label: 'General travel, but I want to move toward wellness' },
          { value: 'coaching',  label: 'Coaching or advisory, with travel alongside' }
        ]
      },
      {
        type: 'choice',
        question: 'Any wellness credentials or training so far?',
        note: 'Not a requirement. It only changes where we suggest you start.',
        name: 'credential',
        options: [
          { value: 'wta',      label: 'Wellness Travel Association' },
          { value: 'wtu',      label: 'Wellness Travel University' },
          { value: 'coaching', label: 'A coaching or wellbeing qualification' },
          { value: 'other',    label: 'Something else' },
          { value: 'none',     label: 'None yet' }
        ]
      },
      {
        type: 'choice',
        question: 'Where did you first come across this category?',
        name: 'origin',
        options: [
          { value: 'dsw',      label: 'Through Saint Lucia WELL' },
          { value: 'client',   label: 'A client asked me for something like it' },
          { value: 'search',   label: 'I went looking for it' },
          { value: 'referral', label: 'Someone mentioned it' }
        ]
      },
      CONTACT
    ],
    confirm: {
      head: 'We’re preparing your pathway.',
      lead: 'The Advisor Prospectus is on its way now, and Duncan will follow up with the starting point that fits your practice.',
      next: [
        { when: 'Now',    what: 'The Advisor Prospectus arrives — the category, the specialty, and both pathways.' },
        { when: '2 days', what: 'A note on where to start, based on what you told us.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── VENTURE STUDIO ────────────────────────────────────────────────────
     The deepest rung, so the highest bar — and the only intake that asks
     anything in the advisor's own words. That is deliberate and it is safe:
     an advisor writing about their own practice is not a vulnerable person
     disclosing a health history, which is the risk §14 actually guards
     against. The field is capped and clearly scoped to the practice.

     It is still not a score. Admission is by conversation, and the intake
     exists so the conversation starts somewhere useful rather than at zero. */
  studio: {
    audience: 'advisor',
    title: 'A Studio Conversation',
    lead: 'The Studio admits by interview rather than enrolment, so this is the start of a conversation rather than an application form. Four questions, and one of them is open.',
    steps: [
      {
        type: 'choice',
        question: 'Where is your practice today?',
        name: 'stage',
        options: [
          { value: 'established', label: 'Established, and wellness is already the specialty' },
          { value: 'shifting',    label: 'Established, and deliberately shifting toward wellness' },
          { value: 'building',    label: 'Building — the practice is younger than the ambition' },
          { value: 'adjacent',    label: 'Adjacent — coaching, wellbeing or hospitality rather than travel' }
        ]
      },
      {
        type: 'choice',
        question: 'How far along the pathway are you?',
        note: 'There is no wrong answer. It changes what the conversation is about, not whether we have one.',
        name: 'pathway',
        options: [
          { value: 'immersion',  label: 'I have completed the Saint Lucia WELL immersion' },
          { value: 'foundations', label: 'I have done Foundations, not the immersion' },
          { value: 'intro',      label: 'I have been to an introduction' },
          { value: 'equivalent', label: 'Neither, but I have equivalent experience elsewhere' },
          { value: 'none',       label: 'I am starting here' }
        ]
      },
      {
        type: 'text',
        question: 'What would you want the Studio to help you build?',
        note: 'A sentence is plenty. This is about your practice — what you would want to have that you do not have now.',
        name: 'ambition',
        placeholder: 'A defined offer, and the confidence to charge for the design',
        maxlength: 300
      },
      CONTACT
    ],
    confirm: {
      head: 'We’ll be in touch about a conversation.',
      lead: 'Duncan reads these himself. If it looks like a fit from both sides, the next step is a conversation rather than an enrolment, and if it does not, he will say so plainly and point you somewhere better.',
      next: [
        { when: '2 days',     what: 'A reply, and honestly either way.' },
        { when: 'If it fits', what: 'A conversation about your practice, not a sales call.' },
        { when: 'After that', what: 'Admission, or a clear reason and a better route.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── ORGANIZATION ──────────────────────────────────────────────────────
     A workplace buyer needs something they can forward. The Brief is written
     to be read by somebody who was not on the call. */
  organization: {
    audience: 'organization',
    title: 'The Recovery Infrastructure Brief',
    lead: 'Three questions, so the outline we send is about your situation rather than a generic programme.',
    document: 'infrastructure',
    steps: [
      {
        type: 'choice',
        question: 'What prompted this?',
        name: 'trigger',
        options: [
          { value: 'individual', label: 'A specific leader who needs a recovery period' },
          { value: 'pattern',    label: 'A pattern we keep seeing across the team' },
          { value: 'policy',     label: 'We’re designing a sabbatical or leave policy' },
          { value: 'return',     label: 'Someone is returning and we want it to hold' }
        ]
      },
      {
        type: 'choice',
        question: 'Is there a leave or sabbatical structure already?',
        name: 'structure',
        options: [
          { value: 'formal',   label: 'Yes, a formal policy' },
          { value: 'informal', label: 'Informally, case by case' },
          { value: 'none',     label: 'Nothing structured yet' }
        ]
      },
      {
        type: 'text',
        question: 'Which organization, and your role in it?',
        name: 'org',
        placeholder: 'Company, and your role',
        autocomplete: 'organization'
      },
      CONTACT
    ],
    confirm: {
      head: 'We’re preparing your outline.',
      lead: 'The Recovery Infrastructure Brief is on its way, and an organizational outline will follow within two working days.',
      next: [
        { when: 'Now',    what: 'The Brief arrives — written to be forwarded internally.' },
        { when: '2 days', what: 'An outline for your situation, and an executive briefing if useful.' }
      ],
      boundary: BOUNDARY
    }
  },

  /* ── HOSPITALITY ───────────────────────────────────────────────────────
     A new audience the original brief folded into a general partner bucket.
     Properties get their own language and their own document. */
  property: {
    audience: 'property',
    title: 'The Recovery-Ready Property Brief',
    lead: 'Three questions, so the collaboration outline reflects what you already have rather than what a template assumes.',
    document: 'property',
    steps: [
      {
        type: 'choice',
        question: 'What kind of environment is it?',
        name: 'kind',
        options: [
          { value: 'resort',   label: 'A resort or hotel' },
          { value: 'retreat',  label: 'A dedicated retreat property' },
          { value: 'destination', label: 'A destination or tourism board' },
          { value: 'practice', label: 'A practitioner group or clinic' }
        ]
      },
      {
        type: 'choice',
        question: 'Is there wellbeing programming already?',
        name: 'programming',
        options: [
          { value: 'established', label: 'Yes, and it’s well established' },
          { value: 'growing',     label: 'Some, and we’re building it out' },
          { value: 'none',        label: 'Not yet — this would be the start' }
        ]
      },
      {
        type: 'text',
        question: 'Which property, and where?',
        name: 'property',
        placeholder: 'Property name, and location',
        autocomplete: 'organization'
      },
      CONTACT
    ],
    confirm: {
      head: 'We’re preparing your outline.',
      lead: 'The Recovery-Ready Property Brief is on its way, and a collaboration outline will follow within two working days.',
      next: [
        { when: 'Now',    what: 'The Brief arrives — what a recovery-ready environment provides, and what it leaves out.' },
        { when: '2 days', what: 'An outline of how a collaboration could work for your property.' }
      ],
      boundary: BOUNDARY
    }
  }
};


/* ══════════════════════════════════════════════════════════════════════════
   ADVISOR ROUTING — decided here, shown nowhere
   ──────────────────────────────────────────────────────────────────────────
   Inlet A is the general advisor adding wellness; their rungs are already live
   on Saint Lucia WELL and we link rather than rebuild. Inlet B is the
   wellness-credentialed advisor adding burnout as a specialty, which is our
   own ladder.

   An advisor arriving from the Saint Lucia immersion has, by definition,
   already walked Inlet A — Eclipse IS a burnout retreat — so they go straight
   to the Burnout Concierge rungs regardless of what else they said.

   This returns a recommendation for the human who reads the email. It is never
   rendered to the advisor, and there is no score anywhere in it.
   ══════════════════════════════════════════════════════════════════════════ */
function routeAdvisor(answers, context) {
  if (context === 'dsw-immersion') {
    return {
      inlet: 'B',
      reason: 'Arrived from the Saint Lucia WELL immersion — has already met the category.',
      startAt: 'Burnout as a category, or straight to a Studio conversation'
    };
  }

  const credentialled = ['wta', 'wtu', 'coaching'].indexOf(answers.credential) !== -1;
  const wellnessFirst = ['wellness', 'coaching'].indexOf(answers.practice) !== -1;

  if (credentialled || wellnessFirst) {
    return {
      inlet: 'B',
      reason: 'Wellness-credentialled or wellness-first practice — the direct burnout ladder fits.',
      startAt: 'Burnout as a category'
    };
  }

  return {
    inlet: 'A',
    reason: 'General or mixed practice — the Saint Lucia WELL ladder builds the base first.',
    startAt: 'Saint Lucia WELL introduction'
  };
}


module.exports = { INTAKES, routeAdvisor, BOUNDARY };
