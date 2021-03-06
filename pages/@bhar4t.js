import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/articles";
import Link from "next/link";

export default function Home({ allPostsData }) {
  return (
    <Layout home canonical="bhar4t">
      <span className={utilStyles.preTitle}>Hi, I'm</span>
      <h1 className={utilStyles.h1}>Bharat Sahu</h1>
      <section key="bhar4t">
        {allPostsData.map(({ id, date, title }) => (
          <>
            <h3 className={utilStyles.listItem} key={id}>
              <Link href="/articles/[id]" as={`/articles/${id}`}>
                <a>{title}</a>
              </Link>
            </h3>
            <br />
          </>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
