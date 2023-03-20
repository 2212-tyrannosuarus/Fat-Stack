import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  Link,
  Icon,
} from "@chakra-ui/react";

import {
  FiHome,
  FiCalendar,
  FiTrendingUp,
  FiCreditCard,
  FiDollarSign,
  FiBriefcase,
  FiArrowRight,
  FiArrowLeft,
  FiLogOut,
} from "react-icons/fi";

const NavItem = ({ icon, title, active, navSize }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          _hover={{ bg: "gray.100" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.600"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      boxShadow="0 0px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
    >
      <Flex
        px="5"
        py="16"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Link to="/dashboard">
          <NavItem navSize={navSize} icon={FiHome} title="Dashboard" Link="/" />
        </Link>
        <Link to="/profile">
          <NavItem navSize={navSize} icon={FiCreditCard} title="My Accounts" />
        </Link>
        <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" />
        <NavItem navSize={navSize} icon={FiBriefcase} title="My Goals" />
        <NavItem navSize={navSize} icon={FiDollarSign} title="Transactions" />
        <NavItem navSize={navSize} icon={FiTrendingUp} title="Trends" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <NavItem navSize={navSize} icon={FiLogOut} title="Logout" />
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          icon={navSize === "large" ? <FiArrowLeft /> : <FiArrowRight />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
      </Flex>
    </Flex>
  );
}
