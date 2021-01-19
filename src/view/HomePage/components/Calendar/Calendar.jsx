import React, { useState } from "react";
import {useSelector} from "react-redux"
import DayNames from "./../DayNames/DayNames";
import Week from "./../Week/Week";
import Modal from "./../Modal/Modal";
import moment from "moment";

const Calendar = ({trainerID}) => {
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf("day"));
  const [show, setShow] = useState(false);

  const training = useSelector(state=>state.TrainingReducer.training)


  const select = (day) => {
    setSelected(day.date);
    setMonth(day.date.clone());
    setShow(true);
  };

  const close = () => {
    setSelected(moment().startOf("day"));
    setMonth(moment());
    setShow(!show);
  };

  const renderWeeks = () => {
    const weeks = [];
    let done = false;
    const date = month
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();
    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
          select={(day) => select(day)}
          selected={selected}
          training={training}
        />
      );

      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  const renderMonthLabel = () => {
    return <span className="month-label">{month.format("MMMM YYYY")}</span>;
  };

  return (
    <div className="calendar">
       <Modal show={show} close={close} selected={selected} trainerID={trainerID}>
       {selected.toString()}
      </Modal>
      <DayNames />
      {renderWeeks()}
     
    </div>
  );
};

export default Calendar;
