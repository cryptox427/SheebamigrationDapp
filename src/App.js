import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Stats } from "../src/Pages/Home";
import { Layout } from "./Layout/Layout";
import { LuckyScratchPage } from "./Pages/LuckyScratchPage";
function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/lucky-scratch" component={LuckyScratchPage} />
          <Redirect to="/lucky-scratch" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
