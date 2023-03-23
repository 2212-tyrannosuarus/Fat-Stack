import React, { useState, useEffect } from "react";
import AddGoals from "./AddGoals";
import { getGoals, selectAllGoals } from "../../../reducers/goalPageSlice";
import { useDispatch, useSelector } from "react-redux";
import "./GoalsIcon/goalicon.css";
import {
  Wrap,
  WrapItem,
  Center,
  Flex,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  getInspirationQuote,
  selectInspiringQuote,
  selectGoalDirection,
  getGoalDirection,
} from "../../../reducers/openAiSlice";

const CreateGoal = () => {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);
  const inspiringQuote = useSelector(selectInspiringQuote);
  const goalDirections = useSelector(selectGoalDirection);
  console.log(inspiringQuote);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoals());
      await dispatch(getInspirationQuote());
      await dispatch(getGoalDirection());
    };
    handleFetch();
  }, []);

  return (
    <>
      <Flex>
        <Box>
          <Heading size="lg" mb="3rem" ml="3rem" mt="3rem">
            Choose a category of goal to reach fulfillment
          </Heading>
          <Wrap spacing="30px" justify="center">
            {goals.map((goal) => (
              <WrapItem>
                <Center w="200px" h="120px" bg="white" borderRadius="20px">
                  <AddGoals key={goal.id} goal={goal} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box width="20%" colorScheme="whiteAlpha">
          <Heading size="md" mb="5rem" mt="3rem">
            Building goals
          </Heading>
          <Text fontColor="grey" fontSize="m">
            "{inspiringQuote}"
          </Text>

          <Text fontColor="grey" fontSize="m">
            {goalDirections}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default CreateGoal;
