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
import { connect } from "react-redux";
import { logout } from "../../store";
import Notifications from "../Notifications";

const DashNav = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent={"flex-end"}
        alignItems="center"
        p={2}
        bg="white"
        boxShadow="md"
        borderRadius={10}
        maxW={{ base: "100%", sm: "100%", md: "800px", lg: "1400px" }}
      >
        <Notifications />
        <Menu
          placement="bottom-end"
          bg="white"
          colorScheme="gray"
          variant="outline"
          borderColor="gray.600"
          borderRadius="10"
          _hover={{ bg: "gray.50" }}
          width="full"
          isOpen={isOpen}
        >
          <MenuButton cursor="pointer" onClick={toggleIcon}>
            <Flex alignItems="center">
              <Avatar src={"#"} alt={"user picture"} size="sm" />
              <Text
                ml={2}
                mr={3}
                mt={3}
                justifyContent={"center"}
                fontWeight="bold"
                color={"gray.800"}
              >
                Hi, {user.username}!
              </Text>
              <Icon mr={5} as={isOpen ? FiChevronDown : FiChevronUp} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Link}
              href="/profile"
              color={"gray.800"}
              _hover={{ textDecoration: "none", background: "gray.50" }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              _hover={{ background: "gray.50" }}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(DashNav);
