import React from "react";
import ReactMarkdown from "react-markdown";
import PrivacyPolicy from "../contents/privacy-policy.md";
import Layout from "../layouts/Layout";

export default function PrivacyPolicyContainer(props) {
  const [privacyPolicy, setPrivacyPolicy] = React.useState("");

  React.useEffect(() => {
    fetch(PrivacyPolicy)
      .then((response) => response.text())
      .then((markdown) => {
        setPrivacyPolicy(markdown);
      });
  }, []);

  return (
    <Layout {...props}>
      <ReactMarkdown escapeHtml={false} source={privacyPolicy} />
    </Layout>
  );
}
