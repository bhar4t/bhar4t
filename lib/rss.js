import { Feed } from 'feed';
import fs from 'fs';
import { getSortedPostsData } from './articles';

const baseUrl = "https://bhar4t.com";

export default async function generateRssFeed() {
    
  if (process.env.NODE_ENV === 'development') return;

  const date = new Date();

  const author = {
      name: "Bharat Sahu",
      email: "bhar4t@outlook.com",
      link: "https://twitter.com/bhar4t",
  };

  const feed = new Feed({
  title: `Bharat Sahu | BHAR4T`,
  description: "Code with Bharat Sahu!",
  id: baseUrl,
  link: baseUrl,
  language: "en",
  image: `${baseUrl}/images/link-2.svg`, // need to be changed.
  favicon: `${baseUrl}/favicon.ico`,
  copyright: `All rights reserved ${date.getFullYear()}, Bharat Sahu`,
  updated: date,
  generator: "Bharat Sahu using Feed for NextJS Blog",
  feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
  },
  author,
  });

  const posts = await getSortedPostsData();

  posts.forEach((post) => {
      const url = `${baseUrl}/articles/${post.id}`;
      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.title,
        content: post.title, // markdown.toHTML(post.title),
        author: [author],
        contributor: [author],
        date: new Date(post.date)
      });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}