import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import App from "./App";
import "./index.css";

WebFont.load({
  google: {
    families: [
      "Sacramento",
      "sans-serif",
      "Inter: 100, 200, 300, 400, 500, 600, 700",
      "sans-serif",
    ],
  },
});

ReactDOM.hydrate(<App />, document.getElementById("root"));

// import "./custom.scss";
// import * as serviceWorker from "./serviceWorker";
// serviceWorker.unregister();
