import React, { useState, useEffect } from "react";
import AddGoals from "./AddGoals";
import { getGoals, selectAllGoals } from "../../../reducers/goalPageSlice";
import { useDispatch, useSelector, connect } from "react-redux";
import "./GoalsIcon/goalicon.css";
import { v4 as uuidv4 } from "uuid";
import {
  Wrap,
  WrapItem,
  Center,
  Flex,
  Box,
  Heading,
  Text,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import {
  getInspirationQuote,
  selectInspiringQuote,
  selectGoalDirection,
  getGoalDirection,
} from "../../../reducers/openAiSlice";

export const CreateGoal = ({ user }) => {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);
  const inspiringQuote = useSelector(selectInspiringQuote);
  const goalDirections = useSelector(selectGoalDirection);

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
              <WrapItem key={goal.id}>
                <Center w="200px" h="120px" bg="white" borderRadius="20px">
                  <AddGoals goal={goal} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        <Box width="30%">
          <Heading size="md" mb="3rem" mt="3rem">
            Building goals
          </Heading>
          <Text mb="2rem" fontSize="m" as="i">
            "{inspiringQuote}"
          </Text>

          <OrderedList mt="3rem">
            {goalDirections.map((direction) => (
              <ListItem fontSize="xs" mb=".5rem" key={uuidv4()}>
                {direction}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      </Flex>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(CreateGoal);
