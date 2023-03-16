import { createSlice } from "@reduxjs/toolkit";

export const singleTransactionPageSlice = createSlice({
  name: "homePage",
  initialState: {
    singleTransaction: {},
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default singleTransactionPageSlice.reducer;
