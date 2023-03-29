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
    inspiringQuote:
      '"A goal without a plan is just a wish. Make a plan to save towards your goals." - Antoine de Saint-Exupéry',
    goalDirections: [
      "Set a specific goal: Start by deciding what you want to save for and how much you need to save. Be specific about the amount and the timeline.",
      "Create a budget: Determine how much you can realistically save each month by reviewing your income and expenses. Look for areas where you can cut back on unnecessary spending and redirect those funds towards your savings goal.",
      "Automate your savings: Set up automatic transfers from your checking account to a savings account each month. This will ensure that you save consistently without having to think about it. Over time, your savings will grow and you'll be closer to achieving your goal.",
    ],
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
