import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";
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

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
