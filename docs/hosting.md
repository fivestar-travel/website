# Hosting askfivestar.com

The site is static (Docusaurus, `npm run build` writes `build/`). It is hosted on **GitHub Pages** from this
(public) repository, like dealdesk.studio. `.github/workflows/deploy.yml` builds every push and pull request and
deploys `main`. The custom domain comes from `static/CNAME` (`askfivestar.com`).

## What Nick does, once

1. **DNS at Cloudflare** (zone askfivestar.com), all **DNS only** (grey cloud), replacing the records that point at
   the cluster's redirect today:
   - apex `askfivestar.com`: A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and optionally AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
   - `www`: CNAME `fivestar-travel.github.io`
2. **Enforce HTTPS** in the repo's **Settings → Pages** once GitHub has issued the certificate (a few minutes after
   DNS resolves).
3. **Retire the redirect**: remove the `fivestar-com-redirect` ingress (and its `fivestar-com-tls` certificate) from
   `deploy/fivestar.yaml` in the app repo and the cluster, or cert-manager keeps failing to renew it.
4. **Google Search Console** (needed for the OAuth app's authorized domains and the homepage review): at
   <https://search.google.com/search-console> add a **Domain** property for `askfivestar.com` and another for
   `askfivestar.ai`, signed in as the Google account that owns the `askfivestar` Cloud project (or add that account as
   an owner afterwards). Each gives a `google-site-verification=...` TXT record: add it at the apex of the zone in
   Cloudflare DNS and press **Verify**. Then in the Google Auth Platform → **Branding** the two domains can be
   listed as authorized domains.

## After that

Every merge to `main` deploys. Pull requests build (and fail on a broken link, a gradient, British spelling or a
missing policy page) but do not deploy. To check a change locally:

```bash
npm ci
npm run build          # also runs scripts/check-site.mjs
npm run serve          # http://localhost:3121
```

## Before changing the policies

`/privacy`, `/terms` and `/data-deletion` are the URLs registered with Google, Microsoft, Amazon and Meta. Keep the
paths. The privacy policy describes what the app's code does (apps/fivestar in fivestar-travel/fivestar): when the
app changes what it collects, update the policy in the same week and bump its "Last updated" date.
