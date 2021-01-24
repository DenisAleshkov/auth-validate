import React from "react";

const Day = ({
  select,
  number,
  isCurrentMonth,
  isToday,
  isBusy,
  isDisable,
  date,
}) => {
  return (
    <span
      className={
        "day" +
        (isToday ? " today" : "") +
        (isCurrentMonth ? "" : " different-month") +
        (isBusy ? " selected-day" : "") +
        (isDisable ? " disable-day" : "")
      }
      onClick={() => {
        if (!isDisable || isToday) {
          select(date);
        }
      }}
    >
      {number}
    </span>
  );
};

export default Day;
