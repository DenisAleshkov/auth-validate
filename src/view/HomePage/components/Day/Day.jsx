import React from "react";

const Day = ({
  day,
  day: { date, isCurrentMonth, isToday, number, isBusy },
  select,
}) => {
  const isDisable = date.isBefore(new Date(), "day");
  return (
    <span
      key={date.toString()}
      className={
        "day" +
        (isToday ? " today" : "") +
        (isCurrentMonth ? "" : " different-month") +
        (isBusy ? " selected-day" : "") +
        (isDisable ? " disable-day" : "")
      }
      onClick={() => {
        if (!isDisable || isToday) {
          select(day);
        }
      }}
    >
      {number}
    </span>
  );
};

export default Day;
