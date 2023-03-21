import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSpendingOvertime = createAsyncThunk(
  "userSpendingOvertime/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/trends/overtime/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchSpendingByCategoryPie = createAsyncThunk(
  "userSpendingByCategoryPie/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/trends/categoryPie/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchSpendingByMerchantPie = createAsyncThunk(
  "userSpendingByMerchantPie/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/trends/merchantPie/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);


export const trendsPageSlice = createSlice({
  name: "TrendsPage",
  initialState: {
    spendingOvertime: [],
    categoryPie: [],
    merchantPie: []
  },
  reducers: {
  },
  extraReducers: (build) => {
    build.addCase(fetchSpendingOvertime.fulfilled, (state, action) => {
      state.spendingOvertime = action.payload;
    })
    build.addCase(fetchSpendingByCategoryPie.fulfilled, (state, action) => {
      state.categoryPie = action.payload;
    })
    build.addCase(fetchSpendingByMerchantPie.fulfilled, (state, action) => {
      state.merchantPie = action.payload;
    });
  },
});

// export const {  } = trendsPageSlice.actions;

export const selectSpendingOvertime = (state) => {
  return state.trendsPage.spendingOvertime;
};

export const selectSpendingByCategoryPie = (state) => {
  return state.trendsPage.categoryPie;
};

export const selectSpendingByMerchantPie = (state) => {
  return state.trendsPage.merchantPie;
};

export default trendsPageSlice.reducer;
