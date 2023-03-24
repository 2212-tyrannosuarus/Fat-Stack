import React from "react";
import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { FcDonate, FcDepartment, FcMoneyTransfer } from "react-icons/fc";
import ChartForOVerview from "../ChartForOverview";

const Dashboard = () => {
  return (
    <>
      <Flex>
        <Box
          bg="white"
          rounded="lg"
          w={600}
          h={200}
          overflow="hidden"
          px={6}
          py={12}
          mr={5}
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
          px={6}
          py={12}
          mr={5}
          display="flex"
          flexDirection="column"
          boxShadow="md"
        >
          {/* <Icon as={FcDepartment} w={10} h={10} mb={4} /> */}
          <Box>
            {/* <Text fontWeight="bold" fontSize="xl" mb={2}>
              Add Multiple Accounts
            </Text>
            <Text fontSize="md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              viverra justo odio, sit amet mollis massa porttitor id.
            </Text> */}
            <ChartForOVerview userId={1}/>
          </Box>
        </Box>
        <Box
          bg="white"
          rounded="lg"
          w={200}
          h={500}
          overflow="hidden"
          px={6}
          py={12}
          mr={5}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              viverra justo odio, sit amet mollis massa porttitor id.
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
