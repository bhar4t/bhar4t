import React from "react";
import Layout from "../layouts/Layout";

export default ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <Layout>
      <h1 className="pre-title">Oops, nothing here!</h1>
    </Layout>
  );
};
