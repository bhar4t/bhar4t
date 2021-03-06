import Layout from "../components/layout";
import { getAllPostIds, getReadMeData } from "../lib/readme";

export default function Home({ postData }) {
  return (
    <Layout home canonical="bhar4t" removeSocialLinks>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getReadMeData("README");
  return {
    props: {
      postData,
    },
  };
}
