import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Stats } from "../src/Pages/Home";
import { Layout } from "./Layout/Layout";
function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/stats" component={Stats}></Route>
          <Redirect to="/stats" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
