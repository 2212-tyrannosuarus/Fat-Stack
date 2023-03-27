import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getGoal,
  selectGoal,
  deleteGoal,
  updateGoal,
} from "../../../reducers/goalPageSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function UpdateGoals({ goalid }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const goal = useSelector(selectGoal);

  useEffect(() => {
    const handleUpdateGoalFetch = async (id) => {
      await dispatch(getGoal(id));
    };

    if (goalid !== undefined) {
      handleUpdateGoalFetch(goalid);
    }
  }, [dispatch]);

  useEffect(() => {
    setDate(goal.goal_date || "");
    setAmount(goal.goalamount || 0);
  }, [goal]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(
      updateGoal({ id: goalid, body: { goal_date: date, goalamount: amount } })
    );
  };

  return (
    <>
      <Button colorScheme="teal" variant="ghost" onClick={onOpen}>
        ⚙️
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="whiteAlpha"
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Goals</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Goal Date:</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>New Amount:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={(e) => {
                handleUpdate(e);
                onClose();
              }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
