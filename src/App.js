import React from "react";
import Routes from "./Routes";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Routes />
      <Footer />
    </>
  );
};

export default App;
