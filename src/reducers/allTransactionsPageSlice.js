import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTransactionsFromDateToDate = createAsyncThunk(
  "transactions/fetchByDate",
  async ({ fromDate, toDate }) => {
    const { data } = await axios.get(
      `/api/allTransactions/${fromDate}/${toDate}`
    );
    return data;
  }
);

export const fetchAllBankAccounts = createAsyncThunk(
  "bankAccounts/fetchAll",
  async () => {
    const { data } = await axios.get("/api/bankAccounts");
    const sortedData = data.sort((a, b) => {
      return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    });

    return sortedData;
  }
);

export const fetchAllSubCategories = createAsyncThunk(
  "subCategories/fetchAll",
  async () => {
    const { data } = await axios.get("/api/subCategories");
    return data;
  }
);

export const deleteSingleTransaction = createAsyncThunk(
  "singleTransaction/delete",
  async (transactionId) => {
    const { data } = await axios.delete(
      `/api/singleTransaction/${transactionId}`
    );
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
    builder.addCase(
      fetchTransactionsFromDateToDate.fulfilled,
      (state, action) => {
        state.allTransactions = action.payload[0];
      }
    );
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
