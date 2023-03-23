import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInspirationQuote = createAsyncThunk(
  "openAI/getQuote",
  async () => {
    const { data } = await axios.get("/api/openai/goalquote");
    return data;
  }
);

export const getGoalDirection = createAsyncThunk(
  "openAI/stepstowardsgoal",
  async () => {
    const { data } = await axios.get("/api/openai/stepstowardsgoal");
    return data;
  }
);

export const openAISlice = createSlice({
  name: "openAI",
  initialState: {
    inspiringQuote: "",
    goalDirections: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInspirationQuote.fulfilled, (state, action) => {
        state.inspiringQuote = action.payload;
      })
      .addCase(getGoalDirection.fulfilled, (state, action) => {
        state.goalDirections = action.payload.split(/1.|2.|3./).slice(1);
      });
  },
});

export const selectInspiringQuote = (state) => state.openAI.inspiringQuote;
export const selectGoalDirection = (state) => state.openAI.goalDirections;

export default openAISlice.reducer;
