import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Calendar from "./components/Calendar/Calendar";
import { getTrainersFromFirebase } from "./services/generate.service";
import { getTraining } from "./../../store/actions/training.action";
import { setUser, signOut } from "./../../store/actions/auth.action";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainerID, setTrainerID] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const getTrainers = async () => {
    const getter = await getTrainersFromFirebase();
    setTrainers(getter);
    setTrainerID(getter[0].id);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            dispatch(
              setUser({ ...doc.data(), userId: user.uid, isAuth: true })
            );
          });
      } else {
        unsubscribe();
        history.push("/signIn");
      }
    });
  }, []);

  useEffect(() => {
    if (trainerID) {
      dispatch(getTraining(trainerID));
    }
  }, [trainerID]);

  const signOutHandler = () => {
    dispatch(signOut(history));
  };

  const choseTrainer = (e) => {
    setTrainerID(e.target.id);
  };

  const renderTrainers = () => {
    return (
      <ul className="sidebar">
        {trainers.map((item) => {
          return (
            <button
              onClick={choseTrainer}
              className={`sidebar-btn ${
                item.id === trainerID ? "sidebar-btn-selected" : ""
              } coach`}
              key={item.id}
              id={item.id}
            >
              {item.name}
            </button>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="menu">
      <header className="menu-header">
        <div className="menu-logout">
          <button className="menu-logout_btn" onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
        <div className="menu-user">
          <span className="menu-avatar">user</span>
        </div>
      </header>
      <div className="menu-content">
        {renderTrainers()}
        <div className="calendar-wrapper">
          <Calendar trainerID={trainerID} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
