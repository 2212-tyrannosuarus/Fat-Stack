import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk("goals/getGoalsCategory", async () => {
  const { data } = await axios.get("/api/goals");
  return data;
});

export const createGoal = createAsyncThunk("goals/createGoal", async (body) => {
  const { data } = await axios.post("/api/goals", body);
  return data;
});

export const createGoalTransaction = createAsyncThunk(
  "goals/createGoalTransaction",
  async (body) => {
    const { data } = await axios.post("/api/goals/transaction", body);
    return data;
  }
);

export const getExistingGoals = createAsyncThunk(
  "goals/getGoalsList",
  async () => {
    const { data } = await axios.get("/api/goals/goalList");
    return data;
  }
);

export const getUserAccount = createAsyncThunk(
  "goals/getUserAccount",
  async (id) => {
    const { data } = await axios.get(`/api/bankAccounts/user/${id}`);
    return data;
  }
);

export const goalPageSlice = createSlice({
  name: "homePage",
  initialState: {
    allGoals: [],
    goal: {},
    goalList: [],
    bankAccounts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.fulfilled, (state, action) => {
        state.allGoals = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goal = action.payload;
      })
      .addCase(getExistingGoals.fulfilled, (state, action) => {
        state.goalList = action.payload;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.bankAccounts = action.payload;
      });
  },
});

export const selectAllGoals = (state) => state.goalPage.allGoals;
export const selectGoal = (state) => state.goalPage.goal;
export const selectGoalList = (state) => state.goalPage.goalList;
export const selectBankAccount = (state) => state.goalPage.bankAccounts;

export default goalPageSlice.reducer;
