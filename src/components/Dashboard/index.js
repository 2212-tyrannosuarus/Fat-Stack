import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import ChartForOverview from "../ChartForOverview";
import GoalsComponent from "../Goals/GoalsComponent/Dashboard";
import DashBudget from "../Budget/DashBudget";
import AccountOverview from "../AllTransactions/AccountOverview";

const Dashboard = ({ goals }) => {
  return (
    <Box maxW="100%" maxH="100%" bg={"#f5f7fb"} display="flex" flexWrap="wrap">
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
        <Box
          maxW={{ base: "100%", sm: "100%", md: "800px", lg: "850px" }}
          minW={{ base: "100%", sm: "100%", md: "300px", lg: "500px" }}
          flex="1"
        >
          <Flex
            bg="white"
            rounded="lg"
            w="100%"
            h={"auto"}
            overflow="hidden"
            px={5}
            mr={12}
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
        </Box>
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
            Your Spending
          </Text>
          <Box>
            <ChartForOverview />
          </Box>
        </Flex>
        <Box
          maxW={{ base: "100%", sm: "100%", md: "200px", lg: "850px" }}
          flex="1"
        >
          <Flex
            rounded="lg"
            w="100%"
            h={"auto"}
            overflow="hidden"
            mr={12}
            pb={5}
            mb={12}
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <DashBudget />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
