import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectGoalTransactions,
  getGoalsTransaction,
} from "../../reducers/singleTransactionPageSlice";
import { getGoal, selectGoal } from "../../reducers/goalPageSlice";
import GoalIDBox from "./GoalsComponent/GoalIDBox";

export default function GoalsID({ name }) {
  const { goalid } = useParams();
  const dispatch = useDispatch();
  const transactions = useSelector(selectGoalTransactions);
  const goal = useSelector(selectGoal);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoal(goalid));
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoalsTransaction({ name: goal.name }));
    };
    if (goal.id) {
      handleFetch();
    }
  }, [goal]);

  return (
    <>
      <div>
        <GoalIDBox key={goal.id} goal={goal} />
      </div>
      <div>
        Contributions:
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <p>{transaction.date}</p>
            <p>{transaction.amount}</p>
          </div>
        ))}
      </div>
    </>
  );
}
