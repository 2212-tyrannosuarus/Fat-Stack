import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashGoal from "./DashGoal";
import {
  getallGoals,
  getExistingGoals,
  selectGoalList,
} from "../../../reducers/goalPageSlice";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export function Dashboard({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getExistingGoals(user.id));
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const handleGoals = async () => {
      await dispatch(getallGoals());
    };
    handleGoals();
  }, []);

  if (goalList.length === 0) {
    return (
      <>
        <Text fontWeight={"bold"}>You don't have any goals yet!</Text>
        <Flex alignItems="center" mt={5}>
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight="bold"
            px={6}
            colorScheme={"red"}
            bg={"purple.500"}
            _hover={{ bg: "purple.300" }}
            onClick={() => navigate("/goals")}
          >
            Set a Goal
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Box>
      {goalList.map((goal) => (
        <DashGoal key={goal.id} goal={goal} />
      ))}
    </Box>
  );
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Dashboard);
