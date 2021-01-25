import React from "react";

const MonthLabel = ({ month, nextMonth, prevMonth }) => {
  return (
    <div className="calendar-month month">
      <button className="month-btn month-btn-prev" onClick={prevMonth}>
        &#8592;
      </button>
      <span className="month-label">{month.format("MMMM YYYY")}</span>
      <button className="month-btn month-btn-next" onClick={nextMonth}>
        &#8594;
      </button>
    </div>
  );
};

export default MonthLabel;
