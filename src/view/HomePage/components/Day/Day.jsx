import React from "react";

const Day = ({
  day,
  day: { date, isCurrentMonth, isToday, number, isBusy },
  select,
}) => {
  console.log('isBusy', isBusy)
  return (
    <span
      key={date.toString()}
      className={
        "day" +
        (isToday ? " today" : "") +
        (isCurrentMonth ? "" : " different-month") +
        (isBusy ? " selected-day" : "")
      }
      onClick={() => select(day)}
    >
      {number}
    </span>
  );
};

export default Day;
