import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleTransaction = createAsyncThunk(
  "transaction/fetchSingle",
  async (transactionId) => {
    const { data } = await axios.get(`/api/singleTransaction/${transactionId}`);
    return data;
  }
);

export const fetchSingleTransactionSubCat = createAsyncThunk(
  "transaction/fetchSubCat",
  async (subCatId) => {
    console.log(subCatId);
    if (subCatId === undefined) return;
    const { data } = await axios.get(
      `/api/singleTransaction/subcategory/${subCatId}`
    );
    return data;
  }
);

export const updateSingleTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, body }) => {
    const { data } = await axios.put(`/api/singleTransaction/${id}`, body);
    return data;
  }
);

export const singleTransactionPageSlice = createSlice({
  name: "homePage",
  initialState: {
    singleTransaction: {},
    subCategory: {},
    category: {},
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTransaction.fulfilled, (state, action) => {
        state.singleTransaction = action.payload;
      })
      .addCase(updateSingleTransaction.fulfilled, (state, action) => {
        state.singleTransaction = action.payload;
      })
      .addCase(fetchSingleTransactionSubCat.fulfilled, (state, action) => {
        state.subCategory = action.payload;
      });
  },
});

export const selectSingleTransaction = (state) => {
  return state.singleTransactionPage.singleTransaction;
};
export const selectSingleTransactionSubCat = (state) => {
  return state.singleTransactionPage.subCategory;
};

export default singleTransactionPageSlice.reducer;
