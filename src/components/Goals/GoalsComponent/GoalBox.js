import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "../../Budget/Budget.css";

export default function GoalBox({ goal }) {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12 order-2 mb-4 mt-2 pb-0 mr-0">
        <div className="card h-100">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="card-title m-0 me-2 ">Income</h5>
          </div>
          <div className="card-body">
            <ul className="p-0 m-0">
              <li className="d-flex mb-2 pb-1">
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="text-muted d-block mb-1">
                      {goal.name}
                      <span className="text-dark">PLACE HOLDER TEXT</span>
                    </h6>
                  </div>
                  <div className="user-progress d-flex align-items-center gap-1">
                    <h6 className="mb-0">${goal.contributedamount}</h6>{" "}
                    <span className="text-muted">of ${goal.goalamount}</span>
                  </div>
                </div>
              </li>
              <li className="mb-0 pb-0 income-progress-bar">
                <ProgressBar
                  variant="primary"
                  now={(goal.contributedamount / goal.goalamount) * 100}
                  style={{ height: "10px" }}
                />
                <div className="row">
                  <>Goal Date: {goal.goal_date}</>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
