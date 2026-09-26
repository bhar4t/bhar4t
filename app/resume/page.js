import Layout from "../../components/layout";
import { buildPageMetadata } from "../../lib/seo";
import utilStyles from "../../styles/utils.module.css";

const styles = {
    height: '84vh'
}

export const metadata = buildPageMetadata({
  title: "Resume — Bharat Sahu",
  description: "Resume of Bharat Sahu, Senior Software Developer specializing in JavaScript, React, Next.js and Node.js.",
  canonical: "resume",
});

export default function Resume() {
    return (
        <Layout download>
            <h1 className={utilStyles.h1}>Resume — Bharat Sahu</h1>
            <div style={styles}>
                <iframe
                    height="100%"
                    width="100%"
                    title="Bharat Sahu, Resume"
                    src="https://docs.google.com/document/d/e/2PACX-1vQQnllFU0MUxgSf99v2a-VJOc6lsi0HjHoKLls1-aFHsf1pxz9IGmoNEvl6VHSCJmtluuP8OHMG0qXp/pub?embedded=true"
                >
                </iframe>
            </div>
        </Layout>
    )
}
