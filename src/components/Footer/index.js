import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.800", "gray.200")}
      width="100%"
      bottom="0"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={"row"}
        spacing={4}
        justify={"space-between"}
        justifyContent={"center"}
      >
        <Text>© 2023. All rights reserved</Text>
      </Container>
    </Box>
  );
};

export default Footer;
