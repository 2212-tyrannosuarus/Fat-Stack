import React from "react";

const MonthsToDisplay = (props) => {
  const { monthsToDisplay, handleIndividualMonth } = props;
  console.log("months to display ", monthsToDisplay);
  return (
    <div className="row">
      <div className="row col-9 individual-month">
        {monthsToDisplay && monthsToDisplay.length
          ? monthsToDisplay.map((month) => {
              return (
                <div
                  id={`${month.split(" ")[0]}`}
                  class="card col-1 m-1"
                  key={month}
                  onClick={() => handleIndividualMonth(month)}
                >
                  <div class="card-body p-0 m-0 text-center">
                    <span class="fw-semibold d-block mb-1">
                      {month.split(" ")[0]}
                    </span>
                    <span class="fw-semibold d-block mb-1">
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
