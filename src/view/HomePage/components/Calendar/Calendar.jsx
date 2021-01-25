import React, { useMemo, useState } from "react";
import Week from "./../Week/Week";
import Modal from "./../Modal/Modal";
import moment from "moment";
import DayNames from "../DayNames/DayNames";
import { useSelector } from "react-redux";
import MonthLabel from "../MonthLabel/MonthLabel";

const Calendar = ({ trainerID }) => {
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf("day"));
  const [show, setShow] = useState(false);

  const training = useSelector((state) => state.TrainingReducer.training);

  const nextMonth = () => {
    setMonth(month.clone().add(1, "month"));
  };

  const prevMonth = () => {
    const prevMonth = month.clone().subtract(1, "month");
    const disableMonth = selected.clone().subtract(1, "month");
    if (!disableMonth.isSame(prevMonth, "month")) {
      setMonth(month.clone().subtract(1, "month"));
    }
  };

  const select = (date) => {
    setShow(true);
    setSelected(date);
  };

  const close = () => {
    setShow(false);
    setSelected(moment().startOf("day"));
  };

  const renderWeek = useMemo(() => {
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
          training={training}
        />
      );
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }, [training, month]);

  const renderMonthLabel = useMemo(() => {
    return (
      <MonthLabel month={month} nextMonth={nextMonth} prevMonth={prevMonth} />
    );
  }, [month]);

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
      {renderMonthLabel}
      <DayNames />
      {renderWeek}
    </div>
  );
};

export default Calendar;
