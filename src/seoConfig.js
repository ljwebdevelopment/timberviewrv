// ─── Single source of truth for site-wide + per-route SEO metadata ───────────
// Consumed by:
//   - src/components/SEO.jsx (runtime <head> updates while the SPA is running)
//   - scripts/prerender.mjs   (bakes the same metadata into static HTML per
//     route at build time, so crawlers/social bots that don't execute JS —
//     Bing, Facebook, Twitter/X, LinkedIn, Slack unfurlers — see correct,
//     route-specific tags instead of only the homepage's.)
//
// Keeping this as a plain, framework-free data file means the Node build
// script can import it directly without needing a browser to render React.

export const SITE_URL = 'https://timberviewrvpark.com';
export const SITE_NAME = 'Timber View RV Park';
export const PHONE_DISPLAY = '(918) 457-7224';
export const PHONE_TEL = '+19184577224';
export const ADDRESS = {
  street: '17611 S Rocky Top Ln',
  city: 'Tahlequah',
  region: 'OK',
  postalCode: '74464',
  country: 'US',
};
export const DEFAULT_IMAGE = `${SITE_URL}/Assets/outsideTVRV.webp`;

export const pages = {
  '/': {
    title: `${SITE_NAME} – Tahlequah, Oklahoma`,
    description:
      'Quiet, family-run RV park 2 miles east of Tahlequah, Oklahoma on Hwy 62. Full water & electric hookups, Wi-Fi, pet-friendly. Daily, weekly & monthly stays — call (918) 457-7224.',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  '/sites': {
    title: 'RV Sites & Availability',
    description:
      'View all 20 full hookup RV sites at Timber View RV Park on our interactive map. Check real-time availability for daily, weekly, and monthly RV sites in Tahlequah, Oklahoma.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'RV Sites', path: '/sites' },
    ],
  },
  '/amenities': {
    title: 'Amenities',
    description:
      'Full water & electric hookups, Wi-Fi, pet-friendly sites, and a quiet Cherokee County setting. Explore the full hookup RV park amenities at Timber View RV Park in Tahlequah, Oklahoma.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Amenities', path: '/amenities' },
    ],
  },
  '/contact': {
    title: 'Contact & Directions',
    description:
      "Get in touch with Timber View RV Park. Located at 17611 S Rocky Top Ln, Tahlequah, OK — 2 miles east of town on Hwy 62. Call (918) 457-7224.",
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  '/owner': {
    title: 'Owner Panel',
    description: 'Owner admin panel.',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist. Return to Timber View RV Park's homepage.",
    noindex: true,
    breadcrumbs: [],
  },
};

export function getPageMeta(path) {
  return pages[path] ?? pages['/'];
}

// GitHub Pages 301-redirects extensionless directory paths ("/sites") to
// their trailing-slash form ("/sites/") before serving dist/sites/index.html.
// Canonical/OG/sitemap URLs must point at that final, non-redirecting URL —
// pointing canonical at a URL that itself redirects elsewhere is an SEO
// anti-pattern. Internal <Link>/<Route> paths stay without the trailing
// slash (React Router matches both forms) — only externally-facing URLs
// need this.
export function canonicalUrl(path) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}/`;
}
