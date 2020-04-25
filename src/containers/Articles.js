import React from "react";
// import Grid from "./Grid";
import Layout from "../layouts/Layout";
import CodeBlock from "../components/CodeBlock";
import ReactMarkdown from "react-markdown";

function Articles(props) {
  const [article, setArticle] = React.useState("Loading..");

  React.useEffect(() => {
    import(`../contents/${props.match.params.id}.md`).then((file) => {
      fetch(file.default)
        .then((response) => response.text())
        .then((markdown) => {
          setArticle(markdown);
        });
    });
  }, [props.match.params.id]);

  return (
    <Layout social>
      <ReactMarkdown
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        source={article}
      />
    </Layout>
  );
}

export default Articles;

// React.useEffect(() => {
//   const images = document.getElementsByName("pinch");
//   console.log(images);
//   for (let i = 0, len = images.length; i < len; i++) {
//     const img = images[i];
//     console.log(img);
//     img.addEventListener("click", () => console.log("Haha"));
//   }
//   return () => {};
// }, []);
