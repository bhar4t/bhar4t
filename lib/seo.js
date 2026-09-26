const SITE_URL = "https://webkoof.in";

const DEFAULT_TITLE = "Webkoof";
const DEFAULT_OG_TITLE = "Webkoof | Tools | Notes | Packages";
const DEFAULT_DESCRIPTION = "Hello, I'm Bharat Sahu, A Web App Developer, Here I want to share some coding stuff which I've learned while coding. I also trying to make these simpler so anybody can start with it.";
const DEFAULT_OG_DESCRIPTION = "Hello, I'm Bharat Sahu, Here I just want to share some coding stuff that I've learned while coding. I also trying to make everything simpler so anybody can start with it.";
const DEFAULT_KEYWORDS = "Bharat, Sahu, BHAR4T, JavaScript, JS, Node, NodeJS, Cordova, Firebase, Firestore, Java, HTML, CSS, Bootstrap, India, Bharat Lal Sahu, Raipur, Chhattisgarh, React, ReactJS, Programmer, Programming, Coding, Bharat Sahu, Mats University, SmileBots, 9589183373, seizedbharat@gmail.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/bhar4t-fb.png`;

// Mirrors the per-page <Head> tags previously rendered by components/layout.js
export function buildPageMetadata({ title, keywords, cover, id, canonical } = {}) {
  const url = id ? `${SITE_URL}/articles/${id}` : `${SITE_URL}/${canonical || ""}`;
  const image = cover ? `${SITE_URL}/img/${cover}` : DEFAULT_IMAGE;

  return {
    title: title || DEFAULT_TITLE,
    description: title || DEFAULT_DESCRIPTION,
    keywords: keywords ? `${keywords}, Bharat, Sahu, BHAR4T,` : DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title: title || DEFAULT_OG_TITLE,
      siteName: title || DEFAULT_TITLE,
      description: title || DEFAULT_OG_DESCRIPTION,
      url,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary",
      site: "@bhar4t",
      title: title || DEFAULT_OG_TITLE,
      description: title || DEFAULT_OG_DESCRIPTION,
    },
  };
}
