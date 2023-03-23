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
import { FaBell } from "react-icons/fa";

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
    <Box mr="3">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Notifications"
          icon={<FaBell />}
          variant="ghost"
          size="md"
          color={"gray.800"}
          fontSize="20px"
          fontWeight="normal"
          _focus={{ boxShadow: "none" }}
          _hover={{ background: "none" }}
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
              top="0.5rem"
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
              _hover={{ background: "gray.100" }}
            >
              <Box fontWeight="bold" fontSize="14px" mb={1}>
                {notification.source}
              </Box>
              <Box fontSize="12px">{notification.message}</Box>
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
                  borderRadius="full"
                  bg="white"
                  display="inline-block"
                  width="1rem"
                  height="1rem"
                  textAlign="center"
                  lineHeight="1rem"
                >
                  x
                </Box>
              </Box>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={() => setNotifications([])}>Clear all</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notifications;
