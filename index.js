import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static("./build"));

app.get("/*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    if (context.status === 404) {
      res.status(404);
    }

    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
