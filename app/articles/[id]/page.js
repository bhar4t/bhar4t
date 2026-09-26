import Layout from "../../../components/layout";
import { getAllPostIds, getPostData } from "../../../lib/articles";
import Date from "../../../components/date";
import { buildPageMetadata, SITE_URL } from "../../../lib/seo";
import { articleSchema, breadcrumbSchema } from "../../../lib/structuredData";
import utilStyles from "../../../styles/utils.module.css";

export async function generateStaticParams() {
  return getAllPostIds().map(({ params }) => params);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);
  return buildPageMetadata({
    title: postData.title,
    description: postData.description,
    cover: postData.cover,
    id: postData.id,
    keywords: postData.keywords,
  });
}

export default async function Article({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Articles", url: `${SITE_URL}/articles` },
    { name: postData.title, url: `${SITE_URL}/articles/${postData.id}` },
  ]);
  const article = articleSchema(postData);

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
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
