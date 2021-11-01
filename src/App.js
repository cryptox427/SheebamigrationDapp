import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Home } from "../src/Pages/Home";
function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
