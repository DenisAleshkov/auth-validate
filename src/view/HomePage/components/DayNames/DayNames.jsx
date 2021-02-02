import React from "react";

const DayNames = React.memo(() => {
  return (
    <div className="calendar-daynames daynames">
      <div className="daynames-item">SUN</div>
      <div className="daynames-item">Mon</div>
      <div className="daynames-item">TUE</div>
      <div className="daynames-item">WED</div>
      <div className="daynames-item">THU</div>
      <div className="daynames-item">FRI</div>
      <div className="daynames-item">SAT</div>
    </div>
  );
});

export default DayNames;
