import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const rootDirectory = path.join(process.cwd(), "");

export async function getReadMeData() {
  const fullPath = path.join(rootDirectory, `README.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    contentHtml,
    ...matterResult.data,
  };
}
