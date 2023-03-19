import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchAllUserTransactions = createAsyncThunk(
  "userTransactions/fetchAll",
  async (userId) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/${userId}`);
    return data;
  }
);

export const budgetPageSlice = createSlice({
  name: "BudgetPage",
  initialState: {
    accounts: [],
    budget: [],
    transactions: [],
    thisMonthTransactionsByBudget: {},
  },
  reducers: {
    filterThisMonthsTransactions (state, {payload}) {
      console.log('payload ', payload)
      // let dateToday = new Date();
      // let currMonth = dateToday.toString().split(" ")[1];
      // let currYear = dateToday.toString().split(" ")[3]
      let currMonth = payload.currMonth;
      let currYear = payload.currYear;
      console.log('curr Month ', currMonth)
      console.log('curr Year ', currYear)
      let indexOfCurrMonth = (MONTHS.indexOf(currMonth) + 1).toString();
      if (indexOfCurrMonth.length === 1) indexOfCurrMonth = `0${indexOfCurrMonth}`
      let thisMonthTransactions = state.transactions.filter(transaction => transaction.date.split('-')[1] === indexOfCurrMonth && transaction.hideFromBudget === false && transaction.date.split('-')[0] === currYear);
      console.log('this months transactions ',  thisMonthTransactions);
      let transactionsByCategory = {};
      thisMonthTransactions.forEach(transaction => {
        if (!Object.keys(transactionsByCategory).includes(`${transaction.category}: ${transaction.subCategory}`)) {
          transactionsByCategory[`${transaction.category}: ${transaction.subCategory}`] = parseFloat(transaction.amount);
        }
        else {
          transactionsByCategory[`${transaction.category}: ${transaction.subCategory}`] += parseFloat(transaction.amount);
        }
      })
      
      // console.log('tansactionsByCategory ', transactionsByCategory)

      let income = [];
      let spending = [];
      let other = [];

      let transactionsByCategoryArr = Object.entries(transactionsByCategory);
      console.log('transactionsByCategory Arr ', transactionsByCategoryArr)

      let budgetSpendingSubCategory = [];
      state.budget.forEach(budget => {
        if (budget.budgetCategory !== 'Income') {
          budgetSpendingSubCategory.push(budget.budgetSubCategory);
        }
      })

      console.log('transactionsByCategoryArr ', transactionsByCategoryArr);

      transactionsByCategoryArr.forEach(item => {
        if (item[0].split(':')[0] === 'Income') {
          state.budget.forEach(budget => {
            if (budget.budgetCategory === 'Income') {
              item.push(parseFloat(budget.budgetAmount));
            }
          })
          income.push(item);
        }
        else if (budgetSpendingSubCategory.includes(item[0].split(':')[1].slice(1))) {
          state.budget.forEach(budget => {
            if (budget.budgetSubCategory === item[0].split(':')[1].slice(1)) {
              item.push(parseFloat(budget.budgetAmount));
            }
          })

            spending.push(item);
          }
          else other.push(item);
      })

      state.thisMonthTransactionsByBudget = {income: income, spending: spending, other: other}
    }
  },
  extraReducers: (build) => {
    build
    .addCase(fetchAllUserTransactions.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.budget = action.payload.budget;
      state.transactions = action.payload.transactions;
    });
  },
});

export const {filterThisMonthsTransactions} = budgetPageSlice.actions

export const selectUserAccounts = (state) => {
  return state.budgetPage.accounts;
};

export const selectUserBudget = (state) => {
  return state.budgetPage.budget;
};

export const selectUserTransactions = (state) => {
  return state.budgetPage.transactions;
};

export const selectThisMonthTransactions = (state) => {
  return state.budgetPage.thisMonthTransactionsByBudget;
};

export default budgetPageSlice.reducer;
