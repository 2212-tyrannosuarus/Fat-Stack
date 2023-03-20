import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FcDonate, FcDepartment, FcMoneyTransfer } from "react-icons/fc";
import Sidebar from "../Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  return (
    <Box
      bg="white"
      rounded="lg"
      w={400}
      h={400}
      overflow="hidden"
      px={6}
      py={12}
      display="flex"
      flexDirection="column"
      boxShadow="md"
    >
      <Icon as={FcDepartment} w={10} h={10} mb={4} />
      <Box>
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          Add Multiple Accounts
        </Text>
        <Text fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra
          justo odio, sit amet mollis massa porttitor id.
        </Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
