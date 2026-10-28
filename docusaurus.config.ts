import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// askfivestar.com is the public face of FiveStar: what it is, and the policies the sign-in
// providers' reviewers (Google, Microsoft, Amazon, Meta) read. The app itself lives at askfivestar.ai.
const SITE = 'https://askfivestar.com';
const APP = 'https://askfivestar.ai';
const DESCRIPTION =
  'FiveStar is a personal AI travel concierge: ask in plain words, see the answer on a map, plan trips, and let it learn how you like to travel.';

const config: Config = {
  title: 'FiveStar',
  tagline: 'Your personal AI concierge',
  favicon: 'img/favicon.svg',

  // v4 turns off `{#id}` heading ids: write `{/* #id */}` instead.
  future: {v4: true, faster: true},

  url: SITE,
  baseUrl: '/',
  organizationName: 'fivestar-travel',
  projectName: 'website',
  trailingSlash: false,

  // These pages are linked from OAuth consent screens: a dead link is worse than a failed build.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},

  i18n: {defaultLocale: 'en', locales: ['en'], localeConfigs: {en: {htmlLang: 'en-US'}}},

  headTags: [
    {tagName: 'meta', attributes: {property: 'og:type', content: 'website'}},
    {tagName: 'meta', attributes: {property: 'og:site_name', content: 'FiveStar'}},
    {tagName: 'meta', attributes: {name: 'twitter:card', content: 'summary_large_image'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png'}},
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'FiveStar',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web',
        description: DESCRIPTION,
        url: APP,
        publisher: {'@type': 'Organization', name: 'FiveStar', email: 'support@askfivestar.com'},
      }),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'monthly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {name: 'description', content: DESCRIPTION},
      {name: 'theme-color', content: '#F8FAFC', media: '(prefers-color-scheme: light)'},
      {name: 'theme-color', content: '#0F172A', media: '(prefers-color-scheme: dark)'},
    ],
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      title: 'FiveStar',
      logo: {alt: 'FiveStar', src: 'img/mark.svg', srcDark: 'img/mark-on-dark.svg', width: 30, height: 30},
      items: [
        {to: '/help', label: 'Help', position: 'left'},
        {to: '/privacy', label: 'Privacy', position: 'left'},
        {href: APP, label: 'Open FiveStar', position: 'right', className: 'navbar-cta'},
      ],
    },
    footer: {
      style: 'dark',
      logo: {alt: 'FiveStar', src: 'img/mark-on-dark.svg', width: 36, height: 36, href: '/'},
      links: [
        {
          title: 'FiveStar',
          items: [
            {label: 'Open FiveStar', href: APP},
            {label: 'Help and questions', to: '/help'},
          ],
        },
        {
          title: 'Your data',
          items: [
            {label: 'Privacy Policy', to: '/privacy'},
            {label: 'Terms of Service', to: '/terms'},
            {label: 'Delete your data', to: '/data-deletion'},
          ],
        },
        {
          title: 'Contact',
          items: [{label: 'support@askfivestar.com', href: 'mailto:support@askfivestar.com'}],
        },
      ],
      copyright: `© ${new Date().getFullYear()} FiveStar`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
