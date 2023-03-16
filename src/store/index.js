import { configureStore } from "@reduxjs/toolkit";
import allTransactionsPageSlice from "../reducers/allTransactionsPageSlice";
import budgetPageSlice from "../reducers/budgetPageSlice";
import goalPageSlice from "../reducers/goalPageSlice";
import overviewPageSlice from "../reducers/overviewPageSlice";
import singleTransactionPageSlice from "../reducers/singleTransactionPageSlice";

export const store = configureStore({
  reducer: {
    allTransactionsPage: allTransactionsPageSlice,
    singleTransactionPage: singleTransactionPageSlice,
    budgetPage: budgetPageSlice,
    goalPage: goalPageSlice,
    overviewPage: overviewPageSlice,
  },
});

export default store;
