import React, { useEffect } from "react";
import "./Budget.css";
import "./Budget.scss";
import AreaChart from "../AreaChart";
import {
  readTransactionCsv,
  selectUserTransactions,
} from "../../reducers/budgetPageSlice";
import { useDispatch, useSelector } from "react-redux";

const Budget = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectUserTransactions);
  // const {userId} = useParams();
  const userId = 1;
  console.log("transactions ", transactions);

  useEffect(() => {
    async function getTransactions() {
      await dispatch(readTransactionCsv({ userId: userId }));
    }
    getTransactions();
  }, []);

  return (
    <div class="container">
      <div>Hello From Budget</div>
      <AreaChart />
    </div>
  );
};

export default Budget;
