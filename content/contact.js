/* ============================================================================
   CONTACT — routing, and one thing that matters more than routing
   ----------------------------------------------------------------------------
   Functional tier. A contact page is a switchboard: four audiences, four
   doors, and the fewest words that get somebody through the right one.

   THE CRISIS SIGNPOST
     This is a burnout brand. Some proportion of people arriving here are in
     genuine distress, and a few of them will land on the contact page looking
     for a person because they cannot think of anywhere else to look.

     We are not a crisis service, we do not monitor anything in real time, and
     a reply within two working days is worse than useless to somebody in an
     emergency. Saying so plainly — and pointing somewhere better — is the
     single most important thing on this page, so it sits above the routing
     rather than in a footnote.

     No specific hotline numbers, deliberately. The audience is international
     and a wrong or out-of-date number is more dangerous than none; local
     emergency services and a national crisis line are what somebody can
     actually act on from anywhere.
   ========================================================================== */
'use strict';

module.exports = {
  key: 'contact',
  path: '/contact',
  surface: 'consumer',
  layout: 'plain',
  title: 'Contact — Burnout Concierge',
  description:
    'How to reach Burnout Concierge, and which door to use. We are not a crisis service.',

  sections: [

    {
      type: 'pageHeader',
      label: 'Contact',
      eyebrow: 'Contact',
      headline: 'Whichever door fits.',
      lead: 'Every route below reaches a person rather than a queue. Duncan reads them himself and replies within two working days.',
      primary:   { label: 'Begin a Private Conversation', href: '/work-with-a-concierge/conversation' },
      primaryEvent: 'concierge_intake_start',
      secondary: { label: 'Or just email us', href: 'mailto:hello@burnoutconcierge.co' }
    },

    /* ── The crisis signpost, above the routing ─────────────────────────── */
    {
      type: 'longform',
      skin: 'light',
      id: 'urgent',
      level: 2,   /* a section here, not the page — the pageHeader owns the h1 */
      label: 'If it is urgent',
      eyebrow: 'Please read first',
      headline: 'If you need help now,<br>this is not the right place.',
      reviewed: '29 August 2026',
      blocks: [
        {
          type: 'callout',
          text: 'Burnout Concierge is not a crisis service. Nothing here is monitored in real time, and a reply may take up to two working days. <strong>If you are in crisis, or thinking about harming yourself, please contact your local emergency services or a crisis line in your country now.</strong> If you are somewhere you can reach a doctor, they are a better first call than we are.'
        },
        {
          type: 'p',
          text: 'We design and coordinate travel. That is genuinely useful when somebody has run out of room to recover where they are, and it is the wrong tool entirely when what is needed is care today. Telling somebody that is part of the job, and we would rather say it here than in a reply two days later.'
        }
      ]
    },

    /* ── The four doors ─────────────────────────────────────────────────── */
    {
      type: 'pathways',
      skin: 'light',
      id: 'routes',
      label: 'Which door',
      headline: 'Four ways in.',
      lead: 'Each of these starts with a few questions so the reply is about your situation rather than a template.',
      pathways: [
        { head: 'I’m looking for a recovery journey',
          body: 'Request the Collection, ask for a personal recommendation, or begin a private conversation — whichever feels like the right amount right now.',
          cta: 'Work with a concierge',
          href: '/work-with-a-concierge',
          event: 'consumer_path_click' },
        { head: 'I’m a travel advisor',
          body: 'The burnout specialty, both pathways into it, and the Concierge Venture Studio they converge on.',
          cta: 'The advisor pathway',
          href: '/for-advisors',
          event: 'advisor_pathway_click' },
        { head: 'I’m asking on behalf of an organization',
          body: 'Recovery sabbaticals, executive recovery, leadership reintegration and recovery travel — with an executive briefing first.',
          cta: 'For organizations',
          href: '/organizations',
          event: 'organization_inquiry' },
        { head: 'I run a property, destination or network',
          body: 'Recovery-ready environments, journey development, and bringing the specialty to an advisor membership.',
          cta: 'Partner with us',
          href: '/partners',
          event: 'partnership_inquiry' }
      ]
    },

    /* ── The plain details ──────────────────────────────────────────────── */
    {
      type: 'longform',
      skin: 'light',
      id: 'details',
      level: 2,   /* a section here, not the page — the pageHeader owns the h1 */
      label: 'Details',
      headline: 'Everything else.',
      reviewed: '29 August 2026',
      blocks: [
        { type: 'h', id: 'email', text: 'Email' },
        { type: 'p', text: 'General enquiries: <a href="mailto:hello@burnoutconcierge.co">hello@burnoutconcierge.co</a>. Media and speaking: the same address, and please say so in the subject line.' },
        { type: 'p', text: 'If you have already used one of the forms above, there is no need to email as well. It reaches the same person.' },

        { type: 'h', id: 'replies', text: 'What to expect' },
        { type: 'defs', items: [
          { term: 'Response time', def: 'Within two working days, and usually sooner. If something is time-sensitive, say so in the first line.' },
          { term: 'Who replies', def: 'Duncan, in person. There is no automated sequence attached to any form on this site.' },
          { term: 'Follow-up', def: 'One reply, and then only if you write back. Nobody is added to a list by contacting us.' }
        ]},

        { type: 'h', id: 'advisors', text: 'If you already work with a travel advisor' },
        { type: 'p', text: 'Tell us and we will work through them rather than around them. An advisor who introduced you keeps the relationship, and that is true whether or not they are formally part of our network.' },

        { type: 'h', id: 'limits', text: 'What we cannot help with' },
        { type: 'list', items: [
          'Anything urgent or clinical — see the note at the top of this page',
          'Medical or mental-health advice of any kind',
          'Bookings unrelated to recovery travel. A good general travel agent will do it better and cheaper',
          'Resilience training, workshops or wellbeing platforms for organizations'
        ]}
      ]
    }
  ]
};
