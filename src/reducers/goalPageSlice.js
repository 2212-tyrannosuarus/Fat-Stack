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
export const getCompletedGoals = createAsyncThunk(
  "goals/getCompletedGoalsList",
  async () => {
    const { data } = await axios.get("/api/goals/goalList/completed");
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

export const contributeToGoal = createAsyncThunk(
  "goals/contributeToGoal",
  async (body) => {
    console.log("body", body);
    const { data } = await axios.put("/api/goals/contribute", body);
  }
);

export const goalPageSlice = createSlice({
  name: "homePage",
  initialState: {
    allGoals: [],
    goal: {},
    goalList: [],
    completedGoals: [],
    bankAccounts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.fulfilled, (state, action) => {
        state.allGoals = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goalList.push(action.payload);
        state.goal = action.payload;
      })
      .addCase(getExistingGoals.fulfilled, (state, action) => {
        state.goalList = action.payload;
      })
      .addCase(getCompletedGoals.fulfilled, (state, action) => {
        state.completedGoals = action.payload;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.bankAccounts = action.payload;
      });
  },
});

export const selectAllGoals = (state) => state.goalPage.allGoals;
export const selectGoal = (state) => state.goalPage.goal;
export const selectGoalList = (state) => state.goalPage.goalList;
export const selectCompeltedGoals = (state) => state.goalPage.completedGoals;
export const selectBankAccount = (state) => state.goalPage.bankAccounts;

export default goalPageSlice.reducer;
