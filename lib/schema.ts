/*
 * Structured data (JSON-LD) for search engines and AI crawlers.
 *
 * Everything the site says about itself in schema must already be true on
 * the page: the company details match the footer, the socials are the same
 * array the footer renders, and the FAQ entries are the ones the homepage
 * shows. Nothing here is a separate copy to keep in sync by hand.
 *
 * Prices are deliberately absent. Package pricing is client-approved copy
 * that changes with the offer spec, and a stale price surfacing in a search
 * result is a commercial and compliance problem the pages themselves do not
 * have. Services are described, not quoted.
 */

import { SOCIALS } from "@/components/sections/Footer";

export const SITE_URL = "https://joshvantage.com";

/* Stable node ids so every page's graph points at one organisation rather
   than declaring a new one. */
export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Josh Vantage Consulting Group",
  legalName: "Josh Vantage Consulting Group Ltd",
  alternateName: "Josh Vantage",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  image: `${SITE_URL}/og.jpg`,
  description:
    "Consultancy, training and business support for people launching UK care businesses, established care providers pursuing tenders and professionals developing towards Registered Manager leadership.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "863 High Road",
    addressLocality: "Ilford",
    postalCode: "IG3 8TG",
    addressCountry: "GB",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Company number",
    value: "15931129",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  founder: {
    "@type": "Person",
    name: "Josh",
    jobTitle: "Founder and Principal Consultant",
  },
  knowsAbout: [
    "CQC registration",
    "Care Quality Commission compliance",
    "Health and social care tenders",
    "Care business start-up",
    "Registered Manager leadership development",
  ],
  sameAs: SOCIALS.map((s) => s.href).filter((href) => href.startsWith("http")),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Josh Vantage Consulting Group",
  inLanguage: "en-GB",
  publisher: { "@id": ORG_ID },
};

/* One funnel offering. `path` doubles as the node id, so a page's service and
   its breadcrumb agree on the URL. */
export function serviceSchema({
  path,
  name,
  serviceType,
  description,
  audience,
}: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  audience: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    url: `${SITE_URL}${path}`,
    name,
    serviceType,
    description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    audience: { "@type": "Audience", audienceType: audience },
  };
}

/* Home is always the first crumb; pass the rest of the trail in order. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      }),
    ),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
