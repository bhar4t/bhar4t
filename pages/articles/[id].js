import Layout from "../../components/layout";
import Disqus from "../../components/Discus";
import { getAllPostIds, getPostData } from "../../lib/articles";
import Date from "../../components/date";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

// export const config = { amp: 'hybrid' };

export default function Article({ postData }) {
  return (
    <Layout title={postData.title} cover={postData.cover} id={postData.id} keywords={postData.keywords}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Disqus post={postData} />
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
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
