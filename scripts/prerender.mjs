// ─── Static per-route <head> prerendering ─────────────────────────────────
//
// This site is a client-rendered React SPA hosted on GitHub Pages (no
// server, so no true SSR). Without this step, every route — /sites,
// /amenities, /contact — is served the *same* index.html, meaning:
//   - Crawlers/bots that don't execute JS (Bing, Facebook, Twitter/X,
//     LinkedIn, Slack link unfurlers) only ever see the homepage's title,
//     description, canonical URL, OG/Twitter tags and JSON-LD — never the
//     page-specific ones.
//   - Directly requesting /sites returns an HTTP 404 from GitHub Pages
//     (falls back to 404.html, which SPA-boots and client-renders the
//     right page — but only after a 404 status code, which search engines
//     treat as "this page doesn't exist").
//
// This script runs after `vite build` and writes a real dist/<route>/index.html
// for each public route, with the correct <title>, meta description, canonical
// link, OG/Twitter tags, and BreadcrumbList/FAQPage JSON-LD already baked in —
// sourced from the same src/seoConfig.js the live React app uses, so they can
// never drift apart. The React bundle still loads and hydrates normally for
// full interactivity (site map, availability, etc).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { pages, SITE_NAME, canonicalUrl } from '../src/seoConfig.js';
import { breadcrumbSchema, faqSchema } from '../src/lib/structuredData.js';
import { faq } from '../src/data/faq.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const PUBLIC_ROUTES = ['/', '/sites', '/amenities', '/contact'];

const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

function setMeta(html, attr, key, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&')}"\\s+content=")[^"]*("\\s*/?>)`);
  if (re.test(html)) return html.replace(re, `$1${escapeHtml(content)}$2`);
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${escapeHtml(content)}" />\n  </head>`);
}

function setCanonical(html, href) {
  return html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/, `$1${href}$2`);
}

// IDs must match what src/components/SEO.jsx looks for (data-seo-id) so that
// when React hydrates and its useEffect runs, it finds and updates these
// existing <script> tags in place instead of appending duplicates.
function injectJsonLd(html, idSchemaPairs) {
  const scripts = idSchemaPairs
    .map(([id, schema]) => `    <script type="application/ld+json" data-seo-id="${id}">${JSON.stringify(schema)}</script>`)
    .join('\n');
  return html.replace('</head>', `${scripts}\n  </head>`);
}

let count = 0;

for (const routePath of PUBLIC_ROUTES) {
  const meta = pages[routePath];
  const fullTitle = routePath === '/' ? meta.title : `${meta.title} | ${SITE_NAME}`;
  const url = canonicalUrl(routePath);

  let html = template;
  html = setTitle(html, fullTitle);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setCanonical(html, url);
  html = setMeta(html, 'property', 'og:title', fullTitle);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', fullTitle);
  html = setMeta(html, 'name', 'twitter:description', meta.description);

  const schemas = [];
  if (meta.breadcrumbs && meta.breadcrumbs.length > 1) {
    schemas.push(['ld-breadcrumbs', breadcrumbSchema(meta.breadcrumbs)]);
  }
  if (routePath === '/') {
    schemas.push(['ld-extra-0', faqSchema(faq)]);
  }
  if (schemas.length) html = injectJsonLd(html, schemas);

  const outDir = routePath === '/' ? distDir : path.join(distDir, routePath.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html);
  count++;
  console.log(`prerendered ${routePath} -> ${path.relative(distDir, path.join(outDir, 'index.html')) || 'index.html'}`);
}

console.log(`\nPrerendered ${count} routes with route-specific <head> metadata.`);
