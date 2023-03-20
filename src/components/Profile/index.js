import React from "react";
import { Box, Flex, Image, Text, Input, Button } from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  return (
    <>
      {isAuthenticated && (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Box width="400px" padding="24px" boxShadow="md" rounded="md">
            <Flex justifyContent="center" marginBottom="24px">
              <Image
                src={user.picture}
                alt="Profile picture"
                rounded="full"
                boxSize="150px"
                objectFit="cover"
              />
            </Flex>
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
              marginBottom="8px"
            >
              {user.nickname}
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
              <Input
                placeholder="Password"
                type="password"
                marginBottom="8px"
              />
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
      )}
    </>
  );
};

export default Profile;
