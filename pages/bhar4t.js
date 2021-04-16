import Layout from "../components/layout";
import { getReadMeData } from "../lib/articles";
import utilStyles from "../styles/utils.module.css";

export default function Home({ postData }) {
  return (
    <Layout home canonical="bhar4t" removeSocialLinks>
      <span className={utilStyles.git}>🐼 > github.com / bhar4t / README.md</span>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await getReadMeData();
  return {
    props: {
      postData,
    },
  };
}
