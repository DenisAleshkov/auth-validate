import React, { useMemo, useState } from "react";
import Week from "./../Week/Week";
import Modal from "./../Modal/Modal";
import moment from "moment";
import DayNames from "../DayNames/DayNames";
import { useSelector } from "react-redux";

const Calendar = ({ trainerID }) => {
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf("day"));
  const [show, setShow] = useState(false);

  const training = useSelector((state) => state.TrainingReducer.training);

  const select = (day) => {
    setShow(true);
    setSelected(day.date);
  };

  const close = () => {
    setMonth(moment());
    setShow(false);
  };

  const getWeeks = () => {
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
          select={select}
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

  const week = useMemo(() => getWeeks(), [trainerID, training]);

  return (
    <div className="calendar">
      <Modal
        show={show}
        close={close}
        selected={selected}
        trainerID={trainerID}
      >
        {selected.toString()}
      </Modal>
      <DayNames />
      {week}
    </div>
  );
};

export default Calendar;
