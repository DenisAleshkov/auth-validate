import React from "react";
import moment from "moment";
import Day from "./../Day/Day";

const Week = ({ training, date, month, selected, select }) => {
  const renderWeek = () => {
    const days = [];
    moment.weekdays().forEach(() => {
      const day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        isBusy: !!training.filter((item) => date.isSame(item.date, "day"))
          .length,
      };
      days.push(
        <Day key={date} day={day} selected={selected} select={select} />
      );
      date = date.clone();
      date.add(1, "day");
    });
    return <div className="calendar-week">{days}</div>;
  };
  return renderWeek();
};

export default Week;
