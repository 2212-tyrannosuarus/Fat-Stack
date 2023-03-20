import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const { data } = await axios.get("/api/allTransactions");
    return data;
  }
);

export const fetchAllBankAccounts = createAsyncThunk(
  "bankAccounts/fetchAll",
  async () => {
    const { data } = await axios.get("/api/bankAccounts");
    return data;
  }
);

export const fetchAllSubCategories = createAsyncThunk(
  "subCategories/fetchAll",
  async () => {
    const { data } = await axios.get("/api/subCategories");
    return data;
  }
);

export const allTransactionsPageSlice = createSlice({
  name: "allTransactions",
  initialState: {
    allTransactions: [],
    bankAccounts: [],
    subCategories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      state.allTransactions = action.payload;
    });
    builder.addCase(fetchAllBankAccounts.fulfilled, (state, action) => {
      state.bankAccounts = action.payload;
    });
    builder.addCase(fetchAllSubCategories.fulfilled, (state, action) => {
      state.subCategories = action.payload;
    });
  },
});

export const selectAllTransactions = (state) => {
  return state.allTransactionsPage.allTransactions;
};
export const selectAllBankAccounts = (state) => {
  return state.allTransactionsPage.bankAccounts;
};
export const selectSubCategories = (state) => {
  return state.allTransactionsPage.subCategories;
};

export default allTransactionsPageSlice.reducer;
