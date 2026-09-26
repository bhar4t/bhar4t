import { SITE_URL, SITE_BRAND, AUTHOR_NAME } from "./seo";

const AUTHOR_SAME_AS = [
  "https://twitter.com/bhar4t",
  "https://github.com/bhar4t",
  "https://www.linkedin.com/in/bhar4t/",
  "https://www.instagram.com/bhar4t/",
  "https://bhar4t.medium.com/",
];

const LOGO_URL = `${SITE_URL}/images/android-icon-192x192.png`;

// Nestable Person fragment (no @context) — used as `author`/`publisher` inside other schemas
// and wrapped with @context by callers that render it as its own standalone JSON-LD block.
export function personSchema() {
  return {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    sameAs: AUTHOR_SAME_AS,
  };
}

// Rendered once in the root layout so every page carries site identity for search engines.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_BRAND,
    url: SITE_URL,
    inLanguage: "en",
    author: personSchema(),
    publisher: personSchema(),
  };
}

export function articleSchema({ title, description, id, cover, date, keywords }) {
  const url = `${SITE_URL}/articles/${id}`;
  const image = cover ? `${SITE_URL}/img/${cover}` : `${SITE_URL}/images/bhar4t-fb.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image,
    url,
    datePublished: date,
    dateModified: date,
    inLanguage: "en",
    keywords,
    author: personSchema(),
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: url,
    })),
  };
}
