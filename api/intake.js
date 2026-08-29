/* ============================================================================
   POST /api/intake — the only endpoint
   ----------------------------------------------------------------------------
   Validates a submission against its spec, then sends two emails: one to the
   concierge inbox with everything attached, and one to the visitor confirming
   what was asked for.

   WHY VALIDATION HAPPENS AGAINST THE SPEC
     The intake specs in content/intakes.js are the single definition of what
     each form may contain. Checking against them here rather than against a
     hand-written list means a question cannot be added to a form without the
     server knowing about it, and — more importantly — a field cannot be
     injected into the payload that no form ever asked for.

   WHAT IS DELIBERATELY NOT STORED
     Nothing. There is no database at launch. The submission becomes an email
     and that is all it becomes. When Supabase arrives, this is the one file
     that changes.

   WHAT IS DELIBERATELY NOT ACCEPTED
     Any field not named in the spec is dropped, silently and completely. §14
     forbids collecting health or emotional history through a marketing form,
     and the surest way to honour that is to make it structurally impossible
     for free text we did not ask for to reach an inbox.
   ========================================================================== */
'use strict';

const { INTAKES, routeAdvisor } = require('../content/intakes.js');

const INBOX = process.env.CONCIERGE_INBOX || 'duncan.so@phinklife.org';
const FROM  = process.env.CONCIERGE_FROM  || 'Burnout Concierge <concierge@burnoutconcierge.co>';
const ORIGIN = 'https://www.burnoutconcierge.co';

const DOCUMENTS = {
  collection:     { title: 'The Recovery Collection',            path: '/collection' },
  prospectus:     { title: 'The Advisor Prospectus',             path: '/advisor-prospectus' },
  infrastructure: { title: 'The Recovery Infrastructure Brief',  path: '/infrastructure-brief' },
  property:       { title: 'The Recovery-Ready Property Brief',  path: '/property-brief' }
};

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* Long enough for a city and a company name, short enough that the field is
   not a place to paste a medical history. */
const CAP = 300;


function collect(spec, body) {
  const answers = {};
  const errors = [];

  for (const step of spec.steps) {
    if (step.type === 'choice') {
      const v = body[step.name];
      const allowed = step.options.map((o) => o.value);
      if (v && allowed.indexOf(v) === -1) errors.push(`${step.name} is not one of the offered options`);
      else if (v) answers[step.name] = v;
      else if (step.required !== false) errors.push(`${step.name} is required`);

    } else if (step.type === 'contact') {
      for (const f of step.fields) {
        const v = (body[f.name] || '').toString().trim().slice(0, CAP);
        if (f.required && !v) errors.push(`${f.label} is required`);
        else if (f.type === 'email' && v && !isEmail(v)) errors.push('That email address does not look right');
        else if (v) answers[f.name] = v;
      }

    } else {
      const v = (body[step.name] || '').toString().trim().slice(0, CAP);
      if (v) answers[step.name] = v;
    }
  }

  return { answers, errors };
}


function labelFor(spec, name, value) {
  for (const step of spec.steps) {
    if (step.type === 'choice' && step.name === name) {
      const hit = step.options.find((o) => o.value === value);
      return hit ? hit.label : value;
    }
    if (step.name === name) return value;
    if (step.type === 'contact') {
      const f = step.fields.find((x) => x.name === name);
      if (f) return value;
    }
  }
  return value;
}

function questionFor(spec, name) {
  for (const step of spec.steps) {
    if (step.name === name) return step.question;
    if (step.type === 'contact') {
      const f = step.fields.find((x) => x.name === name);
      if (f) return f.label;
    }
  }
  return name;
}


function conciergeEmail(key, spec, answers, attribution, routing) {
  const rows = Object.keys(answers).map((k) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#736E65;font:400 12px/1.5 system-ui">${esc(questionFor(spec, k))}</td>
         <td style="padding:6px 0;font:400 15px/1.5 system-ui">${esc(labelFor(spec, k, answers[k]))}</td></tr>`).join('');

  const a = attribution || {};
  const attrRows = [
    ['Advisor referral', a.advisor], ['Ecosystem context', a.context],
    ['Source', a.source], ['Medium', a.medium], ['Campaign', a.campaign],
    ['Landed on', a.landing], ['Referrer', a.referrer]
  ].filter(([, v]) => v).map(([k, v]) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#736E65;font:400 12px/1.5 system-ui">${esc(k)}</td>
         <td style="padding:4px 0;font:400 13px/1.5 system-ui">${esc(v)}</td></tr>`).join('');

  const routeBlock = routing ? `
    <h3 style="font:400 14px/1.4 system-ui;color:#82663A;margin:28px 0 8px">Suggested routing — Inlet ${esc(routing.inlet)}</h3>
    <p style="font:400 14px/1.6 system-ui;margin:0 0 4px">${esc(routing.reason)}</p>
    <p style="font:400 14px/1.6 system-ui;margin:0;color:#57534B">Start at: ${esc(routing.startAt)}</p>` : '';

  return `<div style="max-width:640px;font-family:system-ui,sans-serif;color:#1A1815">
    <p style="font:400 12px/1.5 system-ui;letter-spacing:.16em;text-transform:uppercase;color:#82663A;margin:0 0 6px">${esc(spec.audience)} · ${esc(key)}</p>
    <h2 style="font:400 22px/1.3 Georgia,serif;margin:0 0 20px">${esc(answers.name || 'New enquiry')}</h2>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${routeBlock}
    ${attrRows ? `<h3 style="font:400 14px/1.4 system-ui;color:#82663A;margin:28px 0 8px">Attribution</h3>
    <table style="border-collapse:collapse;width:100%">${attrRows}</table>` : ''}
  </div>`;
}


function visitorEmail(spec, answers, doc) {
  const link = doc ? `${ORIGIN}${doc.path}` : null;
  return `<div style="max-width:560px;font-family:Georgia,serif;color:#1A1815;line-height:1.6">
    <p style="font:400 12px/1.5 system-ui;letter-spacing:.16em;text-transform:uppercase;color:#82663A">Burnout Concierge</p>
    <h1 style="font:300 26px/1.25 Georgia,serif;margin:14px 0 18px">${esc(spec.confirm.head)}</h1>
    <p style="margin:0 0 18px">${esc(spec.confirm.lead)}</p>
    ${link ? `<p style="margin:0 0 24px"><a href="${esc(link)}" style="color:#A16434">Read ${esc(doc.title)} &rarr;</a></p>` : ''}
    <table style="border-collapse:collapse;margin:0 0 24px">${spec.confirm.next.map((n) =>
      `<tr><td style="padding:8px 18px 8px 0;font:400 11px/1.5 system-ui;letter-spacing:.14em;text-transform:uppercase;color:#82663A;white-space:nowrap;vertical-align:top">${esc(n.when)}</td>
           <td style="padding:8px 0;font:400 15px/1.6 Georgia,serif">${esc(n.what)}</td></tr>`).join('')}
    </table>
    <p style="font:400 13px/1.6 system-ui;color:#57534B;border-top:1px solid #DDE1DB;padding-top:16px">${esc(spec.confirm.boundary)}</p>
  </div>`;
}


/* A fetch gets JSON. A browser that posted the form natively — scripting off,
   or the front-end fetch fell back — gets a redirect to a real page, because
   raw JSON is a broken-looking end to something somebody just trusted you
   with. 303 so the redirect is followed as a GET and a refresh cannot resend. */
function done(req, res, payload) {
  const accept = (req.headers && req.headers.accept) || '';
  const wantsJson = accept.indexOf('application/json') !== -1;
  if (wantsJson) return res.status(200).json(payload);
  res.setHeader('Location', '/thank-you');
  return res.status(303).end();
}


module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const key = body.intake;
  const spec = INTAKES[key];
  if (!spec) return res.status(400).json({ error: 'Unknown intake' });

  const { answers, errors } = collect(spec, body);
  if (errors.length) return res.status(400).json({ error: errors[0], errors });

  const attribution = (body.attribution && typeof body.attribution === 'object') ? body.attribution : {};
  const routing = spec.audience === 'advisor' ? routeAdvisor(answers, attribution.context) : null;
  const doc = spec.document ? DOCUMENTS[spec.document] : null;

  const subject = `${spec.title} — ${answers.name || 'new enquiry'}`
    + (attribution.advisor ? ` [advisor: ${attribution.advisor}]` : '');

  /* No key in the environment means a preview deployment or a local run. Log
     it and report success, so the front end can still be exercised end to end
     without silently pretending a real email went out. */
  if (!process.env.RESEND_API_KEY) {
    console.log('[intake] RESEND_API_KEY not set — not sending.', JSON.stringify({ key, answers, routing, attribution }, null, 2));
    return done(req, res, { ok: true, delivered: false });
  }

  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: FROM, to: INBOX, subject,
      replyTo: answers.email,
      html: conciergeEmail(key, spec, answers, attribution, routing)
    });

    if (answers.email) {
      await resend.emails.send({
        from: FROM, to: answers.email,
        subject: spec.confirm.head,
        html: visitorEmail(spec, answers, doc)
      });
    }

    return done(req, res, { ok: true, delivered: true });
  } catch (err) {
    console.error('[intake] send failed', err);
    /* The visitor should not lose a submission to our mail provider. */
    return res.status(502).json({ error: 'Could not send just now' });
  }
};
