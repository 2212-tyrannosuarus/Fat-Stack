import React, { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import "../../Budget/Budget.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  Heading,
  Text,
  Progress,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LineCart from "../Charts/LineCart";
import UpdateGoals from "./UpdateGoals";

export function GoalIDBox({ goal, user }) {
  const [loading, setLoading] = useState(true);
  const [weekContribution, setWeekContribution] = useState(0);
  const [monthContribution, setMonthContribution] = useState(0);
  const [weekLeft, setWeekLeft] = useState(0);
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const calculateMoneyPerMonth = async () => {
    let currentDate = moment();
    let goalDate = moment(goal.goal_date);
    let amountNeeded =
      parseInt(goal.goalamount) - parseInt(goal.contributedamount);
    let monthDiff = goalDate.diff(currentDate, "months", true);
    let weekDiff = goalDate.diff(currentDate, "weeks", true);
    setWeekLeft(weekDiff.toFixed(0));
    let monthAmt = await (amountNeeded / monthDiff).toFixed(2);
    let weekAmt = await (amountNeeded / weekDiff).toFixed(2);

    if (parseInt(monthAmt) > parseInt(goal.goalamount)) {
      setMonthContribution(goal.goalamount);
    } else {
      setMonthContribution(monthAmt);
    }
    if (parseInt(weekAmt) > parseInt(goal.goalamount)) {
      setWeekContribution(goal.goalamount);
    } else {
      setWeekContribution(weekAmt);
    }
    setLoading(false);
  };

  useEffect(() => {
    calculateMoneyPerMonth();
  }, [goal]);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12 order-2 mb-4 mt-2 pb-0 mr-0">
        <div className="card h-100">
          <div className="card-header d-flex align-items-center justify-content-between">
            <div className="card-title m-0 me-2 ">
              <Heading mt=".75rem" mb=".25rem" size="md">
                {goal.name}
              </Heading>
              <Text fontSize="sm">Here's a summary</Text>
            </div>
            <div className=" justify-content-center">
              <h5 className="card-title m-0 me-2 ">
                <ChakraButton
                  colorScheme="teal"
                  variant="ghost"
                  onClick={() => navigate("/goals")}
                >
                  ↫
                </ChakraButton>
                {/* {
                  <ChakraButton colorScheme="teal" variant="ghost">
                    ⚙️
                  </ChakraButton>
                } */}
                <UpdateGoals goalid={goal.id} />
              </h5>
            </div>
          </div>
          {loading ? (
            <Progress
              size="lg"
              colorScheme="blackAlpha"
              isIndeterminate
              mt="2rem"
              mb="2rem"
            />
          ) : (
            <div className="card-body">
              <ul className="p-0 m-0">
                <li className="d-flex mb-2 pb-1">
                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div className="me-2">
                      {goal.completion_status ? (
                        <h6 className="text-muted d-block mb-1">
                          Congrats on achieving your goal!
                        </h6>
                      ) : (
                        <h6 className="text-muted d-block mb-1">
                          {formatter.format(weekContribution)} a week or{" "}
                          {formatter.format(monthContribution)} a month to reach
                          your goal!
                        </h6>
                      )}
                    </div>
                    <div className="user-progress d-flex align-items-center gap-1">
                      <h6 className="mb-0">
                        {formatter.format(goal.contributedamount)}
                      </h6>{" "}
                      <span className="text-muted">
                        of {formatter.format(goal.goalamount)}
                      </span>
                    </div>
                  </div>
                </li>
                <li className="mb-2 pb-0 income-progress-bar">
                  <Progress
                    colorScheme={
                      (goal.contributedamount / goal.goalamount) * 100 < 25
                        ? "red"
                        : (goal.contributedamount / goal.goalamount) * 100 < 50
                        ? "yellow"
                        : (goal.contributedamount / goal.goalamount) * 100 < 75
                        ? "blue"
                        : "green"
                    }
                    height="32px"
                    value={(goal.contributedamount / goal.goalamount) * 100}
                  />
                </li>
                {goal.completion_status ? null : (
                  <li className="d-flex mb-2 pb-1">
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="row mt-2">
                        <h6 className="text-muted d-block mb-1">
                          Projected Date: {goal.goal_date}
                        </h6>
                      </div>
                      <div className="row mt-2">
                        <h6 className="text-muted d-block mb-1">
                          Weeks Remaining: {weekLeft}
                        </h6>
                      </div>
                    </div>
                  </li>
                )}
                <LineCart id={goal.id} goal={goal} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(GoalIDBox);
