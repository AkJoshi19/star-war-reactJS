import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Planets from './containers/Planets';
import Login from './containers/Login';

const FourOFour = () => <h1 style={{ color: "white" }}> Eror 404, Not found... </h1>;

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route exact path="/" component={Planets} />
      
      <Route component={FourOFour} />
    </Switch>
  </Provider>
);

export default App;
