import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  },
  reducers: {},
  extraReducers: (build) => {
    build
    .addCase(fetchAllUserTransactions.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.budget = action.payload.budget;
      state.transactions = action.payload.transactions;
    });
  },
});

export const selectUserAccounts = (state) => {
  return state.budgetPage.accounts;
};

export const selectUserBudget = (state) => {
  return state.budgetPage.budget;
};

export const selectUserTransactions = (state) => {
  return state.budgetPage.transactions;
};

export default budgetPageSlice.reducer;
