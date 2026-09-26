import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/articles";
import generateRssFeed from "../lib/rss";
import { buildPageMetadata } from "../lib/seo";
import Date from "../components/date";

export const metadata = buildPageMetadata();

export default async function Home() {
  const allPostsData = getSortedPostsData();
  await generateRssFeed();

  return (
    <Layout home>
      <SpeedInsights />
      <span className={utilStyles.preTitle}>{process.env.PRE_TITLE}</span>
      <h1 className={utilStyles.h1}>{process.env.TITLE}</h1>
      <section key="home">
        {allPostsData.map(({ id, date, title }, i) => (
          <div key={id}>
            <h2 className={utilStyles.listItem}>
              <Link href={`/articles/${id}`}>{title}</Link>
            </h2>
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            <br />
          </div>
        ))}
      </section>
    </Layout>
  );
}
