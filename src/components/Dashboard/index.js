import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import ChartForOverview from "../ChartForOverview";
import GoalsComponent from "../Goals/GoalsComponent/Dashboard";
import DashIncome from "../Budget/DashIncome";

import AccountOverview from "../AllTransactions/AccountOverview";

const Dashboard = ({ goals }) => {
  return (
    <Box maxW="100vw" display="flex" flexWrap="wrap">
      <Box display="flex" flexWrap="wrap">
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={5}
          flexDirection="column"
          boxShadow="md"
          mr={12}
          mb={12}
        >
          <Text fontWeight="bold" fontSize="xl">
            My Accounts
          </Text>
          <Box>
            <AccountOverview />
          </Box>
        </Flex>
        <Flex
          bg="white"
          rounded="lg"
          w={800}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={5}
          mb={12}
          flexDirection="column"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl">
            Goals
          </Text>
          <GoalsComponent />
        </Flex>
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={5}
          mb={12}
          mr={12}
          flexDirection="column"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl">
            Budget Overview
          </Text>
          <Box>
            <ChartForOverview />
          </Box>
        </Flex>
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={5}
          flexDirection="column"
          boxShadow="md"
          mr={12}
          mb={12}
        >
          <Text fontWeight="bold" fontSize="xl">
            My Accounts
          </Text>
          <Box>
            <DashIncome />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
