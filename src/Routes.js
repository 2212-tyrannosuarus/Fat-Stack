import React from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import AllTransactions from "./components/AllTransactions";
import SingleTransaction from "./components/SingleTransaction";
import Budget from "./components/Budget";
import Profile from "./components/Profile";
import Homepage from "./components/HomePage";
import Trends from "./components/Trends";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/transactions" element={<AllTransactions />} />
      <Route path="/transactions/:id" element={<SingleTransaction />} />
      <Route path="/profile" element={<Profile />} />
      <Route exact path="/budget/:userId" element={<Budget />} />
      <Route exact path="/trends/:userId" element={<Trends />} />
    </Routes>
  );
};

export default NavigationRoutes;
