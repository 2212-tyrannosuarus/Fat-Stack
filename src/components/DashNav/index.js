import React, { useState } from "react";
import {
  Box,
  Flex,
  Menu,
  Link,
  Text,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Notifications from "../Notifications";
import { useAuth0 } from "@auth0/auth0-react";

const DashNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth0();
  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  return (
    isAuthenticated && (
      <Box
        display="flex"
        justifyContent={"flex-end"}
        alignItems="center"
        p={3}
        bg="white"
        ml={5}
        mr={45}
        boxShadow="md"
        borderRadius={10}
      >
        <Notifications />
        <Menu
          placement="bottom-end"
          bg="white"
          colorScheme="gray"
          variant="outline"
          borderColor="gray.600"
          borderRadius="10"
          _hover={{ bg: "gray.100" }}
          width="full"
          isOpen={isOpen}
        >
          <MenuButton cursor="pointer" onClick={toggleIcon}>
            <Flex alignItems="center">
              <Avatar src={user.picture} alt={user.name} size="sm" />
              <Text
                ml={2}
                mr={2}
                fontWeight="bold"
                fontSize={15}
                color={"gray.800"}
              >
                Hi, {user.nickname}!
              </Text>
              <Icon mr={4} as={isOpen ? FiChevronUp : FiChevronDown} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Link}
              href="/profile"
              color={"gray.800"}
              _hover={{ textDecoration: "none", color: "gray.800" }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              as={Link}
              href="/settings"
              color={"gray.800"}
              _hover={{ textDecoration: "none", color: "gray.800" }}
            >
              Bank Accounts
            </MenuItem>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    )
  );
};

export default DashNav;
