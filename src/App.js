import React from "react";
import firebase from "firebase";
import HomePage from "./view/HomePage/HomePage";
import SignUp from "./view/SignUp/SignUp";
import SignIn from "./view/SignIn/SignIn";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { FIREBASE_CONFIG } from "./store/constants";
import "./App.css";

const App = () => {
  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  }, []);
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  if (isAuth) {
    return <HomePage />;
  }
  return (
    <div className="App">
      <Switch>
        <Route path="/signIn" exact>
          <SignIn />
        </Route>
        <Route path="/" exact>
          <SignUp />
        </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
