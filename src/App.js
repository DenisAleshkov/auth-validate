import React from "react";
import firebase from "firebase";
import { Switch, Route } from "react-router-dom";
import { FIREBASE_CONFIG } from "./store/constants";
import SignUp from "./view/SignUp/SignUp";
import SignIn from "./view/SignIn/SignIn";
import "./App.css";

const App = () => {
  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  }, []);

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
