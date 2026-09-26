import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getSortedPostsData } from "../../lib/articles";
import generateRssFeed from "../../lib/rss";
import { buildPageMetadata } from "../../lib/seo";
import Link from "next/link";
import Date from "../../components/date";

export const metadata = buildPageMetadata();

export default async function Articles() {
  const allPostsData = getSortedPostsData();
  await generateRssFeed();

  const {
    preTitle, articleList, card, imgContainer, img, textContainer, articleTitle, articleDesc, articleKeys, articleKey, articleAuthor
  } = utilStyles;

  return (
    <Layout home>
      <span className={preTitle}>Articles</span>
      <section className={articleList}>
        {allPostsData.map(({ id, date, title, cover, author, description, keywords }, i) => (
          <div key={id} className={card}>
            <div className={imgContainer}>
              <div className={img}>
                <img loading="lazy" height="100%" width="100%" src={`/img/${cover}`} alt={title}></img>
              </div>
            </div>
            <div className={textContainer}>
              <Link href={`/articles/${id}`} className={articleTitle}>{title}</Link>
              <div className={articleDesc}>{description}</div>
              <div className={articleKeys}>
                {keywords.split(', ').map(e => <span key={e} className={articleKey}>{e}</span>)}
              </div>
              <div className={articleAuthor}><Link href="/bhar4t">{author + ", "}</Link>{<Date dateString={date} />}</div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
