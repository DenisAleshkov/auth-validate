import React from "react";
import moment from "moment";
import Day from "./../Day/Day";

const Week = ({ training, date, month, select }) => {
  const renderWeek = () => {
    const days = [];
    moment.weekdays().forEach(() => {
      days.push(
        <Day
          key={date}
          date={date}
          select={select}
          number={date.date()}
          isCurrentMonth={date.month() === month.month()}
          isToday={date.isSame(new Date(), "day")}
          isBusy={
            !!training.filter((item) => date.isSame(item.date, "day")).length
          }
          isDisable={date.isBefore(new Date(), "day")}
        />
      );
      date = date.clone();
      date.add(1, "day");
    });
    return <div className="calendar-week">{days}</div>;
  };
  return renderWeek();
};

export default Week;
