import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const goalPageSlice = createSlice({
  name: "homePage",
  initialState: {
    allGoals: [],
    goal: {},
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default goalPageSlice.reducer;
