import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="white"
      boxShadow="sm"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="9999"
    >
      <Box display="flex" alignItems="center" ml="1rem">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" width="40" height="40" />
        </Link>
        <Box ml="3" fontWeight="bold" mr="1rem">
          WE ARE FARMERS
        </Box>
      </Box>

      <Box fontWeight="bold" mr="1rem">
        <Link href="/about" marginRight="2rem">
          About Us
        </Link>
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
          _hover={{ bg: "gray.200" }}
        >
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
