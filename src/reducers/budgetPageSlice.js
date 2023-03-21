import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIncomeFromDateToDate = createAsyncThunk(
  "userIncomeFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/income/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchBudgetedSpendingFromDateToDate = createAsyncThunk(
  "userBudgetSpendingFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/budgeted/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const fetchUnbudgetedSpendingFromDateToDate = createAsyncThunk(
  "userUnbudgetedSpendingFromTo/fetch",
  async ({userId, fromDate, toDate}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/unbudgeted/${userId}/'${fromDate}'/'${toDate}'`);
    return data;
  }
);

export const updateBudgetBySubCategory= createAsyncThunk(
  "budgetBySubCategory/update",
  async ({userId, subCategoryName, newBudgetedAmount}) => {
    userId = parseInt(userId);
    const { data } = await axios.put(`/api/budget/${userId}`, {
      subCategoryName: subCategoryName,
      newBudgetedAmount: parseInt(newBudgetedAmount)
    });
    return data;
  }
);

export const deleteBudgetBySubCategory= createAsyncThunk(
  "budgetBySubCategory/delete",
  async ({userId, subCategoryName}) => {
    userId = parseInt(userId);
    const { data } = await axios.delete(`/api/budget/${userId}/${subCategoryName}`);
    return data;
  }
);

export const addBudgetBySubCategory= createAsyncThunk(
  "budgetBySubCategory/add",
  async ({userId, subCategoryName, budgetAmount}) => {
    userId = parseInt(userId);
    const { data } = await axios.post(`/api/budget/${userId}`, {
      subCategoryName: subCategoryName,
      budgetAmount: parseInt(budgetAmount)
    });
    return data;
  }
);

export const getCategories= createAsyncThunk(
  "categories/get",
  async ({userId}) => {
    userId = parseInt(userId);
    const { data } = await axios.get(`/api/budget/categories/${userId}`);
    return data;
  }
);

export const budgetPageSlice = createSlice({
  name: "BudgetPage",
  initialState: {
    income: [],
    budgetedSpending: [],
    unbudgetedSpending: [],
    categories: []
  },
  reducers: {
    
  },
  extraReducers: (build) => {
    build
    .addCase(fetchIncomeFromDateToDate.fulfilled, (state, action) => {
      state.income = action.payload;
    })
    .addCase(fetchUnbudgetedSpendingFromDateToDate.fulfilled, (state, action) => {
      state.unbudgetedSpending = action.payload;
    })
    .addCase(fetchBudgetedSpendingFromDateToDate.fulfilled, (state, action) => {
      state.budgetedSpending = action.payload;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {filterThisMonthsTransactions} = budgetPageSlice.actions

export const selectIncomeFromDateToDate = (state) => {
  return state.budgetPage.income;
};

export const selectBudgetedSpendingFromDateToDate = (state) => {
  return state.budgetPage.budgetedSpending;
};

export const selectUnudgetedSpendingFromDateToDate = (state) => {
  return state.budgetPage.unbudgetedSpending;
};

export const selectCategories = (state) => {
  return state.budgetPage.categories;
};

export default budgetPageSlice.reducer;
