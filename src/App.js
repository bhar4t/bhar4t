import React from "react";
// import Grid from "./Grid";
import Layout from "./layouts/Layout";
import CodeBlock from "./CodeBlock";

import ReactMarkdown from "react-markdown";
import Test from "./contents/Test.md";

function App() {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    const images = document.getElementsByName("pinch");
    console.log(images);
    for (let i = 0, len = images.length; i < len; i++) {
      const img = images[i];
      console.log(img)
      img.addEventListener('click', () => console.log('Haha'));
    }
    return () => {
    };
  }, [])

  React.useEffect(() => {
    fetch(Test)
      .then((response) => response.text())
      .then((text) => {
        setMd(text);
      });
  }, []);
  return (
    <Layout>
      {/* <Grid /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Code</h1>
        <span>with</span>
        <h1 style={{ fontFamily: "Sacramento" }}>Bharat Sahu!</h1>
      </div>
      <div>Sorry, I'm doing some work on site.</div>
      <ReactMarkdown escapeHtml={false} renderers={{ code: CodeBlock }} source={md} />

      <div>
        <span>
          <a href="https://stackoverflow.com/users/7242575/bhar4t">
            StackOverflow
          </a>
        </span>
        &nbsp;
        <span>
          <a href="https://github.com/bhar4t">GitHub</a>
        </span>
        &nbsp;
        <span>
          <a href="https://www.linkedin.com/in/bhar4t/">LinkedIn</a>
        </span>
        &nbsp;
        <span>
          <a href="https://twitter.com/bhar4t">Twitter</a>
        </span>
        &nbsp;
        <span>
          <a href="https://www.facebook.com/bharat.sahu">FB</a>
        </span>
      </div>
    </Layout>
  );
}

export default App;
