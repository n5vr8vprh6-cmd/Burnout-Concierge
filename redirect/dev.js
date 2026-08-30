/* ============================================================================
   dev.js — run the handler locally so the map can be tested before it is live
   ----------------------------------------------------------------------------
   Run:  node dev.js            then, in another shell:
         node verify.js http://127.0.0.1:4400

   A redirect map is the one thing that cannot be tested after it ships: by the
   time the DNS has moved, the site it replaces is already gone and there is no
   way back to compare against. So it gets tested here, and again against a
   Vercel preview URL, and only then does the domain move.

   This mimics what vercel.json does in production — every request, whatever the
   path, goes to the one function — so a pass here means the same thing a pass
   against a preview deployment means.
   ========================================================================== */
'use strict';

const http = require('http');
const handler = require('./api/index.js');

const PORT = Number(process.argv[2]) || 4400;

http.createServer((req, res) => {
  /* Vercel's res has .status(); node's does not. Same shim the runtime adds. */
  res.status = (code) => { res.statusCode = code; return res; };
  handler(req, res);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`\n  BRA redirect map on http://127.0.0.1:${PORT}`);
  console.log(`  verify with:  node verify.js http://127.0.0.1:${PORT}\n`);
});
