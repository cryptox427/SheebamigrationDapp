//
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Stats } from "../src/Pages/Home";
import { Header } from "../src/Layout/Header/Header";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/stats" component={Stats}></Route>
        <Redirect to="/stats" />
      </Switch>
    </Router>
  );
}

export default App;
