import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Flex, Box, Container } from "@chakra-ui/react";
import DashNav from "../components/DashNav";

const SidebarLayout = ({ children }) => {
  const [navSize, changeNavSize] = useState("large");

  const handleNavSize = () => {
    if (navSize == "small") changeNavSize("large");
    else changeNavSize("small");
  };

  return (
    <Box w={"100%"} h={"100%"} bg={"#f5f7fb"}>
      <Box pt={6} px={12} ml={navSize == "large" ? 260 : 100} pr={12}>
        <DashNav />
      </Box>
      <Flex>
        <Sidebar navSize={navSize} handleNavSize={handleNavSize} />
        <Box pt={12} px={12} ml={navSize == "large" ? 260 : 100} pr={12}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarLayout;
