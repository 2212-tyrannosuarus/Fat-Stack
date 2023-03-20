import React from "react";
import Routes from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";

const App = () => {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
