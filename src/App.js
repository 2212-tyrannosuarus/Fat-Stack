import React from "react";
import Routes from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
