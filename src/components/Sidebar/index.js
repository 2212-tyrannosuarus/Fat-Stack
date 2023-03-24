import React, { useState } from "react";
import { Flex, Text, IconButton, Link, Icon } from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiDollarSign,
  FiBriefcase,
  FiArrowRight,
  FiArrowLeft,
  FiLogOut,
} from "react-icons/fi";

import { useAuth0 } from "@auth0/auth0-react";

const NavLink = ({ icon, title, active, navSize, href }) => {
  return (
    <Flex
      mt={2}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Link
        p={3}
        borderRadius={8}
        _hover={{ bg: "gray.50" }}
        w={navSize == "large" && "100%"}
        href={href}
      >
        <Flex>
          <Icon
            as={icon}
            fontSize="xl"
            color={active ? "#82AAAD" : "gray.600"}
          />
          <Text
            ml={5}
            display={navSize == "small" ? "none" : "flex"}
            color="gray.600"
          >
            {title}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default function Sidebar() {
  const { logout } = useAuth0();
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      boxShadow="0 0px 12px 0 rgba(0, 0, 0, 0.05)"
      minH="100vh"
      flexDir="column"
      bg={"white"}
      justifyContent="space-between"
    >
      <Flex
        px="5"
        py="16"
        flexDir="column"
        minW={navSize == "small" ? "75px" : "250px"}
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <NavLink
          navSize={navSize}
          icon={FiHome}
          title="Home"
          href="/dashboard"
        />
        <NavLink
          navSize={navSize}
          icon={FiBriefcase}
          title="My Goals"
          href="/goals"
        />
        <NavLink
          navSize={navSize}
          icon={FiDollarSign}
          title="Transactions"
          href="/transactions"
        />
        <NavLink
          navSize={navSize}
          icon={FiTrendingUp}
          title="Trends"
          href="/trends/1"
        />
        <NavLink
          navSize={navSize}
          icon={FiTrendingUp}
          title="Budget"
          href="/budget/1"
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <NavLink
          navSize={navSize}
          icon={FiLogOut}
          title="Logout"
          onClick={logout}
        />
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
