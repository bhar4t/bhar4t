export const SITE_URL = "https://webkoof.in";
export const SITE_BRAND = "Webkoof.in";
export const AUTHOR_NAME = "Bharat Sahu";
export const TWITTER_HANDLE = "@bhar4t";
export const RSS_FEED_URL = `${SITE_URL}/rss/feed.xml`;

const DEFAULT_TITLE = "Webkoof.in";
const DEFAULT_OG_TITLE = "Webkoof.in | Code with Bharat Sahu | JavaScript, React, Next.js, Firebase, Node.js";
const DEFAULT_DESCRIPTION = "Hello, I'm Bharat Sahu, A Web App Developer, Here I want to share some coding stuff which I've learned while coding. I also trying to make these simpler so anybody can start with it.";
const DEFAULT_OG_DESCRIPTION = "Hello, I'm Bharat Sahu, Here I just want to share some coding stuff that I've learned while coding. I also trying to make everything simpler so anybody can start with it.";
const DEFAULT_KEYWORDS = "Webkoof, Webkoof.in, Bharat, Sahu, BHAR4T, JavaScript, JS, Node, NodeJS, Cordova, Firebase, Firestore, Java, HTML, CSS, Bootstrap, India, Bharat Lal Sahu, Raipur, Chhattisgarh, React, ReactJS, Programmer, Programming, Coding, web development tutorials, javascript interview questions, Bharat Sahu, Mats University, SmileBots, seizedbharat@gmail.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/bhar4t-fb.png`;

// Mirrors the per-page <Head> tags previously rendered by components/layout.js
export function buildPageMetadata({ title, description, keywords, cover, id, canonical } = {}) {
  const url = id ? `${SITE_URL}/articles/${id}` : `${SITE_URL}/${canonical || ""}`;
  const image = cover ? `${SITE_URL}/img/${cover}` : DEFAULT_IMAGE;
  const metaDescription = description || title || DEFAULT_DESCRIPTION;
  const ogDescription = description || title || DEFAULT_OG_DESCRIPTION;
  const isArticle = Boolean(id);

  return {
    title: title || DEFAULT_TITLE,
    description: metaDescription,
    keywords: keywords ? `${keywords}, Bharat, Sahu, BHAR4T, Webkoof, Webkoof.in,` : DEFAULT_KEYWORDS,
    // `types` is repeated per-page because a child's `alternates` fully replaces the parent's, not merges.
    alternates: { canonical: url, types: { "application/rss+xml": RSS_FEED_URL } },
    openGraph: {
      title: title || DEFAULT_OG_TITLE,
      siteName: SITE_BRAND,
      description: ogDescription,
      url,
      type: isArticle ? "article" : "website",
      images: [{ url: image, width: 1200, height: 630, alt: title || DEFAULT_TITLE }],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: title || DEFAULT_OG_TITLE,
      description: ogDescription,
      images: [image],
    },
  };
}
