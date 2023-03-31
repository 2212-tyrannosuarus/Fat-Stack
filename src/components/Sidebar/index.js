import React from "react";
import { logout } from "../../store";
import { connect } from "react-redux";
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Link,
  Text,
  Divider,
} from "@chakra-ui/react";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const NavLink = ({ navSize, icon, title, href, onClick }) => (
  <Link
    p={3}
    borderRadius={8}
    my={2}
    _hover={{ bg: "gray.50" }}
    w={navSize === "large" && "100%"}
    href={href}
    onClick={onClick}
  >
    <Flex flexDir="row" w="100%" alignItems="center">
      <Icon as={icon} fontSize="xl" color="gray.600" />
      <Text
        as="span"
        ml={5}
        display={navSize === "small" ? "none" : "flex"}
        color="gray.600"
      >
        {title}
      </Text>
    </Flex>
  </Link>
);

export const Sidebar = ({ navSize, handleNavSize, handleLogout }) => {
  return (
    <Flex
      boxShadow="md"
      minH="100vh"
      flexDir="column"
      bg={"white"}
      as="span"
      position="fixed"
      top={0}
      left={0}
      justifyContent="space-between"
    >
      <Flex
        px="5"
        pt="8"
        pb="16"
        flexDir="column"
        minW={navSize === "small" ? "75px" : "250px"}
        alignItems="flex-left"
        as="nav"
      >
        <Link href="/dashboard">
          <Box
            display="flex"
            alignItems="center"
            pt="1"
            pb="10"
            navSize={navSize}
          >
            <img src="/assets/logo.png" alt="Logo" width="50" height="50" />

            {navSize === "large" && (
              <Box ml="3" fontWeight="bold">
                FAT STACK
              </Box>
            )}
          </Box>
        </Link>

        <NavLink
          navSize={navSize}
          icon={FiHome}
          title="Home"
          href="/dashboard"
        />

        <NavLink
          navSize={navSize}
          icon={FiCreditCard}
          title="Transactions"
          href="/transactions"
        />
        <NavLink
          navSize={navSize}
          icon={FiDollarSign}
          title="Budget"
          href="/budget"
        />
        <NavLink
          navSize={navSize}
          icon={FiTarget}
          title="My Goals"
          href="/goals"
        />
        <NavLink
          navSize={navSize}
          icon={FiTrendingUp}
          title="Trends"
          href="/trends"
        />
      </Flex>

      <Flex
        p="2"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider />
        <NavLink
          navSize={navSize}
          icon={FiUser}
          title="My Profile"
          href="/profile"
        />
        <NavLink
          navSize={navSize}
          icon={FiLogOut}
          title="Logout"
          onClick={handleLogout}
        />
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          icon={navSize === "large" ? <FiChevronsLeft /> : <FiChevronsRight />}
          onClick={() => handleNavSize()}
        />
      </Flex>
    </Flex>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(Sidebar);
