import React from "react";

const Record = React.memo(({ index, email, from, to }) => {
  return (
    <div className="record-item">
      <span className="record-index">{index + 1}</span>
      <div className="record-data">
        <span className="record-email">{email}</span>
        <span className="record-time">
          {from}-{to}
        </span>
      </div>
    </div>
  );
});

export default Record;
