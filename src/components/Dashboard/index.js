import React from "react";
import Sidebar from "../Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user } = useAuth0();
  return (
    <>
      {console.log(user)}
      <Sidebar />
    </>
  );
};

export default Dashboard;
