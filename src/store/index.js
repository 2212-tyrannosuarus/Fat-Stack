import { configureStore } from "@reduxjs/toolkit";
import allTransactionsPageSlice from "../reducers/allTransactionsPageSlice";
import budgetPageSlice from "../reducers/budgetPageSlice";
import goalPageSlice from "../reducers/goalPageSlice";
import overviewPageSlice from "../reducers/overviewPageSlice";
import singleTransactionPageSlice from "../reducers/singleTransactionPageSlice";
import trendsPageSLice from "../reducers/trendsPageSLice";
import noteSlice from "../reducers/noteSlice";

import auth from "./auth";
export * from "./auth";

export const store = configureStore({
  reducer: {
    auth: auth,
    allTransactionsPage: allTransactionsPageSlice,
    singleTransactionPage: singleTransactionPageSlice,
    budgetPage: budgetPageSlice,
    goalPage: goalPageSlice,
    overviewPage: overviewPageSlice,
    trendsPage: trendsPageSLice,
    notePage: noteSlice,
  },
});

export default store;
