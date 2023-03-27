import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Flex, Box } from "@chakra-ui/react";
import DashNav from "../components/DashNav";

const SidebarLayout = ({ children }) => {
  const [navSize, changeNavSize] = useState("large");

  const handleNavSize = () => {
    if (navSize == "small") changeNavSize("large");
    else changeNavSize("small");
  };

  return (
    <Box w={"100vw"} h={"100vh"} bg="#f5f5f9">
      <Box pt={18} ml={navSize == "large" ? 260 : 100} pr={5}>
        <DashNav />
      </Box>
      <Flex>
        <Sidebar navSize={navSize} handleNavSize={handleNavSize} />
        <Box pt={5} px={5} ml={navSize == "large" ? 260 : 100}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarLayout;
