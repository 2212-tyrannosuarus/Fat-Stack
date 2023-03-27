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
import { me } from "./store";

const NavigationRoutes = (props) => {
  const { isLoggedIn, loadInitialData } = props;

  useEffect(() => {
    loadInitialData();
  }, []);

  function PrivateRoute({ children }) {
    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route
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
            <Budget />
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
            <GoalsID />
          </SidebarLayout>
        }
      />
      <Route
        exact
        path="/overviewChart"
        element={
          <SidebarLayout>
            <ChartForOverview userId={1} />
          </SidebarLayout>
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
        exact
        path="/overviewChart"
        element={
          <SidebarLayout>
            <ChartForOverview userId={1} />
          </SidebarLayout>
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

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(NavigationRoutes);
