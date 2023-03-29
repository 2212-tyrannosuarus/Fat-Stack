import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBudgetedSpendingFromDateToDate,
  fetchIncomeFromDateToDate,
  fetchUnbudgetedSpendingFromDateToDate,
  getCategories,
  selectBudgetedSpendingFromDateToDate,
  selectCategories,
  selectIncomeFromDateToDate,
  selectUnudgetedSpendingFromDateToDate,
  updateBudgetBySubCategory,
} from "../../reducers/budgetPageSlice";
import Spending from "./Spending";
import Other from "./Other";
import Income from "./Income";
import "./Budget.css";
import "../../scss/styles.scss";
import * as bootstrap from "bootstrap";
import DashSummary from "./DashSummary";
import theme from "./theme.js";
import { ChakraProvider } from "@chakra-ui/react";
import NoBudgetCreated from "./NoBudgetCreatedPage";
import { connect } from "react-redux";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = ({ user }) => {
  let userId = user.id;
  const dispatch = useDispatch();

  let budgetedSpendingFromSlice = useSelector(
    selectBudgetedSpendingFromDateToDate
  );
  let unbudgetedSpending = useSelector(selectUnudgetedSpendingFromDateToDate);
  let budgetedIncome = useSelector(selectIncomeFromDateToDate);
  let categories = useSelector(selectCategories);

  const [dateToday, setDateToday] = useState(new Date());
  let [newBudgetedAmount, setNewBudgetedAmount] = useState(0);

  const [titleDate, setTitleDate] = useState(
    `${new Date().toString().split(" ")[1]} ${
      new Date().toString().split(" ")[3]
    }`
  );

  let currMonth = dateToday.toString().split(" ")[1];
  let currYear = dateToday.toString().split(" ")[3].slice(2);

  let indexOfCurrMonth = MONTHS.indexOf(currMonth);
  let monthsToDisplay = [];

  for (let i = indexOfCurrMonth + 3; i < MONTHS.length; i++) {
    monthsToDisplay.push(`${MONTHS[i]} '${parseInt(currYear) - 1}`);
  }
  for (let i = 0; i <= indexOfCurrMonth; i++) {
    monthsToDisplay.push(`${MONTHS[i]} '${parseInt(currYear)}`);
  }

  useEffect(() => {
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `${todaysDate[3]}-${currentMonth}-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    async function fetchThisMonthData() {
      await dispatch(
        fetchBudgetedSpendingFromDateToDate({
          userId: userId,
          fromDate: startingDate,
          toDate: endingDate,
        })
      );
      await dispatch(
        fetchUnbudgetedSpendingFromDateToDate({
          userId: userId,
          fromDate: startingDate,
          toDate: endingDate,
        })
      );
      await dispatch(
        fetchIncomeFromDateToDate({
          userId: userId,
          fromDate: startingDate,
          toDate: endingDate,
        })
      );
      await dispatch(getCategories({ userId: userId }));
    }
    if (window.localStorage.getItem("token") && user.id !== undefined) {
      userId = user.id;
      fetchThisMonthData();
    }
  }, [user]);

  return (
    <>
      {/* if budgeted spending is not present and budgeted income is not present */}
      {budgetedSpendingFromSlice &&
      budgetedSpendingFromSlice.flat().slice(0, -1).length === 0 &&
      budgetedIncome &&
      budgetedIncome.flat().slice(0, -1)[0] === undefined ? (
        <NoBudgetCreated />
      ) : //if budgeted spending is present but not budgeted income
      budgetedSpendingFromSlice &&
        budgetedSpendingFromSlice[0] &&
        budgetedSpendingFromSlice[0].length &&
        budgetedIncome &&
        budgetedIncome.flat().slice(0, -1)[0] === undefined ? (
        <DashSummary
          income={budgetedIncome}
          spending={budgetedSpendingFromSlice}
          other={unbudgetedSpending}
        />
      ) : // if budgeted income is present but not budgeted spending
      budgetedIncome &&
        budgetedIncome.flat().slice(0, -1)[0] &&
        budgetedSpendingFromSlice &&
        budgetedSpendingFromSlice.flat().slice(0, -1).length === 0 ? (
        <DashSummary
          income={budgetedIncome}
          spending={budgetedSpendingFromSlice}
          other={unbudgetedSpending}
        />
      ) : // if both budgeted income and budgeted spending are present
      budgetedSpendingFromSlice.length &&
        unbudgetedSpending.length &&
        budgetedIncome.length ? (
        <DashSummary
          income={budgetedIncome}
          spending={budgetedSpendingFromSlice}
          other={unbudgetedSpending}
        />
      ) : (
        "You have not yet created a budget"
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Dashboard);
