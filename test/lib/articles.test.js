import { describe, it, expect } from "vitest";
import { remark } from "remark";
import html from "remark-html";
import { getSortedPostsData, getAllPostIds, remarkNormalizeHeadings } from "../../lib/articles";

describe("getSortedPostsData", () => {
  const posts = getSortedPostsData();

  it("returns at least one post, sorted newest first", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("every post has the frontmatter fields every page/feed/metadata builder relies on", () => {
    for (const post of posts) {
      expect(post.id, `${post.id}: missing id`).toBeTruthy();
      expect(post.title, `${post.id}: missing title`).toBeTruthy();
      expect(post.date, `${post.id}: missing date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.cover, `${post.id}: missing cover`).toBeTruthy();
      expect(post.keywords, `${post.id}: missing keywords`).toBeTruthy();
      expect(post.author, `${post.id}: missing author`).toBeTruthy();
      expect(post.description, `${post.id}: missing description`).toBeTruthy();
    }
  });
});

describe("getAllPostIds", () => {
  it("returns one { params: { id } } entry per article, matching getSortedPostsData", () => {
    const ids = getAllPostIds().map(({ params }) => params.id).sort();
    const postIds = getSortedPostsData().map((post) => post.id).sort();
    expect(ids).toEqual(postIds);
  });
});

describe("remarkNormalizeHeadings", () => {
  async function render(markdown) {
    const file = await remark().use(remarkNormalizeHeadings).use(html).process(markdown);
    return file.toString();
  }

  it("promotes a top-level h3 to h2, and a nested h4 to h3, preserving relative depth", async () => {
    const out = await render("### Top\n\n#### Nested\n");
    expect(out).toContain("<h2>Top</h2>");
    expect(out).toContain("<h3>Nested</h3>");
  });

  it("leaves headings alone when the shallowest one is already h2", async () => {
    const out = await render("## Top\n\n### Nested\n");
    expect(out).toContain("<h2>Top</h2>");
    expect(out).toContain("<h3>Nested</h3>");
  });

  it("demotes a stray h1 in content so it never collides with the page's own <h1>", async () => {
    const out = await render("# Should not stay h1\n");
    expect(out).toContain("<h2>Should not stay h1</h2>");
  });
});
