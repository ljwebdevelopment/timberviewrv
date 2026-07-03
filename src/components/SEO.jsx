import { useEffect } from 'react';
import { SITE_NAME, DEFAULT_IMAGE, getPageMeta, canonicalUrl } from '../seoConfig';
import { breadcrumbSchema } from '../lib/structuredData';

/**
 * Drives <head> metadata for the current route. Title/description/breadcrumbs
 * default to src/seoConfig.js so runtime tags always match what
 * scripts/prerender.mjs bakes into the static HTML for that same route —
 * pass overrides only when a page needs something the config doesn't cover.
 */
export default function SEO({ path = '/', image = DEFAULT_IMAGE, title, description, jsonLd, breadcrumbs }) {
  const meta = getPageMeta(path);
  const resolvedTitle = title ?? meta.title;
  const resolvedDescription = description ?? meta.description;
  const resolvedBreadcrumbs = breadcrumbs ?? meta.breadcrumbs;
  const noindex = meta.noindex ?? false;

  useEffect(() => {
    const fullTitle = path === '/' ? resolvedTitle : `${resolvedTitle} | ${SITE_NAME}`;
    const url = canonicalUrl(path);

    document.title = fullTitle;

    setMeta('name', 'description', resolvedDescription);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', resolvedDescription);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);

    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', resolvedDescription);
    setMeta('name', 'twitter:image', image);

    const schemas = [];
    if (resolvedBreadcrumbs && resolvedBreadcrumbs.length > 1) {
      schemas.push(['ld-breadcrumbs', breadcrumbSchema(resolvedBreadcrumbs)]);
    }
    if (jsonLd) {
      const extra = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      extra.forEach((schema, i) => schemas.push([`ld-extra-${i}`, schema]));
    }
    setJsonLd(schemas);

    return () => clearJsonLd(schemas.map(([id]) => id));
  }, [path, resolvedTitle, resolvedDescription, image, noindex, jsonLd, resolvedBreadcrumbs]);

  return null;
}

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(schemas) {
  schemas.forEach(([id, data]) => {
    let el = document.head.querySelector(`script[data-seo-id="${id}"]`);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-seo-id', id);
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  });
}

function clearJsonLd(ids) {
  ids.forEach(id => {
    document.head.querySelector(`script[data-seo-id="${id}"]`)?.remove();
  });
}
