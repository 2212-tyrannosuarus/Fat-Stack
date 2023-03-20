import React from "react";
import Routes from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <Routes />
      <Footer />
    </ChakraProvider>
  );
};

export default App;
