import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Flex, Text, Input, Button, Avatar } from "@chakra-ui/react";

const Profile = ({ user }) => {
  return (
    <>
      <Flex alignItems="center">
        <Box w={320} p={8} boxShadow="md" rounded="md" bg={"white"}>
          <Flex justifyContent="center">
            <Avatar src={"#"} alt={"user picture"} size="lg" />
          </Flex>
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            marginBottom="8px"
          >
            {user.username}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            textAlign="center"
            marginBottom="8px"
          >
            {user.email}
          </Text>

          <Text fontSize="sm" textAlign="center" marginBottom="16px"></Text>
          <Box marginBottom="24px">
            <Input placeholder="Email" marginBottom="8px" />
            <Input placeholder="Password" type="password" marginBottom="8px" />
            <Input
              placeholder="Confirm password"
              type="password"
              marginBottom="16px"
            />
            <Button colorScheme="blue" isFullWidth>
              Save
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Profile);
