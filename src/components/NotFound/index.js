import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="1rem">
        404 Not Found
      </Heading>
      <Heading as="h2" fontSize="xl" fontWeight="bold" mb="2rem">
        Oops! The page you requested could not be found.
      </Heading>
      <Button
        as={Link}
        to="/"
        bg="gray.100"
        color="black"
        borderRadius="full"
        fontWeight="bold"
        fontSize="sm"
        // px="5"
        py="2"
        _hover={{ bg: "gray.200", color: "black" }}
      >
        RETURN HOME
      </Button>
    </Box>
  );
};

export default PageNotFound;
