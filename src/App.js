import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Home } from "../src/Pages/Home";
import { Header } from "./Layout/Header/Header";
function App() {
  return (
    <Router>
      <Header />
      <Home />
    </Router>
  );
}

export default App;
