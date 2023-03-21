import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import SingleTransaction from "./components/SingleTransaction";
import Budget from "./components/Budget";
import Profile from "./components/Profile";
import Homepage from "./components/HomePage";
import Trends from "./components/Trends";
import SidebarLayout from "./layouts/sidebarlayout";
import MainLayout from "./layouts/mainlayout";
import Goals from "./components/Goals";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Homepage />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <SidebarLayout>
            <Dashboard />
          </SidebarLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <SidebarLayout>
            <AllTransactions />
          </SidebarLayout>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <SidebarLayout>
            <SingleTransaction />
          </SidebarLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <SidebarLayout>
            <Profile />
          </SidebarLayout>
        }
      />
      <Route
        exact
        path="/budget/:userId"
        element={
          <SidebarLayout>
            <Budget />{" "}
          </SidebarLayout>
        }
      />
      <Route
        exact
        path="/trends/:userId"
        element={
          <SidebarLayout>
            <Trends />
          </SidebarLayout>
        }
      />
      <Route
        exact
        path="/goals"
        element={
          <SidebarLayout>
            <Goals />
          </SidebarLayout>
        }
      />
      <Route
        exact
        path="/goals/:goalid"
        element={
          <SidebarLayout>
            <Goals />
          </SidebarLayout>
        }
      />
    </Routes>
  );
};

export default NavigationRoutes;
