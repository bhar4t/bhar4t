import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layouts/Layout";
import CodeBlock from "../components/CodeBlock";
import Index from "../contents/index.md";
// import Grid from "./Grid";

function Main(props) {
  const [md, setMd] = React.useState("");
  // const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    // setLoader(true);
    fetch(Index)
      .then((response) => response.text())
      .then((text) => {
        setMd(text);
        // setLoader(false);
      });
  }, []);

  return (
    <Layout {...props} social>
      <span className="pre-title">Code with</span>
      <h1>Bharat Sahu</h1>
      <ReactMarkdown
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        source={md}
      />
    </Layout>
  );
}

export default Main;
