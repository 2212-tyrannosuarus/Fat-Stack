import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Flex, Box } from "@chakra-ui/react";

const SidebarLayout = ({ children }) => {
  const [navSize, changeNavSize] = useState("large");

  const handleNavSize = () => {
    if (navSize == "small") changeNavSize("large");
    else changeNavSize("small");
  };

  return (
    <div vh={100}>
      <Flex bg={"#f5f7fb"}>
        <Sidebar navSize={navSize} handleNavSize={handleNavSize} />
        <Box pt={20} px={5} ml={navSize == "large" ? 260 : 100}>
          {children}
        </Box>
      </Flex>
    </div>
  );
};

export default SidebarLayout;
