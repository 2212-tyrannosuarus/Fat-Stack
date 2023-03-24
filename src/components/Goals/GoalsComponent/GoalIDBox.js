import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "../../Budget/Budget.css";
import { Link } from "@chakra-ui/react";
import moment from "moment";
import goalPageSlice from "../../../reducers/goalPageSlice";
import {
  Wrap,
  WrapItem,
  Center,
  Flex,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";

export default function GoalIDBox({ goal }) {
  const [weekContribution, setWeekContribution] = useState(0);
  const [monthContribution, setMonthContribution] = useState(0);
  const [weekLeft, setWeekLeft] = useState(0);

  const calculateMoneyPerMonth = () => {
    let currentDate = moment();
    let goalDate = moment(goal.goal_date);
    let amountNeeded =
      parseInt(goal.goalamount) - parseInt(goal.contributedamount);

    let monthDiff = goalDate.diff(currentDate, "months", true);
    let weekDiff = goalDate.diff(currentDate, "weeks", true);
    setWeekLeft(weekDiff.toFixed(0));
    setMonthContribution((amountNeeded / monthDiff).toFixed(2));
    setWeekContribution((amountNeeded / weekDiff).toFixed(2));
  };

  useEffect(() => {
    calculateMoneyPerMonth();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12 order-2 mb-4 mt-2 pb-0 mr-0">
        <div className="card h-100">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="card-title m-0 me-2 ">{goal.name}</h5>
          </div>
          <div className="card-body">
            <ul className="p-0 m-0">
              <li className="d-flex mb-2 pb-1">
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="text-muted d-block mb-1">
                      text place hodler
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
                  variant={
                    (goal.contributedamount / goal.goalamount) * 100 < 25
                      ? "danger"
                      : (goal.contributedamount / goal.goalamount) * 100 < 50
                      ? "warning"
                      : (goal.contributedamount / goal.goalamount) * 100 < 75
                      ? "info"
                      : "success"
                  }
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
