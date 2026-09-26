import { describe, it, expect } from "vitest";
import { buildPageMetadata, SITE_URL, RSS_FEED_URL } from "../../lib/seo";

describe("buildPageMetadata", () => {
  it("falls back to site-wide defaults when called with no args", () => {
    const metadata = buildPageMetadata();
    expect(metadata.title).toBe("Webkoof.in");
    expect(metadata.alternates.canonical).toBe(`${SITE_URL}/`);
    expect(metadata.openGraph.type).toBe("website");
  });

  it("uses a canonical path for non-article pages", () => {
    const metadata = buildPageMetadata({ canonical: "packages" });
    expect(metadata.alternates.canonical).toBe(`${SITE_URL}/packages`);
  });

  it("builds an article URL and marks og:type as article when id is set", () => {
    const metadata = buildPageMetadata({ title: "My Post", id: "my-post" });
    expect(metadata.alternates.canonical).toBe(`${SITE_URL}/articles/my-post`);
    expect(metadata.openGraph.url).toBe(`${SITE_URL}/articles/my-post`);
    expect(metadata.openGraph.type).toBe("article");
  });

  it("prefers an explicit description over reusing the title", () => {
    const metadata = buildPageMetadata({ title: "My Post", description: "A real description" });
    expect(metadata.description).toBe("A real description");
    expect(metadata.openGraph.description).toBe("A real description");
  });

  it("resolves the cover image relative to /img and falls back otherwise", () => {
    const withCover = buildPageMetadata({ cover: "hoisting.png" });
    expect(withCover.openGraph.images[0].url).toBe(`${SITE_URL}/img/hoisting.png`);

    const withoutCover = buildPageMetadata();
    expect(withoutCover.openGraph.images[0].url).toBe(`${SITE_URL}/images/bhar4t-fb.png`);
  });

  it("appends brand keywords to any custom keywords, and falls back to defaults otherwise", () => {
    const withKeywords = buildPageMetadata({ keywords: "javascript, hoisting" });
    expect(withKeywords.keywords).toContain("javascript, hoisting");
    expect(withKeywords.keywords).toContain("Webkoof.in");

    const withoutKeywords = buildPageMetadata();
    expect(withoutKeywords.keywords).toContain("Webkoof.in");
  });

  it("always includes RSS autodiscovery, since a child's alternates fully replaces the parent's", () => {
    const metadata = buildPageMetadata({ title: "Anything" });
    expect(metadata.alternates.types["application/rss+xml"]).toBe(RSS_FEED_URL);
  });
});
