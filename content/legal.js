/* ============================================================================
   LEGAL — privacy, terms, accessibility
   ----------------------------------------------------------------------------
   Functional tier.

   PRIVACY IS FACTUAL, NOT ASPIRATIONAL
     Everything in the privacy page describes what the code on this site
     actually does. It was written by reading js/attribution.js,
     js/analytics.js and api/intake.js rather than by adapting a template, and
     it should be re-read whenever any of those three change.

     Two things are worth stating because they are unusual, and both are
     consequences of decisions already made in the build:

       · There are NO third-party requests. Fonts are self-hosted precisely
         because a font request is a disclosure — loading them from Google
         would put every visitor's IP address in front of a third party before
         they had read a word. That sentence never has to appear here.
       · There are NO cookies. Attribution uses sessionStorage, which is
         first-party and expires with the visit, which is why this site has no
         consent banner rather than having one that does nothing.

   TERMS IS DELIBERATELY NARROW
     A terms page is the one place where inventing plausible-sounding content
     is genuinely risky, because it purports to be an agreement. So it covers
     only what can be stated truthfully today — scope of service, the clinical
     boundary, third-party suppliers, and intellectual property — and stops.

     Booking, cancellation and payment terms are NOT here, because they have
     not been agreed. Inventing them would be worse than their absence.
     Governing law is marked as needing confirmation rather than guessed at.

     THIS PAGE NEEDS A LAWYER'S EYES BEFORE LAUNCH. It is written to be
     accurate rather than to be sufficient.

   ACCESSIBILITY IS SPECIFIC BECAUSE IT WAS MEASURED
     Every claim on that page was verified during the build rather than
     asserted, and the known limitations are listed honestly.
   ========================================================================== */
'use strict';

const REVIEWED = '29 August 2026';

module.exports = [

  /* ══════════════════════════════════════════════════════════════════════
     PRIVACY
     ══════════════════════════════════════════════════════════════════════ */
  {
    key: 'privacy',
    path: '/privacy',
    surface: 'consumer',
    layout: 'plain',
    title: 'Privacy — Burnout Concierge',
    description:
      'What this site stores, what it does not, and why there is no cookie banner.',

    sections: [{
      type: 'longform',
      id: 'privacy',
      label: 'Privacy',
      eyebrow: 'Privacy',
      headline: 'What this site knows about you.',
      lead: 'Short version: no cookies, no third parties, no tracking across sites, and nothing at all unless you fill in a form.',
      reviewed: REVIEWED,
      blocks: [

        { type: 'h', id: 'no-cookies', text: 'There are no cookies' },
        { type: 'p', text: 'This site sets no cookies of any kind. That is why there is no consent banner — not because we have decided one is unnecessary, but because there is nothing to consent to.' },
        { type: 'p', text: 'A small amount of information is kept in <em>sessionStorage</em>, which is first-party, stays in your browser, is never sent anywhere on its own, and is deleted when you close the tab.' },

        { type: 'h', id: 'no-third-parties', text: 'There are no third-party requests' },
        { type: 'p', text: 'Everything this site loads comes from this site. Typefaces are served from our own servers rather than from Google Fonts, because a font request is a disclosure: loading them from a third party would place your IP address in front of that company before you had read a word here.' },
        { type: 'p', text: 'There are no advertising pixels, no social embeds, no session recording, no heatmaps, and no chat widget.' },

        { type: 'h', id: 'attribution', text: 'What is kept in your browser' },
        { type: 'p', text: 'If you arrive through a travel advisor’s link, or from a campaign, the site remembers a little about that so the right person is credited and so we know which routes work. It lives in sessionStorage under the key <code>bc.attr</code> and consists of:' },
        { type: 'defs', items: [
          { term: 'Advisor referral', def: 'The <code>advisor</code> or <code>ref</code> value from the link you arrived on. The first one seen in a visit is kept and never overwritten, so a later untagged visit cannot reassign a lead somebody else earned.' },
          { term: 'Campaign source', def: 'Standard <code>utm_*</code> values, plus <code>src</code> and <code>campaign</code>. These describe how you arrived this time and are updated if you arrive again from somewhere else.' },
          { term: 'Ecosystem context', def: 'Whether you arrived from a specific part of the wider ecosystem, such as a Saint Lucia WELL programme, so a page can acknowledge it rather than start from zero.' },
          { term: 'Landing page and referrer', def: 'The first page you saw and where you came from, recorded once.' }
        ]},
        { type: 'p', text: 'None of that identifies you. It is not sent anywhere by itself. It is attached to a form only if and when you choose to submit one. The advisor value is also added to links you click within our own sites, so a referral survives moving between them.' },

        { type: 'h', id: 'forms', text: 'What happens when you use a form' },
        { type: 'p', text: 'Every form on this site sends its answers to us by email and nothing else. There is no database, no CRM, and no marketing platform behind them. What arrives is: your answers, your name and email address, and the attribution described above.' },
        { type: 'p', text: 'You receive one confirmation email. You are not added to a list, and there is no automated sequence attached to any form here. If you write back, a person replies.' },
        { type: 'callout', text: '<strong>We do not ask about your health, and you should not tell us.</strong> No form on this site asks about symptoms, diagnoses, medication or treatment, and none has an open field inviting you to describe how you are. Questions are limited to circumstance and logistics — timing, where you are travelling from, who with. If you volunteer health information anyway, we will not record or retain it.' },

        { type: 'h', id: 'measurement', text: 'Measurement' },
        { type: 'p', text: 'We count page views and how far down a page people scroll, so we can tell which routes are working. This is aggregate, first-party and carries no cookie or device identifier. There is no cross-site tracking and no profile is built about you.' },

        { type: 'h', id: 'sharing', text: 'Who else sees it' },
        { type: 'defs', items: [
          { term: 'Our email provider', def: 'Resend, which delivers the messages the forms generate. They process the contents in order to deliver them.' },
          { term: 'Our host', def: 'Vercel, which serves these pages and keeps standard server logs.' },
          { term: 'A travel advisor', def: 'If you tell us you are working with one, or arrived through their link, we work with them on your enquiry.' },
          { term: 'Nobody else', def: 'Nothing is sold, shared for advertising, or passed to a data broker. Ever.' }
        ]},

        { type: 'h', id: 'retention', text: 'How long it is kept' },
        { type: 'p', text: 'Enquiry emails are kept for as long as the conversation is live and for a reasonable period afterwards in case you come back to it. Ask us to delete your enquiry and we will, and confirm when it is done.' },

        { type: 'h', id: 'rights', text: 'Your rights' },
        { type: 'p', text: 'You can ask what we hold about you, ask for a copy, ask us to correct it, or ask us to delete it. Write to <a href="mailto:hello@burnoutconcierge.co">hello@burnoutconcierge.co</a> and we will respond within thirty days. If you are in the UK or EU, you also have the right to complain to your data protection authority.' },
        { type: 'p', text: 'To clear what is stored in your browser, close the tab — sessionStorage does not survive it.' },

        { type: 'h', id: 'changes', text: 'Changes' },
        { type: 'p', text: 'This page describes what the site actually does, so it changes when the site does. The review date at the top is maintained rather than decorative.' }
      ]
    }]
  },

  /* ══════════════════════════════════════════════════════════════════════
     TERMS
     ══════════════════════════════════════════════════════════════════════ */
  {
    key: 'terms',
    path: '/terms',
    surface: 'consumer',
    layout: 'plain',
    title: 'Terms — Burnout Concierge',
    description:
      'The scope of what Burnout Concierge provides, and the limits of it.',

    sections: [{
      type: 'longform',
      id: 'terms',
      label: 'Terms',
      eyebrow: 'Terms',
      headline: 'What we provide,<br>and what we do not.',
      lead: 'These terms cover the use of this website and the general scope of the service. Anything you book is covered by a separate written agreement.',
      reviewed: REVIEWED,
      blocks: [

        { type: 'h', id: 'scope', text: 'What Burnout Concierge is' },
        { type: 'p', text: 'Burnout Concierge designs and coordinates recovery travel. We advise on which journey suits a person’s circumstances, arrange it, and remain available through the journey and the return.' },
        { type: 'p', text: 'We are not a clinical provider. We do not diagnose, treat, prescribe, or provide therapy, counselling or medical advice, and nothing on this site should be read as any of those. The service is designed to complement medical and mental-health support rather than to replace it.' },

        { type: 'callout', text: '<strong>This is not an emergency or crisis service.</strong> Nothing here is monitored in real time. If you need help urgently, contact your local emergency services or a crisis line in your country.' },

        { type: 'h', id: 'outcomes', text: 'Outcomes' },
        { type: 'p', text: 'Recovery journeys are designed to support recovery. They are not guaranteed to produce any particular result, and outcomes vary between individuals. Nothing on this site is a promise of a specific outcome, timeframe or improvement, and any description of what a journey is designed to do should be read that way.' },

        { type: 'h', id: 'practitioners', text: 'Practitioners and suppliers' },
        { type: 'p', text: 'Journeys involve independent third parties — properties, practitioners, facilitators and transport providers. Each works within their own scope, licensing and insurance, and is responsible for the services they provide. We select and coordinate them with care; we do not employ them and cannot be responsible for their acts or omissions.' },
        { type: 'p', text: 'Where a journey is operated by a partner rather than by us, that is stated plainly wherever the journey appears.' },

        { type: 'h', id: 'advisors', text: 'Travel advisors' },
        { type: 'p', text: 'Where a client is introduced by a travel advisor, the client relationship remains the advisor’s. Referral attribution is recorded from the link used, and the first referral recorded for a visit is the one that stands.' },

        { type: 'h', id: 'bookings', text: 'Bookings and payment' },
        { type: 'p', text: 'Nothing can be booked or paid for on this website. Any engagement — a journey, an organizational programme, or a Studio place — is agreed separately and in writing, including price, payment and cancellation terms, before anything is committed to. Those written terms govern the engagement; this page does not.' },

        { type: 'h', id: 'accuracy', text: 'Accuracy of this site' },
        { type: 'p', text: 'We keep this site accurate and current, and every journey carries a status showing whether it is available. Availability, pricing and partners change, and nothing here is an offer capable of acceptance.' },

        { type: 'h', id: 'ip', text: 'Intellectual property' },
        { type: 'p', text: 'The content, design, documents and brand on this site belong to Burnout Concierge unless otherwise credited. The prepared documents may be read and circulated inside the organization they were sent to; they may not be republished or sold. Photography on this site is generated imagery used illustratively and does not depict real clients, staff or specific properties.' },

        { type: 'h', id: 'links', text: 'Links to other sites' },
        { type: 'p', text: 'This site links to other properties in the wider ecosystem, including Saint Lucia WELL. Those are separate sites with their own terms and privacy policies, and we are not responsible for their content.' },

        { type: 'h', id: 'contact', text: 'Questions' },
        { type: 'p', text: 'Write to <a href="mailto:hello@burnoutconcierge.co">hello@burnoutconcierge.co</a>.' },

        { type: 'callout', text: '<strong>Note for launch:</strong> the operating entity, registered address and governing law are still to be confirmed, and this page should be reviewed by a qualified lawyer before the site goes live. It is written to be accurate about what the service is; it is not a substitute for legal advice.' }
      ]
    }]
  },

  /* ══════════════════════════════════════════════════════════════════════
     ACCESSIBILITY
     ══════════════════════════════════════════════════════════════════════ */
  {
    key: 'accessibility',
    path: '/accessibility',
    surface: 'consumer',
    layout: 'plain',
    title: 'Accessibility — Burnout Concierge',
    description:
      'What has been done to make this site usable, what was measured, and what is still missing.',

    sections: [{
      type: 'longform',
      id: 'accessibility',
      label: 'Accessibility',
      eyebrow: 'Accessibility',
      headline: 'What has been done,<br>and what has not.',
      lead: 'This site is built to WCAG 2.1 AA. The claims below were measured during the build rather than asserted, and the last section lists what is still outstanding.',
      reviewed: REVIEWED,
      blocks: [

        { type: 'h', id: 'why', text: 'Why this matters here particularly' },
        { type: 'p', text: 'People arrive at this site depleted. Reading is harder, patience is shorter, and anything that demands precision — a tiny tap target, a form that loses its place, a page that needs scripting to show its words — costs more than it would elsewhere. Most of what follows is ordinary good practice, applied with that in mind.' },

        { type: 'h', id: 'measured', text: 'What was measured' },
        { type: 'defs', items: [
          { term: 'Contrast', def: 'Every piece of text was checked against its real composited background, at AA thresholds. Three of the brand’s own colours failed when carrying small text and were given darker text-only variants; the original values are still used wherever they are not carrying text.' },
          { term: 'Target size', def: 'Every link, button and form control is at least 44 by 44 pixels, including in the footer and inside the ladder diagrams.' },
          { term: 'Motion', def: 'All animation is disabled under <code>prefers-reduced-motion</code>, and reveals resolve instantly instead.' },
          { term: 'Without scripting', def: 'Every page renders completely with JavaScript disabled, including the forms, which submit normally. No content is ever hidden by an animation that might not run.' },
          { term: 'Structure', def: 'One h1 per page, headings in order, landmarks for the header, navigation, main content and footer, and a skip link to main content.' }
        ]},

        { type: 'h', id: 'forms', text: 'Forms' },
        { type: 'p', text: 'Forms show one question at a time, which is easier to hold in mind, and every step is a real fieldset with a real legend. Options are ordinary radio buttons underneath their styling, so they behave correctly with a keyboard and a screen reader. Each new question is announced. There is no time limit and no progress bar.' },
        { type: 'p', text: 'With JavaScript disabled the same form appears as one ordinary page and submits normally.' },

        { type: 'h', id: 'known', text: 'What is not done yet' },
        { type: 'p', text: 'Stated plainly, because an accessibility page that lists only successes is not much use:' },
        { type: 'list', items: [
          'This site has not yet been tested with real assistive technology by disabled users. Automated checks and keyboard testing are not the same thing, and we know it.',
          'Text is not yet verified at 200% zoom on every page and breakpoint.',
          'No accessibility conformance report (VPAT or equivalent) has been produced.',
          'Alternative text on decorative photography is intentionally empty; on the few images carrying meaning it is written, but it has not been reviewed by anybody other than the person who wrote it.',
          'Prepared documents are HTML pages rather than tagged PDFs. We think that is the more accessible choice, but it means there is no accessible PDF to offer if somebody needs one.'
        ]},

        { type: 'h', id: 'report', text: 'If something does not work' },
        { type: 'p', text: 'Please tell us. It is the fastest way for this list to get shorter. Write to <a href="mailto:hello@burnoutconcierge.co">hello@burnoutconcierge.co</a> with what you were trying to do and what happened. We will reply within two working days, and if something is genuinely blocking you we will help you do it another way while we fix it.' }
      ]
    }]
  }
];
