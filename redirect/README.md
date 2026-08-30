# BRA retirement redirects

Everything served at `burnoutrecoveryaccelerator.com` once its DNS points here.
No dependencies, one function, one map.

## Why it exists

Strikingly cannot serve a page-level 301 map, so the old domain has to point at
something that can. This is that something: a separate Vercel project whose only
job is to answer 97 old URLs correctly and then be forgotten about.

## The map

`redirects.js` is the single copy — the handler and the verifier both read it,
so what runs and what is checked cannot drift apart.

| | Count | What |
|---|---|---|
| **301** | 20 | Has a real equivalent on the new site |
| **410** | 31 | Genuinely gone: pandemic funnels, one-off workshops, the store, site debris |
| **302** | 46 | The blog. Temporary, and the reason cutover is not ready — see below |

Unknown paths also return 410. Redirecting the unknown to a homepage is how a
retired domain quietly becomes a few hundred soft 404s.

## Cutover is blocked, and the check enforces it

`verify.js` exits non-zero while the blog is unmapped. That is deliberate.

The sitemap has **46 blog posts** — the plan said sixteen — and they are the only
accumulated authority the old domain has. The moment DNS points here, Strikingly
stops serving and all 46 stop existing. They are 302 rather than 301 or 410 so
the URLs keep their identity until there is somewhere real to send them.

**Do not move the DNS until `/insights` exists on the new site.** Then map each
post to its new URL in `redirects.js` and promote them to 301.

## Deploying

1. New Vercel project from `github.com/n5vr8vprh6-cmd/Burnout-Concierge`
2. **Root Directory: `redirect`** — this is the setting that makes it a separate
   project from the main site in the same repo
3. Framework preset: Other. No build command, no output directory
4. Deploy, then verify against the preview URL before touching DNS:

   ```
   node verify.js https://<preview>.vercel.app
   ```

   It requests all 97 and checks the status and `Location` each one actually
   returns. A redirect map is the one thing that cannot be tested after it
   ships — by then the site it replaces is already gone.

5. Only then point `burnoutrecoveryaccelerator.com` at the project

Keep the domain renewing indefinitely. It is a redirect asset now, not a brand.

## Testing locally

```
node dev.js                          # http://127.0.0.1:4400
node verify.js http://127.0.0.1:4400  # in another shell
```

`dev.js` mimics what `vercel.json` does in production — every path to the one
function — so a pass locally means what a pass against a preview means.

## Notes on two decisions

**`/fsloscabos` and `/maxwellpv`** go to the Awaken and Transcend chapters. The
original plan flagged `/fsloscabos` as needing to avoid implying a Four Seasons
relationship; that relationship is now confirmed in writing and named on the
site, so the constraint is spent and the honest destination is the chapter that
names the property itself.

**`/` goes to `/transition`**, not to the homepage. It is the highest-traffic URL
on the old domain, and sending it somewhere that never mentions the change would
leave anyone who bookmarked BRA quietly disoriented. `/transition` is `noindex`
and should be retired roughly six months after cutover.
