import Layout from "../components/layout";
import { getReadMeData } from "../lib/readme";

export default function Home({ postData }) {
  return (
    <Layout home canonical="bhar4t" removeSocialLinks>
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
