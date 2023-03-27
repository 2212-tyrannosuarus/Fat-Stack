import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateGoal from "./GoalsComponent/CreateGoal";
import { getExistingGoals, selectGoalList } from "../../reducers/goalPageSlice";
import PageWithGoals from "./GoalsComponent/PageWithGoals";

export default function Goals({ user }) {
  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getExistingGoals());
    };
    handleFetch();
  }, []);

  return <>{goalList.length > 0 ? <PageWithGoals /> : <CreateGoal />}</>;
}
