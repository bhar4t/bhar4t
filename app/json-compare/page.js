import Layout from "../../components/layout";
import JsonCompare from "./JsonCompare";
import { buildPageMetadata } from "../../lib/seo";
import { sectionHeading } from "../../styles/utils.module.css";

export const metadata = buildPageMetadata({
  title: "JSON Compare",
  description: "Paste two JSON values side by side and instantly see every added, removed, or changed field.",
  canonical: "json-compare",
});

export default function JsonComparePage() {
  return (
    <Layout home>
      <JsonCompare />
    </Layout>
  );
}
