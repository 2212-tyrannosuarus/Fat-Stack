import React from "react";
import Routes from "./Routes";
// Import our custom CSS
import "./scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const App = () => {
  return (
    <>
      <div class="container py-4 px-3 mx-auto">
        <h1 className="text-bg-dark">Hello, Bootstrap and Webpack!</h1>
        <button class="btn btn-primary">Primary button</button>
      </div>
      <Routes />
    </>
  );
};

export default App;
