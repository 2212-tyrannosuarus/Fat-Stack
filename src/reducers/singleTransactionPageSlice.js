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
    if (subCatId === undefined) return;
    const { data } = await axios.get(
      `/api/singleTransaction/subcategory/${subCatId}`
    );
    return data;
  }
);

export const fetchAllSubCat = createAsyncThunk(
  "transaction/fetchAllSubCat",
  async () => {
    const { data } = await axios.get(`/api/singleTransaction/subcategory`);
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

export const updateAllTransactionCat = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ name, body }) => {
    const { data } = await axios.put(
      `/api/singleTransaction/changeallsubcategory`,
      {
        name,
        body,
      }
    );
    return data;
  }
);

export const getGoalsTransaction = createAsyncThunk(
  "transaction/getGoalsTransaction",
  async (body) => {
    const { data } = await axios.post(
      `/api/singleTransaction/goalstransaction`,
      body
    );
    return data;
  }
);

export const singleTransactionPageSlice = createSlice({
  name: "homePage",
  initialState: {
    singleTransaction: {},
    subCategory: {},
    allSubCategories: [],
    category: {},
    errorMsg: "",
    goalsTransaction: [],
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
      })
      .addCase(getGoalsTransaction.fulfilled, (state, action) => {
        state.goalsTransaction = action.payload;
      })
      .addCase(fetchAllSubCat.fulfilled, (state, action) => {
        state.allSubCategories = action.payload;
        state.allSubCategories = state.allSubCategories.sort(function (a, b) {
          if (a.sub_category_name < b.sub_category_name) {
            return -1;
          }
          if (a.sub_category_name > b.sub_category_name) {
            return 1;
          }
          return 0;
        });
      });
  },
});

export const selectSingleTransaction = (state) => {
  return state.singleTransactionPage.singleTransaction;
};
export const selectSingleTransactionSubCat = (state) => {
  return state.singleTransactionPage.subCategory;
};
export const selectAllSubCat = (state) => {
  return state.singleTransactionPage.allSubCategories;
};
export const selectGoalTransactions = (state) => {
  return state.singleTransactionPage.goalsTransaction;
};

export default singleTransactionPageSlice.reducer;
