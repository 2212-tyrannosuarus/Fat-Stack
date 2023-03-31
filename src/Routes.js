import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import SingleTransaction from "./components/SingleTransaction";
import Budget from "./components/Budget";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Homepage from "./components/HomePage";
import Trends from "./components/Trends";
import SidebarLayout from "./layouts/sidebarlayout";
import MainLayout from "./layouts/mainlayout";
import Goals from "./components/Goals";
import GoalsID from "./components/Goals/GoalsID";
import Signup from "./components/Signup";
import ChartForOverview from "./components/ChartForOverview";
import NotFound from "./components/NotFound";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const NavigationRoutes = (props) => {
  const { isLoggedIn } = props;
  console.log("LOGGED IN ", isLoggedIn);

  function PrivateRoute({ children }) {
    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <AllTransactions />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <SingleTransaction />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/budget"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <Budget />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/trends"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <Trends />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/goals"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <Goals />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/goals/:goalid"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <GoalsID />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/overviewChart"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <ChartForOverview />
            </SidebarLayout>
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        exact
        path="/signup"
        element={
          <MainLayout>
            <Signup />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <Homepage />
          </MainLayout>
        }
      />
      <Route
        exact
        path="/*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(NavigationRoutes);
