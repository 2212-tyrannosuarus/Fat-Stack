import React from "react";
import Routes from "./Routes";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes />
      <Footer />
    </>
  );
};

export default App;
