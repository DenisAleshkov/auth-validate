import React from "react";
import firebase from "firebase";
import HomePage from "./view/HomePage/HomePage";
import SignUp from "./view/Auth/SignUp/SignUp";
import SignIn from "./view/Auth/SignIn/SignIn";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { FIREBASE_CONFIG } from "./store/constants";
import "./App.scss";

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const App = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return isAuth ? <Redirect to="/home" /> : <Redirect to="/signIn" />;
          }}
        />
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
