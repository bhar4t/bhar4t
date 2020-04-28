import React, { lazy, Suspense } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

const Main = lazy(() => import("./containers/Main"));
const Articles = lazy(() => import("./containers/Articles"));
const PrivacyPolicy = lazy(() => import("./containers/PrivacyPolicy"));

const Loader = () => (
  <div className="basic-flex">
    <div className="lds-dual-ring"></div>
  </div>
);

function App() {
  const [nightMode, setNightMode] = React.useState(
    Boolean(JSON.parse(localStorage.getItem("NIGHT_MODE")))
  );
  const toggleNightMode = () => setNightMode(!nightMode);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", nightMode && "dark");
    localStorage.setItem("NIGHT_MODE", nightMode);
  }, [nightMode]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            exact
            path={["/", "/articles"]}
            render={(props) => (
              <Main
                {...props}
                nightMode={nightMode}
                toggleNightMode={toggleNightMode}
              />
            )}
          />
          <Route
            path="/articles/:id"
            render={(props) => (
              <Articles
                {...props}
                nightMode={nightMode}
                toggleNightMode={toggleNightMode}
              />
            )}
          />
          <Route
            exact
            path="/privacy-policy"
            render={(props) => (
              <PrivacyPolicy
                {...props}
                nightMode={nightMode}
                toggleNightMode={toggleNightMode}
              />
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
