import Layout from "../components/layout";
import { getReadMeData } from "../lib/articles";

export default function Home({ postData }) {
  return (
    <Layout home canonical="bhar4t" removeSocialLinks>
      <span style={{ color: 'gray', fontSize: 11, userSelect: 'none' }} >🐼 > github.com / bhar4t / README.md</span>
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
