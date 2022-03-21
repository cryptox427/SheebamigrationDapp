import "./App.css";
import { BackgroundImage as BackgroundComponent } from "./components/BackgroundImage";
import BackgroundImage from "./Images/Asset 118.png";
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
      <BackgroundComponent
        url={BackgroundImage}
        className="font-lapsus w-screen h-screen overflow-scroll"
      >
        <Layout>
          <Switch>
            <Route exact path="/" component={Stats} />

            <Redirect to="/" />
          </Switch>
        </Layout>
      </BackgroundComponent>
    </Router>
  );
}

export default App;
