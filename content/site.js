/* ============================================================================
   SITE — nav, footer, and shared metadata
   ----------------------------------------------------------------------------
   NAV TARGETS, WHILE THE HOMEPAGE IS THE ONLY PAGE
     Every nav item points at a section of the homepage rather than a route
     that does not exist yet. A nav that 404s is worse than a nav that scrolls,
     and stub pages are explicitly ruled out by the brief — incomplete
     architecture lowers perceived maturity rather than raising it.

     When /journeys, /for-advisors and /organizations are built, each becomes a
     one-line href change here. Nothing else moves.
   ========================================================================== */
'use strict';

module.exports = {
  name: 'Burnout Concierge',
  origin: 'https://www.burnoutconcierge.co',
  description:
    'Guided burnout recovery travel. Burnout Concierge designs and accompanies recovery journeys for people who have run out of room to recover where they are.',
  ogImage: '/assets/images/og-home.jpg',

  promise: 'Guiding transformation. Holding space. Returning people home.',

  legal:
    'Burnout Concierge provides guided recovery travel. It is designed to complement, rather than replace, medical or mental-health support. Outcomes vary by individual.',

  primaryCta: { label: 'Find Your Recovery Path', href: '/work-with-a-concierge' },

  nav: [
    { label: 'Journeys',      href: '/#collection' },
    { label: 'For Advisors',  href: '/for-advisors' },
    { label: 'Organizations', href: '/#organizations' },
    { label: 'Saint Lucia WELL', route: 'dsw.home' },
    { label: 'About',         href: '/#founder' }
  ],

  footer: [
    {
      head: 'Journeys',
      links: [
        { label: 'The Recovery Collection', href: '/collection' },
        { label: 'Work with a concierge',   href: '/work-with-a-concierge' },
        { label: 'The concierge journey',   href: '/#journey' }
      ]
    },
    {
      head: 'Advisors',
      links: [
        { label: 'The advisor pathway',   href: '/for-advisors' },
        { label: 'Category introduction', route: 'dsw.intro' },
        { label: 'Foundations',           route: 'dsw.foundations' },
        { label: 'Immersion',             route: 'dsw.immersion' }
      ]
    },
    {
      head: 'Ecosystem',
      links: [
        { label: 'Saint Lucia WELL', route: 'dsw.home' },
        { label: 'Eclipse',          route: 'dsw.eclipse' },
        { label: 'REV',              route: 'rev.home' }
      ]
    },
    {
      head: 'Organizations',
      links: [
        { label: 'Recovery infrastructure', href: '/#organizations' },
        { label: 'Partner with us',         href: '/#partners' }
      ]
    }
  ]
};
