import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk("goals/getGoalsCategory", async () => {
  const { data } = await axios.get("/api/goals");
  return data;
});

export const getallGoals = createAsyncThunk("goals/getallGoals", async () => {
  const { data } = await axios.get("/api/goals/goals");
  return data;
});

export const getGoal = createAsyncThunk("goals/getGoal", async (id) => {
  const { data } = await axios.post(`/api/goals/${id}`);
  return data;
});

export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (id) => {
  const { data } = await axios.delete(`/api/goals/${id}`);
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
  async (id) => {
    const { data } = await axios.get(`/api/goals/goalList/${id}`);
    return data;
  }
);
export const getCompletedGoals = createAsyncThunk(
  "goals/getCompletedGoalsList",
  async (id) => {
    const { data } = await axios.get(`/api/goals/goalList/completed/${id}`);
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
    const { data } = await axios.put("/api/goals/contribute", body);
  }
);

export const redoContribution = createAsyncThunk(
  "goals/redoContribution",
  async (body) => {
    const { data } = await axios.put("/api/goals/redoContribution", body);
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ id, body }) => {
    const { data } = await axios.put(`/api/goals/${id}`, body);
    return data;
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
    allGoalList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.fulfilled, (state, action) => {
        state.allGoals = action.payload;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.goal = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goal = {};
      })
      .addCase(getallGoals.fulfilled, (state, action) => {
        state.allGoalList = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goalList.push(action.payload);
        state.goal = action.payload;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
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
export const selectAllGoalsList = (state) => state.goalPage.allGoalList;

export default goalPageSlice.reducer;
