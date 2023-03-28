import React from "react";

const SelectDropDown = (props) => {
  const { handleThisMonth } = props;
  return (
    <div className="col">
      <div class="card-body">
        <div class="text-center">
          <div class="dropdown">
            <button
              class="btn btn-sm btn-outline-primary dropdown-toggle"
              type="button"
              id="growthReportId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Month
            </button>
            <div
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="growthReportId"
            >
              <button
                id="this-month-button"
                className="dropdown-item"
                onClick={() => handleThisMonth("this month")}
              >
                This month
              </button>
              <button
                class="dropdown-item"
                onClick={() => handleThisMonth("last month")}
              >
                Last month
              </button>
              <button
                class="dropdown-item"
                onClick={() => handleThisMonth("last three months")}
              >
                Last 3 months
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDropDown;
