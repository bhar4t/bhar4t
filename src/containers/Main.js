import React from "react";
// import Grid from "./Grid";
import Layout from "../layouts/Layout";
import CodeBlock from "../components/CodeBlock";

import ReactMarkdown from "react-markdown";
import Article1 from "../contents/index.md";

function Main() {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    const images = document.getElementsByName("pinch");
    console.log(images);
    for (let i = 0, len = images.length; i < len; i++) {
      const img = images[i];
      console.log(img);
      img.addEventListener("click", () => console.log("Haha"));
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    fetch(Article1)
      .then((response) => response.text())
      .then((text) => {
        setMd(text);
      });
  }, []);
  return (
    <Layout social>
      <span
        style={{
          width: "100%",
          textAlign: "center",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 200,
          fontFamily: "monospace",
          opacity: "40%",
          fontSize: "3em",
          padding: ".8em 0em",
        }}
      >
        Code with
      </span>
      <ReactMarkdown
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        source={md}
      />
    </Layout>
  );
}

export default Main;
