import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      p={5}
    >
      <Heading as="h1" fontSize="5xl" fontWeight="bold" mb={5}>
        Oops! Page not found.
      </Heading>
      <Box textAlign="center" mb={10}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Box>
      <Button
        as={Link}
        to="/"
        rounded={"full"}
        size={"lg"}
        fontWeight="bold"
        px={6}
        bg={"purple.500"}
        color="white"
        _hover={{ bg: "purple.300", color: "white" }}
        py="2"
      >
        Return Home
      </Button>
    </Box>
  );
};

export default NotFound;
