import React from "react";

const MonthsToDisplay = (props) => {
  const { monthsToDisplay, handleIndividualMonth } = props;
  return (
    <div className="row">
      <div className="row col-9 individual-month">
        {monthsToDisplay && monthsToDisplay.length
          ? monthsToDisplay.map((month) => {
              return (
                <div
                  id={`${month.split(" ")[0]}`}
                  className="card col-1 m-1"
                  key={month}
                  onClick={() => handleIndividualMonth(month)}
                >
                  <div className="card-body p-0 m-0 text-center">
                    <span className="fw-semibold d-block mb-1">
                      {month.split(" ")[0]}
                    </span>
                    <span className="fw-semibold d-block mb-1">
                      {month.split(" ")[1]}
                    </span>
                  </div>
                </div>
              );
            })
          : "Loading"}
      </div>
    </div>
  );
};

export default MonthsToDisplay;
