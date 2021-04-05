import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/articles";
import generateRssFeed from "../lib/rss";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <span className={utilStyles.preTitle}>Articles</span>
      <br /><br />
      <br /><br />
      <br /><br />
      <section>
        {allPostsData.map(({ id, date, title, cover, author, description, keywords }, i) => (
          <Link href="/articles/[id]" as={`/articles/${id}`}>
          <div key={id} style={{ display: 'flex', flexWrap: 'wrap', lineHeight: 1.5, border: '1px solid #f5f0c2', borderRadius: 4, width: '100%', margin: '10px 0px', }}>
            <div style={{ flex: 2, display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
              <div style={{ height: 'auto', width: '30vh',padding: 2, objectFit: 'contain'  }}>
                <img loading="lazy" height="100%" width="100%" src={`/img/${cover}`} alt={title}></img>
              </div>
            </div>
            <div style={{ flex: 6, padding: 6 }}>
              <a style={{ padding: '6px 2px' }}>{title}</a>
              <div style={{ padding: '6px 4px', fontSize: 14 }}>{description}</div>
              <div style={{ fontSize: 11, padding: '6px 4px', margin: 2 }}>{keywords.split(', ').map(e => <span style={{ backgroundColor: '#d3bf00', borderRadius: 5, marginLeft: 4, padding: '3px 5px' }}>{e}</span>)}</div>
              <div style={{ padding: '6px 3px', color: '#d3bf00', fontSize: 14 }}><Link href="/bhar4t" as={`/bhar4t`}>{author + ", "}</Link>{<Date dateString={date} />}</div>
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
