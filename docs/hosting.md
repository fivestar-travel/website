# Hosting askfivestar.com

The site is static (Docusaurus, `npm run build` writes `build/`). It is hosted on **Cloudflare Pages**, not GitHub
Pages: the `fivestar-travel` organization is on GitHub's Free plan, where Pages cannot serve a private repository.
askfivestar.com's DNS is already at Cloudflare.

`.github/workflows/deploy.yml` builds every push and pull request, and on `main` deploys `build/` to the Pages project
`askfivestar` with `cloudflare/wrangler-action`. Until both secrets below exist, the deploy step is skipped with a
notice and the run stays green.

## What Nick does, once

1. **Create the Pages project** (Direct Upload, not Git-connected, so the workflow stays the only deployer):
   Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets** → project name
   `askfivestar`, production branch `main`. Upload nothing (or any placeholder folder); the workflow uploads the site.
   Or from a terminal logged in with `npx wrangler login`:
   `npx wrangler pages project create askfivestar --production-branch=main`.
2. **Create an API token**: **My Profile** → **API Tokens** → **Create Token** → **Custom token**, permission
   **Account → Cloudflare Pages → Edit**, scoped to the Lucenia account only. Copy it.
3. **Add two repository secrets** at github.com/fivestar-travel/website → **Settings** → **Secrets and variables** →
   **Actions** → **New repository secret**:
   - `CLOUDFLARE_API_TOKEN`: the token from step 2.
   - `CLOUDFLARE_ACCOUNT_ID`: the account id (dashboard → **Workers & Pages** → right-hand sidebar, or any zone's
     overview page → **API** → **Account ID**).
   Then re-run the latest `Build and deploy` run on `main` (or push to `main`). The run's deploy step prints the
   `*.askfivestar.pages.dev` URL.
4. **Attach the custom domains**: Pages project `askfivestar` → **Custom domains** → **Set up a custom domain** →
   `askfivestar.com`, then again for `www.askfivestar.com`. Because the zone is on the same Cloudflare account,
   Cloudflare adds the DNS records itself. If `askfivestar.com` or `www` already has an A/AAAA/CNAME record (for
   example the redirect to askfivestar.ai that the app's `deploy/fivestar.yaml` ingress `fivestar-com-redirect`
   serves), Cloudflare asks to replace it: that redirect must go for the site to be served. Optional: a Redirect
   Rule sending `www.askfivestar.com/*` to `https://askfivestar.com/${1}` (301) so there is one canonical host.
5. **Google Search Console** (needed for the OAuth app's authorized domains and the homepage review): at
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
