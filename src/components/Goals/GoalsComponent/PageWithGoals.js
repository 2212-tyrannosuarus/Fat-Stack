import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalBox from "./GoalBox";
import CreateGoal from "./CreateGoal";
import { v4 as uuidv4 } from "uuid";
import {
  getExistingGoals,
  selectGoalList,
  selectCompeltedGoals,
  getCompletedGoals,
} from "../../../reducers/goalPageSlice";
import {
  Wrap,
  WrapItem,
  Center,
  Flex,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Spacer,
  Button,
} from "@chakra-ui/react";
import {
  getInspirationQuote,
  selectInspiringQuote,
  selectGoalDirection,
  getGoalDirection,
} from "../../../reducers/openAiSlice";
import { BiArrowToLeft } from "react-icons/bi";
import { TbStar } from "react-icons/tb";

export default function PageWithGoals() {
  const [createGoals, setCreateGoals] = useState(false);
  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);
  const completedGoalList = useSelector(selectCompeltedGoals);
  const inspiringQuote = useSelector(selectInspiringQuote);
  const goalDirections = useSelector(selectGoalDirection);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getExistingGoals());
      await dispatch(getCompletedGoals());
      await dispatch(getInspirationQuote());
      await dispatch(getGoalDirection());
    };
    handleFetch();
  }, []);

  const handleAddGoal = () => {
    setCreateGoals(!createGoals);
  };

  return (
    <>
      <Flex>
        <Box width="100%">
          {createGoals ? (
            <>
              <CreateGoal />
              <Box ml="4rem" mt="3rem">
                {" "}
                <button onClick={handleAddGoal}>
                  {" "}
                  <BiArrowToLeft />
                </button>
              </Box>
            </>
          ) : (
            <>
              <Flex>
                <Box mt="3rem" mb="4rem" width="100%" pl="3rem" pr="10rem">
                  <Box width="100%">
                    <Flex justifyContent="space-between">
                      <Box>
                        <Heading size="lg">You go, rockstar!</Heading>
                        <Text ml="1rem">Here is an overview</Text>
                      </Box>
                      <Box>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          onClick={handleAddGoal}
                        >
                          + Create a new goal
                        </Button>
                      </Box>
                    </Flex>
                  </Box>

                  <Box mt="5rem">
                    <Box>
                      <Heading size="md" mb="1rem">
                        In Progress
                      </Heading>

                      {goalList.map((goal) => (
                        <GoalBox key={goal.id} goal={goal} />
                      ))}
                    </Box>
                    <Box mt="5rem">
                      {completedGoalList.length > 0 ? (
                        <Heading size="md" mb="1rem">
                          Completed
                        </Heading>
                      ) : null}
                      {completedGoalList.map((completedGoal) => (
                        <GoalBox key={completedGoal.id} goal={completedGoal} />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Spacer />
                <Box width="20%">
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
          )}
        </Box>
      </Flex>
    </>
  );
}
