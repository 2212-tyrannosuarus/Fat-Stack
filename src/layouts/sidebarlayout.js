import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Flex, Box } from "@chakra-ui/react";

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <Flex bg={"#f5f7fb"}>
        <Sidebar />
        <Box pt={20} px={5}>
          {children}
        </Box>
      </Flex>
    </div>
  );
};

export default SidebarLayout;
