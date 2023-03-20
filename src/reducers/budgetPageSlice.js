import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIncomeFromDateToDate = createAsyncThunk(
  "userIncomeFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/income/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchBudgetedSpendingFromDateToDate = createAsyncThunk(
  "userBudgetSpendingFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/budgeted/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchUnbudgetedSpendingFromDateToDate = createAsyncThunk(
  "userUnbudgetedSpendingFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/unbudgeted/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const budgetPageSlice = createSlice({
  name: "BudgetPage",
  initialState: {
    income: [],
    budgetedSpending: [],
    unbudgetedSpending: []
  },
  reducers: {
    
  },
  extraReducers: (build) => {
    build
    .addCase(fetchIncomeFromDateToDate.fulfilled, (state, action) => {
      state.income = action.payload;
    })
    .addCase(fetchUnbudgetedSpendingFromDateToDate.fulfilled, (state, action) => {
      state.unbudgetedSpending = action.payload;
    })
    .addCase(fetchBudgetedSpendingFromDateToDate.fulfilled, (state, action) => {
      state.budgetedSpending = action.payload;
    });
  },
});

export const {filterThisMonthsTransactions} = budgetPageSlice.actions

export const selectIncomeFromDateToDate = (state) => {
  return state.budgetPage.income;
};

export const selectBudgetedSpendingFromDateToDate = (state) => {
  return state.budgetPage.budgetedSpending;
};

export const selectUnudgetedSpendingFromDateToDate = (state) => {
  return state.budgetPage.unbudgetedSpending;
};

export default budgetPageSlice.reducer;
