import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk("goals/getGoalsCategory", async () => {
  const { data } = await axios.get("/api/goals");
  return data;
});

export const goalPageSlice = createSlice({
  name: "homePage",
  initialState: {
    allGoals: [],
    goal: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.allGoals = action.payload;
    });
  },
});

export const selectAllGoals = (state) => state.goalPage.allGoals;

export default goalPageSlice.reducer;
