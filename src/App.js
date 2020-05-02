import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./routes";

const Loader = () => (
  <div className="basic-flex">
    <div className="lds-dual-ring"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>{renderRoutes(Routes)}</Switch>
    </Suspense>
  );
}

export default App;
