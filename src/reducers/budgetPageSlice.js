import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const readTransactionCsv = createAsyncThunk(
  "transactions/readCsv",
  async ({ userId }) => {
    const res = await fetch("/Tranactions_Mar_15.csv");
    const resp = await res.text();
    // console.log("resp", resp);
    const csvData = resp.split("\n").map((row) => {
      const [
        date,
        description,
        amount,
        tranactionType,
        subCategory,
        accountName,
      ] = row.split(",");
      return {
        date: date.toString(),
        description: description,
        amount: parseFloat((amount * 1).toFixed(2)),
        tranactionType: tranactionType,
        subCategory: subCategory,
        accountName: accountName,
      };
    });
    console.log("cdata", csvData);
    let csvData1 = [];
    for (let i = 0; i <= 499; i++) {
      csvData1.push(csvData[i]);
    }

    let csvData2 = [];
    for (let i = 500; i <= 1020; i++) {
      csvData2.push(csvData[i]);
    }
    let transactions = csvData1;
    const { data1 } = await axios.post(`/api/budget/${userId}`, transactions);

    transactions = csvData2;
    const { data2 } = await axios.post(`/api/budget/${userId}`, transactions);

    let resultData = [];
    for (let i = 0; i < data1; i++) {
      resultData.push(data1[i]);
    }

    for (let j = 0; j < data2; j++) {
      resultData.push(data2[j]);
    }
    return resultData;
  }
);

export const budgetPageSlice = createSlice({
  name: "BudgetPage",
  initialState: {
    transactions: [],
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(readTransactionCsv.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const selectUserTransactions = (state) => {
  return state.budgetPage.transactions;
};

export default budgetPageSlice.reducer;
