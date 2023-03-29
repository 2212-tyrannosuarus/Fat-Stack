import React, { useState } from "react";
import { Progress, Flex, Box, Image, Heading, Text } from "@chakra-ui/react";
import {
  FcPuzzle,
  FcKey,
  FcIdea,
  FcLandscape,
  FcSafe,
  FcSimCardChip,
  FcDonate,
  FcMoneyTransfer,
  FcLightAtTheEndOfTunnel,
} from "react-icons/fc";

const icons = [
  <FcPuzzle />,
  <FcKey />,
  <FcIdea />,
  <FcLandscape />,
  <FcSafe />,
  <FcSimCardChip />,
  <FcDonate />,
  <FcMoneyTransfer />,
  <FcLightAtTheEndOfTunnel />,
];
export default function DashGoal({ goal }) {
  const percentCompleted = (goal.contributedamount / goal.goalamount) * 100;
  const [randomIcon, setRandomIcon] = useState(() => {
    const index = Math.floor(Math.random() * icons.length);
    return icons[index];
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={5}
      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <Flex align="center">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize="100px"
          mr="4"
          style={{ alignSelf: "flex-start", fontSize: "48px" }}
        >
          {randomIcon}
        </Box>
        <Box flex="1">
          <Flex justify="space-between">
            <Heading size="sm">{goal.name}</Heading>
            <Text ml="4">{percentCompleted.toFixed(2)}%</Text>
          </Flex>
          <Progress
            mt="2"
            value={percentCompleted}
            colorScheme="purple"
            borderRadius="full"
            bgGradient={`linear(to-r, #BC9CFF ${percentCompleted}%, "white" ${percentCompleted}% )`}
          />
        </Box>
      </Flex>
    </Box>
  );
}
