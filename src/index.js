import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider, authorizationParams } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="2212capstone.us.auth0.com"
      clientId="p8klZZBfHPuGZzqQqMnYlGYb7KUFvxE3"
      redirect_uri={window.location.origin}
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
