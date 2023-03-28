import React from "react";
import { Box, Text, Icon, Flex, Grid, Divider } from "@chakra-ui/react";
import { FcDepartment } from "react-icons/fc";
import ChartForOverview from "../ChartForOverview";
import GoalsComponent from "../Goals/GoalsComponent/Dashboard";
import AccountOverview from "../AllTransactions/AccountOverview";

const Dashboard = () => {
  return (
    <>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={12}
        mb={20}
        alignItems="start"
      >
        <Box
          bg="white"
          rounded="lg"
          w={600}
          h={400}
          overflow="hidden"
          px={5}
          pt={5}
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
        </Box>
        <Box
          bg="white"
          rounded="lg"
          w={600}
          h={400}
          overflow="hidden"
          px={5}
          pt={5}
          display="flex"
          flexDirection="column"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl">
            Your Budget
          </Text>
          <Divider />
          <Box>
            <ChartForOverview userId={1} />
          </Box>
        </Box>
        <Box
          bg="white"
          rounded="lg"
          w={600}
          h={400}
          overflow="hidden"
          px={5}
          pt={5}
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
        </Box>
        <Box
          bg="white"
          rounded="lg"
          w={600}
          h={400}
          overflow="hidden"
          px={5}
          pt={5}
          flexDirection="column"
          boxShadow="md"
        >
          <Box>
            <GoalsComponent />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Dashboard;
