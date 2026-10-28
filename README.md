# askfivestar.com

The FiveStar website: what FiveStar is, and its Privacy Policy, Terms of Service and data deletion page. The app
itself is at <https://askfivestar.ai> (repository fivestar-travel/fivestar).

Docusaurus 3 (TypeScript, `@docusaurus/faster`), no docs or blog plugin: every page is in `src/pages`.

```bash
npm ci
npm start              # dev server on http://localhost:3121
npm run build          # build/ (fails on a broken link or anchor), then scripts/check-site.mjs
npm run serve          # serve build/ on http://localhost:3121
npm run typecheck
```

Rules the build or review holds:

- Brand (fivestar repo, docs/brand/README.md): no gradients anywhere; Playfair Display for headings and the wordmark,
  Inter for text (self-hosted through @fontsource, no font CDN); coral fills carry Midnight text; on a dark ground use
  `mark-on-dark.svg`. Light and dark mode both.
- American spelling. No invented testimonials, user counts, press or reviews.
- Phones: nothing wider than the screen, no clipped menus. Docusaurus wraps every markdown `<table>` in a scroller
  that clips on a phone, so these pages use lists instead.
- `future.v4` is on, so a custom heading id is written `{/* #id */}`, not `{#id}`.
- The policy URLs are registered with the sign-in providers: keep `/privacy`, `/terms`, `/data-deletion`.

Hosting and the one-time setup: [docs/hosting.md](docs/hosting.md).
