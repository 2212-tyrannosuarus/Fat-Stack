import React, { useState, useEffect } from "react";
import AddGoals from "./GoalsComponent/AddGoals";
import { getGoals, selectAllGoals } from "../../reducers/goalPageSlice";
import { useDispatch, useSelector } from "react-redux";

const Goals = () => {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);
  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoals());
    };
    handleFetch();
  }, []);

  return (
    <>
      {goals.map((goal) => (
        <AddGoals key={goal.id} goal={goal} />
      ))}
    </>
  );
};

export default Goals;
