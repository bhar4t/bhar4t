import { describe, it, expect } from "vitest";
import { personSchema, websiteSchema, articleSchema, breadcrumbSchema } from "../../lib/structuredData";
import { SITE_URL, SITE_BRAND, AUTHOR_NAME } from "../../lib/seo";

describe("personSchema", () => {
  it("is a nestable fragment without its own @context", () => {
    const person = personSchema();
    expect(person["@context"]).toBeUndefined();
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe(AUTHOR_NAME);
    expect(person.sameAs).toEqual(expect.arrayContaining(["https://github.com/bhar4t"]));
  });
});

describe("websiteSchema", () => {
  it("identifies the site and nests author/publisher", () => {
    const site = websiteSchema();
    expect(site["@type"]).toBe("WebSite");
    expect(site.name).toBe(SITE_BRAND);
    expect(site.url).toBe(SITE_URL);
    expect(site.author["@type"]).toBe("Person");
  });
});

describe("articleSchema", () => {
  it("builds a BlogPosting with the article's own URL and image", () => {
    const article = articleSchema({
      title: "Hoisting in JavaScript",
      description: "About hoisting",
      id: "hoisting-in-JavaScript",
      cover: "hoisting.png",
      date: "2021-04-05",
      keywords: "javascript, hoisting",
    });

    expect(article["@type"]).toBe("BlogPosting");
    expect(article.url).toBe(`${SITE_URL}/articles/hoisting-in-JavaScript`);
    expect(article.image).toBe(`${SITE_URL}/img/hoisting.png`);
    expect(article.headline).toBe("Hoisting in JavaScript");
    expect(article.datePublished).toBe("2021-04-05");
    expect(article.publisher.name).toBe(SITE_BRAND);
  });

  it("falls back to the default share image when no cover is given", () => {
    const article = articleSchema({ id: "no-cover" });
    expect(article.image).toBe(`${SITE_URL}/images/bhar4t-fb.png`);
  });
});

describe("breadcrumbSchema", () => {
  it("numbers items sequentially starting at 1", () => {
    const breadcrumb = breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Articles", url: `${SITE_URL}/articles` },
    ]);

    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    });
    expect(breadcrumb.itemListElement[1].position).toBe(2);
  });
});
