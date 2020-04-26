import React from "react";
import Main from "./containers/Main";
import Articles from "./containers/Articles";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

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
      </Switch>
    </Router>
  );
}

export default App;
