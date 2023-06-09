import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBudgetBySubCategory,
  deleteBudgetBySubCategory,
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
import SelectDropDown from "./SelectDropDown";
import MonthsToDisplay from "./MonthsToDisplay";
import Spending from "./Spending";
import Other from "./Other";
import Income from "./Income";
import "./Budget.css";
import "../../scss/styles.scss";
import * as bootstrap from "bootstrap";
import Summary from "./Summary";
import AddBudgetModal from "./AddBudgetModal";
import {
  selectSpendingOvertimeBySubcategory,
  fetchSpendingOvertimeBySubcategory,
} from "../../reducers/trendsPageSLice";
import theme from "../Budget/theme.js";
import { ChakraProvider } from "@chakra-ui/react";
import NoBudgetCreated from "./NoBudgetCreatedPage";
import { connect } from "react-redux";
import { logout } from "../../store";

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

const Budget = ({ user }) => {
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
  let [subCategoryName, setSubCategoryName] = useState("");
  let [addBudgetAmount, setAddBudgetAmount] = useState(0);
  let [categoriesForAddBudget, setCategoriesForAddBudget] = useState([]);
  const [average, setAverage] = useState(0);

  let spendingOvertimeBySubcategory = useSelector(
    selectSpendingOvertimeBySubcategory
  );
  let [dataToChartOvertimeBySubcategory, setDataToChartOvertimeBySubcategory] =
    useState([]);

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

  const handleSubmit = async (evt, subCategory, newBudgetedAmount) => {
    if (evt.keyCode === 13) return;
    evt.preventDefault();
    await dispatch(
      updateBudgetBySubCategory({
        userId: userId,
        subCategoryName: subCategory,
        newBudgetedAmount: newBudgetedAmount,
      })
    );
    handleThisMonth("this month");
  };

  const handleDeleteBudget = async (evt, subCategory) => {
    evt.preventDefault();
    await dispatch(
      deleteBudgetBySubCategory({
        userId: userId,
        subCategoryName: subCategory,
      })
    );

    handleThisMonth("this month");
  };

  const handlSubmitAddBudget = async (evt, subCategory, budgetAmount) => {
    if (evt.keyCode === 13) return;
    evt.preventDefault();
    await dispatch(
      addBudgetBySubCategory({
        userId: userId,
        subCategoryName: subCategory,
        budgetAmount: budgetAmount,
      })
    );
    handleThisMonth("this month");
  };

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
      setCategoriesForAddBudget(categories);

      handleThisMonth("this month");
    }
    if (window.localStorage.getItem("token") && user.id !== undefined) {
      userId = user.id;
      fetchThisMonthData();
    }
  }, [user]);

  // filter data for time Range
  async function handleThisMonth(timeRange) {
    let todaysDate = dateToday.toString().split(" ");
    let currentMonth = "";

    let startingDate = "";
    let endingDate = "";

    let selectedMonthDivs = document.querySelectorAll(".selected-month");
    selectedMonthDivs.forEach((div) => {
      div.classList.remove("selected-month");
    });

    // handle this month
    if (timeRange === "this month") {
      if ((dateToday.getMonth() + 1).toString().length === 1) {
        currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
      } else {
        currentMonth = (dateToday.getMonth() + 1).toString();
      }
      startingDate = `${todaysDate[3]}-${currentMonth}-01`;
      endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;

      let thisMonthDiv = document.querySelector(`#${currMonth}`);
      thisMonthDiv.classList.add("selected-month");

      setTitleDate(
        `${new Date().toString().split(" ")[1]} ${
          new Date().toString().split(" ")[3]
        }`
      );
    }

    // handle last month
    else if (timeRange === "last month") {
      if (dateToday.getMonth().toString().length === 1) {
        currentMonth = `0${dateToday.getMonth().toString()}`;
      } else {
        currentMonth = dateToday.getMonth().toString();
      }
      if (currentMonth === "02" && todaysDate[2] > 28) todaysDate[2] = 28;
      startingDate = `${todaysDate[3]}-${currentMonth}-01`;
      endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;

      let lastMonth = "";
      if (indexOfCurrMonth === 0) {
        lastMonth = MONTHS[MONTHS.length - 1];
      } else {
        lastMonth = MONTHS[indexOfCurrMonth - 1];
      }
      let lastMonthDiv = document.querySelector(`#${lastMonth}`);
      lastMonthDiv.classList.add("selected-month");

      let monthToDisplay = MONTHS[dateToday.getMonth() - 1];
      let yearToDisplay = todaysDate[3];

      if (indexOfCurrMonth === 0) {
        monthToDisplay = MONTHS[MONTHS.length - 1];
        yearToDisplay = parseInt(todaysDate[3]) - 1;
      }

      setTitleDate(`${monthToDisplay} ${yearToDisplay}`);
    }

    // handle last three months
    else if (timeRange === "last three months") {
      if (dateToday.getMonth().toString().length === 1) {
        currentMonth = `0${dateToday.getMonth().toString()}`;
      } else {
        currentMonth = dateToday.getMonth().toString();
      }

      let startingMonth = "";
      if ((dateToday.getMonth() - 2).toString().length === 1) {
        startingMonth = `0${(dateToday.getMonth() - 2).toString()}`;
      } else {
        startingMonth = (dateToday.getMonth() - 2).toString();
      }
      let currYear = todaysDate[3];
      let startingYear = todaysDate[3];
      if (startingMonth === "00") {
        startingMonth = "12";
        startingYear = parseInt(todaysDate[3]) - 1;
      }

      if (currentMonth === "02" && todaysDate[2] > 28) todaysDate[2] = 28;
      startingDate = `${startingYear}-${startingMonth}-01`;
      endingDate = `${currYear}-${currentMonth}-${todaysDate[2]}`;

      let lastThreeMonths = [];
      // indexOfCurrMonth = indexOfCurrMonth - 1
      if (indexOfCurrMonth <= 2) {
        for (let i = indexOfCurrMonth - 1; i >= 0; i--) {
          lastThreeMonths.push(MONTHS[i]);
        }
        if (lastThreeMonths.length === 2) {
          lastThreeMonths.push(MONTHS[MONTHS.length - 1]);
        } else if (lastThreeMonths.length === 1) {
          for (let j = MONTHS.length - 1; j >= MONTHS.length - 2; j--) {
            lastThreeMonths.push(MONTHS[j]);
          }
        } else if (lastThreeMonths.length === 0) {
          for (let j = MONTHS.length - 1; j >= MONTHS.length - 3; j--) {
            lastThreeMonths.push(MONTHS[j]);
          }
        }
      } else {
        for (let i = indexOfCurrMonth - 1; i >= indexOfCurrMonth - 3; i--) {
          lastThreeMonths.push(MONTHS[i]);
        }
      }

      for (let i = 0; i < lastThreeMonths.length; i++) {
        let divToSelect = document.querySelector(`#${lastThreeMonths[i]}`);
        divToSelect.classList.add("selected-month");
      }

      let indexOfMonthToDisplay = dateToday.getMonth() - 3;
      let yearToDisplay = todaysDate[3];

      let monthToDisplay = MONTHS[indexOfMonthToDisplay];

      if (indexOfCurrMonth === 2) monthToDisplay = MONTHS[MONTHS.length - 1];
      if (indexOfCurrMonth === 1) monthToDisplay = MONTHS[MONTHS.length - 2];
      if (indexOfCurrMonth === 0) monthToDisplay = MONTHS[MONTHS.length - 3];
      if (indexOfCurrMonth <= 2) yearToDisplay = parseInt(todaysDate[3]) - 1;

      let lastMonthToDisplay = MONTHS[indexOfCurrMonth - 1];
      let yearOfLastMonth = new Date().toString().split(" ")[3];
      if (indexOfCurrMonth === 0) {
        lastMonthToDisplay = MONTHS[MONTHS.length - 1];
        yearOfLastMonth = parseInt(yearOfLastMonth) - 1;

      }

      setTitleDate(
        `${monthToDisplay} ${yearToDisplay} - ${lastMonthToDisplay} ${
          yearOfLastMonth
        }`
      );
    }

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

  // handle individual months when specific month square is selected
  async function handleIndividualMonth(month) {
    let currMonth = "";
    let currYear = "";

    let startingDate = "";
    let endingDate = "";

    let selectedMonthDivs = document.querySelectorAll(".selected-month");
    selectedMonthDivs.forEach((div) => {
      div.classList.remove("selected-month");
    });

    currMonth = MONTHS.indexOf(month.split(" ")[0]) + 1;

    let endingDay = "";
    if (
      currMonth === 1 ||
      currMonth === 3 ||
      currMonth === 5 ||
      currMonth === 7 ||
      currMonth === 8 ||
      currMonth === 10 ||
      currMonth === 12
    ) {
      endingDay = "31";
    } else if (
      currMonth === 4 ||
      currMonth === 6 ||
      currMonth === 9 ||
      currMonth === 11
    ) {
      endingDay = "30";
    } else if (currMonth === 2) {
      endingDay = "28";
    }
    if (currMonth.toString().length === 1) currMonth = `0${currMonth}`;

    currYear = `20${month.split(" ")[1].slice(1)}`;
    startingDate = `${currYear}-${currMonth}-01`;
    endingDate = `${currYear}-${currMonth}-${endingDay}`;

    let thisMonth = "";
    if (currMonth === 1) {
      thisMonth = MONTHS[MONTHS.length - 1];
    } else {
      thisMonth = MONTHS[currMonth - 1];
    }
    let lastMonthDiv = document.querySelector(`#${thisMonth}`);
    lastMonthDiv.classList.add("selected-month");

    let monthToDisplay = month.split(" ")[0];
    let yearToDisplay = `20${month.split(" ")[1].slice(1)}`;

    setTitleDate(`${monthToDisplay} ${yearToDisplay}`);

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
  }

  // display data by subcategory when subcategory changes, get data for the last 12 months
  async function handleOvertimeSubcategory(subcategory) {
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    await dispatch(
      fetchSpendingOvertimeBySubcategory({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
        subcategory: subcategory,
      })
    );

    setDataToChartOvertimeBySubcategory(spendingOvertimeBySubcategory);
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="container budget-container row">
        <div className="row">
          <div className="row col-9 ">
            <div className="col-8 ">
              <h2 className="mb-2 title-date">{titleDate}</h2>
            </div>

            <SelectDropDown handleThisMonth={handleThisMonth} />
          </div>
        </div>

        <MonthsToDisplay
          monthsToDisplay={monthsToDisplay}
          handleIndividualMonth={handleIndividualMonth}
        />

        <div className="row mt-2 mb-2">
          <AddBudgetModal
            subCategoryName={subCategoryName}
            handleSubmitAddBudget={handlSubmitAddBudget}
            setSubCategoryName={setSubCategoryName}
            addBudgetAmount={addBudgetAmount}
            setAddBudgetAmount={setAddBudgetAmount}
            categoriesForAddBudget={categories}
            handleOvertimeSubcategory={handleOvertimeSubcategory}
            chartData={spendingOvertimeBySubcategory}
            average={average}
            setAverage={setAverage}
          />
        </div>

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
          <div className="row ">
            <div className="col-8 mr-0 pr-0">
              <Income
                income={budgetedIncome}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />

              <Spending
                spending={budgetedSpendingFromSlice}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />
              <Other other={unbudgetedSpending} />
            </div>
            <div className="col-4 mt-2">
              <Summary
                income={budgetedIncome}
                spending={budgetedSpendingFromSlice}
                other={unbudgetedSpending}
              />
            </div>
          </div>
        ) : // if budgeted income is present but not budgeted spending
        budgetedIncome &&
          budgetedIncome.flat().slice(0, -1)[0] &&
          budgetedSpendingFromSlice &&
          budgetedSpendingFromSlice.flat().slice(0, -1).length === 0 ? (
          <div className="row ">
            <div className="col-8 mr-0 pr-0">
              <Income
                income={budgetedIncome}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />

              <Spending
                spending={budgetedSpendingFromSlice}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />
              <Other other={unbudgetedSpending} />
            </div>
            <div className="col-4 mt-2">
              <Summary
                income={budgetedIncome}
                spending={budgetedSpendingFromSlice}
                other={unbudgetedSpending}
              />
            </div>
          </div>
        ) : // if both budgeted income and budgeted spending are present
        budgetedSpendingFromSlice.length &&
          unbudgetedSpending.length &&
          budgetedIncome.length ? (
          <div className="row ">
            <div className="col-8 mr-0 pr-0">
              <Income
                income={budgetedIncome}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />

              <Spending
                spending={budgetedSpendingFromSlice}
                handleSubmit={handleSubmit}
                handleDeleteBudget={handleDeleteBudget}
                newBudgetedAmount={newBudgetedAmount}
                setNewBudgetedAmount={setNewBudgetedAmount}
              />
              <Other other={unbudgetedSpending} />
            </div>
            <div className="col-4 mt-2">
              <Summary
                income={budgetedIncome}
                spending={budgetedSpendingFromSlice}
                other={unbudgetedSpending}
              />
            </div>
          </div>
        ) : (
          "You have not yet created a budget"
        )}
      </div>
    </ChakraProvider>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Budget);
