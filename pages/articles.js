import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/articles";
import generateRssFeed from "../lib/rss";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  const {
    preTitle, articleList, card, imgContainer, img, textContainer,  articleTitle,  articleDesc,  articleKeys,  articleKey, articleAuthor
  } = utilStyles;
  return (
    <Layout home>
      <span className={preTitle}>Articles</span>
      <section className={articleList}>
        {allPostsData.map(({ id, date, title, cover, author, description, keywords }, i) => (
          <Link href="/articles/[id]" as={`/articles/${id}`}>
          <div key={id} className={card}>
            <div className={imgContainer}>
              <div className={img}>
                <img loading="lazy" height="100%" width="100%" src={`/img/${cover}`} alt={title}></img>
              </div>
            </div>
            <div className={textContainer}>
              <a className={articleTitle}>{title}</a>
              <div className={articleDesc}>{description}</div>
              <div className={articleKeys}>
                {keywords.split(', ').map(e => <span className={articleKey}>{e}</span>)}</div>
              <div className={articleAuthor}><Link href="/bhar4t" as={`/bhar4t`}>{author + ", "}</Link>{<Date dateString={date} />}</div>
            </div>
          </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  await generateRssFeed();
  return {
    props: {
      allPostsData,
    },
  };
}
