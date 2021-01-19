import React, { useEffect, useState } from "react";
import { getTrainersFromFirebase } from "./services/generate.service";
import { getTraining } from "./../../store/actions/training.action";
import { useDispatch } from "react-redux";
import Calendar from "./components/Calendar/Calendar";
import "./HomePage.scss";

const HomePage = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainerID, setTrainerID] = useState("");

  const dispatch = useDispatch();

  const getTrainers = async () => {
    const getter = await getTrainersFromFirebase();
    setTrainers(getter);
    setTrainerID(getter[0].id);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    if (trainerID) {
      dispatch(getTraining(trainerID));
    }
  }, [trainerID]);

  const chooseTrainer = (e) => {
    setTrainerID(e.target.id);
  };

  const renderTrainers = () => {
    return (
      <ul className="sidebar">
        {trainers.map((item) => {
          return (
            <button
              onClick={chooseTrainer}
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
          <span className="menu-avatar">User</span>
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
