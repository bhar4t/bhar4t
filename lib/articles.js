import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "articles");

// Every page renders its own <h1>, so markdown content must start no higher than <h2>.
// This remaps whatever the shallowest heading in a given article is to <h2>, preserving
// relative nesting, instead of requiring every article's markdown to use consistent levels.
function remarkNormalizeHeadings() {
  return (tree) => {
    let minDepth = Infinity;
    visit(tree, "heading", (node) => {
      if (node.depth < minDepth) minDepth = node.depth;
    });
    if (!Number.isFinite(minDepth)) return;
    const offset = 2 - minDepth;
    if (offset === 0) return;
    visit(tree, "heading", (node) => {
      node.depth = Math.min(6, Math.max(2, node.depth + offset));
    });
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkNormalizeHeadings)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

// Getting README.MD which is already serving as GitHub profile.
export async function getReadMeData() {
  const fullPath = path.join(path.join(process.cwd(), ""), `README.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkNormalizeHeadings)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    contentHtml,
    ...matterResult.data,
  };
}