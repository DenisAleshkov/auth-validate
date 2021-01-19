import React from "react";
import Day from "./../Day/Day";

const Week = ({training, date, month, selected, select }) => {
  console.log('training', training)
  const render = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        isBusy: !!training.filter((item)=>date.isSame(item.date)).length
      };
    
      days.push(
        <Day key={date} day={day} selected={selected} select={select} />
      );
      date = date.clone();
      date.add(1, "day");
    }
    return <div className="row week">{days}</div>;
  };
  return render();
};

export default Week;
