import React from "react";
import "./scss/styles.scss";
import NavigationRoutes from "./Routes";
import Navbar from "./components/Navbar/index.js";

import * as bootstrap from "bootstrap";

const App = () => {
  return (
    <div>
      <Navbar />
      <NavigationRoutes />
    </div>
  );
};

export default App;
