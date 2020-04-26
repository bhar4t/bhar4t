import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layouts/Layout";
import CodeBlock from "../components/CodeBlock";
import Loader from "../components/Loader";
// import Grid from "./Grid";

function Articles(props) {
  const [article, setArticle] = React.useState("");
  const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    setLoader(true);
    import(`../contents/${props.match.params.id}.md`).then((file) => {
      fetch(file.default)
        .then((response) => response.text())
        .then((markdown) => {
          setArticle(markdown);
          setLoader(false);
        });
    });
  }, [props.match.params.id]);

  return (
    <Layout {...props} social>
      {isLoading ? (
        <Loader />
      ) : (
        <ReactMarkdown
          escapeHtml={false}
          renderers={{ code: CodeBlock }}
          source={article}
        />
      )}
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
