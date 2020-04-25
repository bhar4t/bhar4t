import React from "react";
import Main from "./containers/Main";
import Articles from "./containers/Articles";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <Main {...props} />} />
        <Route
          path="/articles/:id"
          render={(props) => <Articles {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
