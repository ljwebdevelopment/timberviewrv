// Pure JSON-LD builders — no React, no DOM. Safe to import from both the
// browser bundle (src/components/SEO.jsx) and the Node prerender script
// (scripts/prerender.mjs).

import { SITE_URL, SITE_NAME, PHONE_TEL, ADDRESS, DEFAULT_IMAGE, canonicalUrl } from '../seoConfig.js';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/TimberviewRVlogo.png`,
    telephone: PHONE_TEL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

// Campground doubles as the LocalBusiness / RVPark record (schema.org has no
// distinct "RVPark" type — Campground, a LodgingBusiness subtype, is the
// correct and most widely-supported type for RV parks & campgrounds, and is
// what Google's rich-result docs recommend for this business category).
export function campgroundSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Campground', 'LodgingBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    telephone: PHONE_TEL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Tahlequah, Oklahoma' },
      { '@type': 'AdministrativeArea', name: 'Cherokee County, Oklahoma' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '20:00',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Water & Electric Hookups', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Full Hookup RV Sites', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pets Allowed', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Long-Term / Monthly Stays', value: true },
    ],
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
