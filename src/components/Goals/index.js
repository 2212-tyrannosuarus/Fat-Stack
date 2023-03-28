import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import CreateGoal from "./GoalsComponent/CreateGoal";
import { getExistingGoals, selectGoalList } from "../../reducers/goalPageSlice";
import PageWithGoals from "./GoalsComponent/PageWithGoals";

export function Goals({ user }) {
  console.log("asdfasdf", user.id);
  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getExistingGoals(user.id));
    };

    handleFetch();
  }, []);

  return <>{goalList.length > 0 ? <PageWithGoals /> : <CreateGoal />}</>;
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Goals);
