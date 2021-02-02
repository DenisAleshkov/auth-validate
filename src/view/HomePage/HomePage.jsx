import React, { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import { getTrainersFromFirebase } from "./services/generate.service";
import { getTraining } from "./../../store/actions/training.action";
import { setUser, signOut } from "./../../store/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getCurrentUserFromFirebase,
  getUserInfo,
} from "./services/firebase.service";
import "./HomePage.scss";

const HomePage = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainerID, setTrainerID] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const email = useSelector((state) => state.AuthReducer.email);

  const getTrainers = () => {
    getTrainersFromFirebase()
      .then((trainers) => {
        setTrainers(trainers);
        setTrainerID(trainers[0].id);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    const unsubscribe = getCurrentUserFromFirebase((user) => {
      if (user) {
        getUserInfo(user.uid).then((result) => {
          dispatch(
            setUser({ ...result.data(), userId: user.uid, isAuth: true })
          );
        });
      } else {
        history.push("/signIn");
      }
    });
    return () => {
      unsubscribe();
    };
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
        <div className="menu-user">
          <span className="menu-avatar">{email}</span>
        </div>
        <div className="menu-logout">
          <button className="menu-logout_btn" onClick={signOutHandler}>
            Sign Out
          </button>
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
