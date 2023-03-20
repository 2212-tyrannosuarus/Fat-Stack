import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import SingleTransaction from "./components/SingleTransaction";
import Budget from "./components/Budget";
import Profile from "./components/Profile";
import Homepage from "./components/HomePage";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<AllTransactions />} />
      <Route path="/transactions/:id" element={<SingleTransaction />} />
      <Route path="/profile" element={<Profile />} />
      <Route exact path="/budget" element={<Budget />} />
    </Routes>
  );
};

export default NavigationRoutes;
