import { getSortedPostsData } from "../lib/articles";
import { SITE_URL } from "../lib/seo";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "articles", changeFrequency: "weekly", priority: 0.9 },
  { path: "bhar4t", changeFrequency: "monthly", priority: 0.7 },
  { path: "packages", changeFrequency: "weekly", priority: 0.6 },
  { path: "resume", changeFrequency: "monthly", priority: 0.5 },
  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const articleEntries = getSortedPostsData().map(({ id, date }) => ({
    url: `${SITE_URL}/articles/${id}`,
    lastModified: new Date(date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries];
}
