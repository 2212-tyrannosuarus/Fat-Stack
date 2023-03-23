import React, { useState, useEffect } from "react";
import AddGoals from "./AddGoals";
import { getGoals, selectAllGoals } from "../../../reducers/goalPageSlice";
import { useDispatch, useSelector } from "react-redux";
import "./GoalsIcon/goalicon.css";
import { Wrap, WrapItem, Center } from "@chakra-ui/react";

const CreateGoal = () => {
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);
  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoals());
    };
    handleFetch();
  }, []);

  return (
    <>
      <Wrap spacing="30px" justify="center">
        {goals.map((goal) => (
          <WrapItem>
            <Center w="200px" h="120px" bg="white" borderRadius="20px">
              <AddGoals key={goal.id} goal={goal} />
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default CreateGoal;
