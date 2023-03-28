import React from "react";
import {
  Box,
  Text,
  Icon,
  Flex,
  Grid,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { FcDepartment } from "react-icons/fc";
import ChartForOverview from "../ChartForOverview";
import GoalsComponent from "../Goals/GoalsComponent/Dashboard";
import AccountOverview from "../AllTransactions/AccountOverview";

const Dashboard = () => {
  return (
    <Box maxW="100vw" display="flex" flexWrap="wrap">
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={16}>
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={10}
          flexDirection="column"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl">
            Account overview
          </Text>
          <Divider />
          <Box>
            <AccountOverview />
          </Box>
        </Flex>
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={10}
          flexDirection="column"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl">
            Your Budget
          </Text>
          <Divider />
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
          py={10}
          flexDirection="column"
          boxShadow="md"
        >
          <Box>
            <Text fontWeight="bold" fontSize="xl">
              Account overview
            </Text>
            <Divider />
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
        </Flex>
        <Flex
          bg="white"
          rounded="lg"
          w={500}
          h={"auto"}
          overflow="hidden"
          px={5}
          py={10}
          flexDirection="column"
          boxShadow="md"
        >
          <Box>
            <GoalsComponent />
          </Box>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
