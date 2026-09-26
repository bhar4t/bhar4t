import Layout from "../../../components/layout";
import { getAllPostIds, getPostData } from "../../../lib/articles";
import Date from "../../../components/date";
import { buildPageMetadata } from "../../../lib/seo";
import utilStyles from "../../../styles/utils.module.css";

export async function generateStaticParams() {
  return getAllPostIds().map(({ params }) => params);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);
  return buildPageMetadata({
    title: postData.title,
    cover: postData.cover,
    id: postData.id,
    keywords: postData.keywords,
  });
}

export default async function Article({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);

  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
