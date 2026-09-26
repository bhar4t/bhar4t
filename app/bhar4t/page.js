import Layout from "../../components/layout";
import { getReadMeData } from "../../lib/articles";
import { buildPageMetadata } from "../../lib/seo";
import { personSchema } from "../../lib/structuredData";
import utilStyles from "../../styles/utils.module.css";

export const metadata = buildPageMetadata({
  title: "Bharat Sahu (@bhar4t)",
  description: "Bharat Sahu (@bhar4t) — Senior Software Developer building with JavaScript, React, Next.js and Node.js. Author of Webkoof.in.",
  canonical: "bhar4t",
});

export default async function Bhar4t() {
  const postData = await getReadMeData();
  const person = { "@context": "https://schema.org", ...personSchema() };

  return (
    <Layout home>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <h1 className={utilStyles.h1}>Bharat Sahu (@bhar4t)</h1>
      <span className={utilStyles.git}>🐝 {'>'} github.com / bhar4t / README.md</span>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
