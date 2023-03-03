import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import IncomeStatement from "../src/Pages/05-IncomeStatement/IncomeStatement";
import IncomeStatement02 from "../src/Pages/05-IncomeStatement/IncomeStatement02";
import File_SIE from "./Pages/02-SIE/Fill_SIE";
import Year from "./Pages/04-Year/Year";
import home from "./Pages/01-Home/home";
import Info from "./Pages/03-Information/Info";
import Steps from "../src/Pages/Steps/steps";
import PlayGround from "../src/Pages/90-PlayGround/PlayGround";
import Login from "./Pages/Login/Login";
import ScrollTopDemo from "./Pages/ScrollTop/ScrollTop";

import "./index.css";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css"; //icons
import "primeflex/primeflex.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Pages/Sidebar/Sidebar";
import steps from "../src/Pages/Steps/steps";
import Cards from "./Pages/00-Corporate Page/Cards";
import Theme from "./Pages/Theme/Theme";
import { CgAwards } from "react-icons/cg";

const history = createBrowserHistory();
let store = createStore(reducers, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/year" component={Year} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/incomeStatementOld/" component={IncomeStatement} />
        <Route exact path="/incomeStatement/" component={IncomeStatement02} />
        <Route exact path="/fileSIE/" component={File_SIE} />
        <Route exact path="/steps" component={Steps} />
        <Route exact path="/playGround" component={PlayGround} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
