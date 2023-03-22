import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Flex, Box } from "@chakra-ui/react";

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Flex bg={"#f5f5f9"}>
        <Sidebar />
        <Box pt={5} px={5}>
          {children}
        </Box>
      </Flex>
    </div>
  );
};

export default SidebarLayout;
