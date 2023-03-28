import React, { useEffect, useState } from "react";
import Title from "./DashIcons/Title";
import Completed from "./DashIcons/Completed";
import Progress from "./DashIcons/Progress";
import { Flex, Box, Text } from "@chakra-ui/react";
import {
  getallGoals,
  selectAllGoalsList,
} from "../../../reducers/goalPageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoalsList);
  const [completed, setCompleted] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  useEffect(() => {
    const handleGoals = async () => {
      await dispatch(getallGoals());
    };
    handleGoals();
  }, []);

  useEffect(() => {
    let completeCount = 0;
    let incompleteCount = 0;
    goals.forEach((goal) => {
      if (goal.completion_status === true) {
        completeCount += 1;
      } else {
        incompleteCount += 1;
      }
    });
    setIncompleteCount(incompleteCount);
    setCompleted(completeCount);
  }, [goals]);

  return (
    <>
      <Flex alignContent="center" direction="column">
        <Box>
          <Title />
        </Box>
        <Box>
          <Flex direction="row">
            <Flex direction="column" alignContent="center">
              <Completed />
              <Text textAlign="center" mt="2rem">
                {completed}
              </Text>
            </Flex>
            <Flex direction="column" alignContent="center">
              <Progress />
              <Text textAlign="center" mt="2rem">
                {incompleteCount}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
