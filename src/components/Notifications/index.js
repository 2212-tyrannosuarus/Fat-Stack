import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiBell, FiXCircle } from "react-icons/fi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "You hit your Vacation goal",
      link: "/goals",
    },
    {
      id: 2,
      message: "You overspent on your Restaurant Budget",
      link: "/budget",
    },
    {
      id: 3,
      message: "You added a calendar event",
      link: "/calendar",
    },
  ]);

  return (
    <Box mr="1" mt={0.5}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Notifications"
          icon={<FiBell />}
          variant="ghost"
          size="md"
          color={"gray.800"}
          fontSize="20px"
          fontWeight="normal"
          _focus={{ boxShadow: "none" }}
          _hover={{ background: "gray.50" }}
        >
          {notifications.length > 0 && (
            <Box
              as="span"
              backgroundColor="red.500"
              color="white"
              borderRadius="full"
              textAlign="center"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="1rem"
              minWidth="1.25rem"
              position="absolute"
              right="-0.5rem"
              top="0.2rem"
              zIndex="docked"
            >
              {notifications.length}
            </Box>
          )}
        </MenuButton>
        <MenuList minWidth="240px" borderRadius="5" placement="bottom-end">
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                window.location.href = notification.link;
              }}
              _hover={{ background: "gray.50" }}
            >
              <Box fontWeight="bold" mb={1}>
                {notification.source}
              </Box>
              <Box>{notification.message}</Box>
              <Box
                as="span"
                fontSize="10px"
                fontWeight="bold"
                color={"gray.800"}
                cursor="pointer"
                ml={2}
                onClick={(event) => {
                  event.stopPropagation();
                  setNotifications((prevNotifications) =>
                    prevNotifications.filter((n) => n.id !== notification.id)
                  );
                }}
              >
                <Box
                  as="span"
                  fontSize="10px"
                  fontWeight="bold"
                  color={"gray.800"}
                  cursor="pointer"
                  ml={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                ></Box>
              </Box>
              <FiXCircle size={14} />
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem
            onClick={() => setNotifications([])}
            _hover={{ background: "gray.50" }}
          >
            Clear all
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notifications;
