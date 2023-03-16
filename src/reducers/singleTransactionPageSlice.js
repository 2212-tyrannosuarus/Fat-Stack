import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleTransaction = createAsyncThunk(
  "transaction/fetchSingle",
  async (transactionId) => {
    const { data } = await axios.get(`/api/singleTransaction/${transactionId}`);
    return data;
  }
);

export const singleTransactionPageSlice = createSlice({
  name: "homePage",
  initialState: {
    singleTransaction: {},
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTransaction.fulfilled, (state, action) => {
      state.singleTransaction = action.payload;
    });
  },
});

export const selectSingleTransaction = (state) => {
  return state.singleTransactionPage.singleTransaction;
};

export default singleTransactionPageSlice.reducer;
