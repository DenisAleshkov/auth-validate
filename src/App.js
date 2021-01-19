import React from "react";
import firebase from "firebase";
import HomePage from "./view/HomePage/HomePage";
import SignUp from "./view/Auth/SignUp/SignUp";
import SignIn from "./view/Auth/SignIn/SignIn";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { FIREBASE_CONFIG } from "./store/constants";
import "./App.scss";

firebase.initializeApp(FIREBASE_CONFIG);

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/signIn" exact>
          <SignIn />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
