import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const { data } = await axios.get("/api/allTransactions");
    return data;
  }
);

export const allTransactionsPageSlice = createSlice({
  name: "allTransactions",
  initialState: {
    allTransactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      state.allTransactions = action.payload;
    });
  },
});

export const selectAllTransactions = (state) => {
  return state.allTransactionsPage.allTransactions;
};

export default allTransactionsPageSlice.reducer;
