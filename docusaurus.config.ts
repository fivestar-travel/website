import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themeScript} from './src/lib/sun';

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

  // Light or dark by the sun, like the app (src/lib/sun.ts): decided before the first paint by this script, which
  // runs after Docusaurus's own color-mode script (a site plugin's tags come after the theme's), so its word is final.
  plugins: [
    () => ({
      name: 'fivestar-sun-theme',
      injectHtmlTags: () => ({preBodyTags: [{tagName: 'script', innerHTML: themeScript()}]}),
    }),
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
    // The theme control is ours (src/components/ThemeMode.tsx: Auto by the sun, Light, Dark), not Docusaurus's switch.
    colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
    navbar: {
      // The logo is the whole lockup (the pin and the five/STAR wordmark), so the bar carries no separate title.
      logo: {alt: 'FiveStar', src: 'img/logo-horizontal-transparent.svg', srcDark: 'img/logo-dark-transparent.svg', width: 141, height: 42},
      items: [
        {to: '/help', label: 'Help', position: 'left'},
        {to: '/privacy', label: 'Privacy', position: 'left'},
        {to: '/developers', label: 'Developers', position: 'left'},
        {type: 'custom-themeMode', position: 'right'},
        {href: APP, label: 'Ask FiveStar', position: 'right', className: 'navbar-cta'},
      ],
    },
    footer: {
      style: 'dark',
      logo: {alt: 'FiveStar', src: 'img/mark-on-dark.svg', width: 28, height: 36, href: '/'},
      links: [
        {
          title: 'FiveStar',
          items: [
            {label: 'Ask FiveStar', href: APP},
            {label: 'Help and questions', to: '/help'},
            {label: 'Connect your AI app', to: '/developers'},
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
      copyright: `© ${new Date().getFullYear()} FiveStar. Made for wandering, snacking and getting a little lost on purpose.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
