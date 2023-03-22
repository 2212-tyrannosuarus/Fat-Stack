import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalBox from "./GoalBox";
import CreateGoal from "./CreateGoal";
import {
  getExistingGoals,
  selectGoalList,
} from "../../../reducers/goalPageSlice";

export default function PageWithGoals() {
  const [createGoals, setCreateGoals] = useState(false);
  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getExistingGoals());
    };
    handleFetch();
  }, []);

  const handleAddGoal = () => {
    setCreateGoals(!createGoals);
  };

  return (
    <>
      {createGoals ? (
        <>
          <CreateGoal />
          <button onClick={handleAddGoal}>Back To Goals</button>
        </>
      ) : (
        <>
          You go, goal-getting
          <button onClick={handleAddGoal}>
            {" "}
            Place HOlder for Create New Goal
          </button>
          <p>Here's where you are at this month</p>
          <div>
            <p>In Progress</p>
            {goalList.map((goal) => (
              <GoalBox key={goal.id} goal={goal} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
