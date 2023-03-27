import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { connect } from "react-redux";
import Homepage from "../HomePage";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { handleLogout, isLoggedIn, user } = props;
  const navigate = useNavigate();

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
        <Box ml="3" fontWeight="bold" mr="1rem">
          FINANCE
        </Box>
      </Box>
      <Box fontWeight="bold" mr="1rem">
        <Link href="/" marginRight="2rem">
          Home
        </Link>
        <Link href="/contact" marginRight="2rem">
          Features
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
          _hover={{ bg: "gray.100" }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Navbar);
