import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Notifications from "../Notifications";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="white"
      boxShadow="sm"
      top="0"
      left="0"
      right="0"
      zIndex="9999"
    >
      <Box display="flex" alignItems="center" ml="1rem">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" width="40" height="40" />
        </Link>
        <Box ml="3" fontWeight="bold" pt={1} fontSize={26}>
          BANK
        </Box>
      </Box>
      {!isAuthenticated && (
        <Box fontWeight="bold" mr="1rem">
          <Link href="/" marginRight="2rem">
            Home
          </Link>
          <Link marginRight="2rem">Features</Link>
          <Link href="/contact" marginRight="2rem">
            Contact Us
          </Link>
          <Button
            fontWeight="bold"
            mr="1rem"
            bg="white"
            colorScheme="gray"
            variant="outline"
            borderColor="gray.300"
            _hover={{ bg: "gray.100" }}
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
