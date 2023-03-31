import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="white"
      pt={10}
    >
      <Box display="flex" alignItems="center" ml={10}>
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" width="40" height="40" />
        </Link>
        <Box ml="3" fontWeight="bold">
          FAT STACK
        </Box>
      </Box>
      <Box fontWeight="bold" mr="1rem">
        <Link href="/" marginRight="2rem">
          Home
        </Link>
        <Link
          marginRight="2rem"
          onClick={() =>
            window.scroll({
              top: 650,
              behavior: "smooth",
            })
          }
        >
          Features
        </Link>
        <Link
          marginRight="2rem"
          onClick={() =>
            window.scroll({
              top: 1250,
              behavior: "smooth",
            })
          }
        >
          Contact Us
        </Link>
        <Button
          fontWeight="bold"
          mr="1rem"
          bg="white"
          colorScheme="gray"
          variant="outline"
          borderColor="gray.200"
          _hover={{ bg: "gray.50" }}
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
