import Layout from "../../components/layout";
import { getReadMeData } from "../../lib/articles";
import { buildPageMetadata } from "../../lib/seo";
import utilStyles from "../../styles/utils.module.css";

export const metadata = buildPageMetadata({ canonical: "bhar4t" });

export default async function Bhar4t() {
  const postData = await getReadMeData();

  return (
    <Layout home>
      <span className={utilStyles.git}>🐝 {'>'} github.com / bhar4t / README.md</span>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
