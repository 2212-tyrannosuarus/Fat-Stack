import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Flex, Box } from "@chakra-ui/react";

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box pt={3} px={3}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </div>
  );
};

export default SidebarLayout;
