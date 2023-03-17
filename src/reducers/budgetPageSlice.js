import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUserTransactions = createAsyncThunk(
  "courses_sub_category/fetchAll",
  async (userId) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/subCategories/${userId}`);
    return data;
  }
);


export const budgetPageSlice = createSlice({
  name: "BudgetPage",
  initialState: {
    transactions: [],
  },
  reducers: {},
  extraReducers: (build) => {
    build
    .addCase(fetchAllUserTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    })
  },
});

export const selectUserTransactions = (state) => {
  return state.budgetPage.transactions;
};

export default budgetPageSlice.reducer;
