import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/articles";
import generateRssFeed from "../lib/rss";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <span className={utilStyles.preTitle}>Code with</span>
      <h1 className={utilStyles.h1}>Bharat Sahu</h1>
      <section key="home">
        {allPostsData.map(({ id, date, title }, i) => (
          <div key={id}>
            <h3 className={utilStyles.listItem}>
              <Link href="/articles/[id]" as={`/articles/${id}`}>
                <a>{title}</a>
              </Link>
            </h3>

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

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  await generateRssFeed();
  return {
    props: {
      allPostsData,
    },
  };
}
