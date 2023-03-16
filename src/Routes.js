import React from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import AllTransactions from "./components/AllTransactions";
import SingleTransaction from "./components/SingleTransaction";
import Budget from "./components/Budget";

const navigationRoutes = function () {
  return (
    <Routes>
      <Route path="/overview" element={<Overview />} />
      <Route path="/transactions" element={<AllTransactions />} />
      <Route path="/transactions/:id" element={<SingleTransaction />} />
      <Route exact path="/budget" element={<Budget />} />
    </Routes>
  );
};

export default navigationRoutes;
