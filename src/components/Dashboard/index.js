import React from "react";
import { Box, Text, Icon, Flex } from "@chakra-ui/react";

import { FcDepartment } from "react-icons/fc";
import ChartForOverview from "../ChartForOverview";
import GoalsComponent from "../Goals/GoalsComponent/Dashboard";

const Dashboard = () => {
  return (
    <Flex flexDirection={"row"}>
      <Box
        bg="white"
        rounded="lg"
        w={500}
        h={400}
        overflow="hidden"
        px={5}
        pt={5}
        mr={5}
        flexDirection="column"
        boxShadow="md"
      >
        <Box>
          <Text fontWeight="bold" fontSize="xl" mb={10}>
            My Trends
          </Text>
        </Box>
        <Box>
          <ChartForOverview userId={1} />
        </Box>
      </Box>
      <Box
        bg="white"
        rounded="lg"
        w={500}
        h={400}
        overflow="hidden"
        px={5}
        pt={5}
        mr={5}
        flexDirection="column"
        boxShadow="md"
      >
        <Box>
          <Text fontWeight="bold" fontSize="xl" mb={10}>
            Account overview
          </Text>
        </Box>
        <Icon as={FcDepartment} w={10} h={10} />
        <Box>
          <Text fontWeight="bold" fontSize="xl">
            Add Multiple Accounts
          </Text>
          <Text fontSize="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            viverra justo odio, sit amet mollis massa porttitor id.
          </Text>
        </Box>
      </Box>
      <GoalsComponent />
    </Flex>
  );
};

export default Dashboard;
