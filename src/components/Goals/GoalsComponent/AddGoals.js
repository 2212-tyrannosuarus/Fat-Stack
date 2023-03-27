import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { createGoal, selectGoal } from "../../../reducers/goalPageSlice";
import { useDispatch } from "react-redux";
import Rainy from "./GoalsIcon/Rainy";
import "./GoalsIcon/goalicon.css";

export default function AddGoals({ goal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [goalamount, setgoalamount] = useState(0);
  const [contributedamount, setcontributedamount] = useState(0);
  const [monthlySaveAmt, setmonthlySaveAmt] = useState(0);
  const [start_date, setStart_date] = useState(moment().format("YYYY-MM-DD"));
  const [goal_date, setGoal_date] = useState(moment().format("YYYY-MM-DD"));
  const [expectedDate, setexpectedDate] = useState(goal_date);

  const [showAmt, setShowAmt] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showSaveAmt, setShowSaveAmt] = useState(false);

  const handleShow = async (text) => {
    text === "$"
      ? await setShowAmt(true)
      : text === "date"
      ? await setShowDate(true)
      : await setShowSaveAmt(true);
  };

  const handleNewDate = (amount) => {
    let currentDate = moment();
    if (monthlySaveAmt !== undefined && monthlySaveAmt !== 0) {
      let monthDiff = goalamount / amount;
      let newDate = currentDate.add(monthDiff, "months");
      let newDates = newDate.format("YYYY-MM-DD");
      setexpectedDate(newDates);
    }
  };

  const handleDateCalc = (date) => {
    let currentDate = moment();
    let goalDate = moment(date);
    if (expectedDate > goalDate) {
      let monthDiff = expectedDate.diff(currentDate, "months", true);
      monthDiff <= 1
        ? setmonthlySaveAmt(goalamount)
        : setmonthlySaveAmt((goalamount / monthDiff).toFixed(2));
    } else {
      let monthDiff = goalDate.diff(currentDate, "months", true);
      monthDiff <= 1
        ? setmonthlySaveAmt(goalamount)
        : setmonthlySaveAmt((goalamount / monthDiff).toFixed(2));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createGoal({
        userId: 1,
        goalCategoryId: goal.id,
        name,
        goalamount,
        contributedamount,
        goal_date,
        start_date,
      })
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="rgba(0,0,0,0.5)">
        <Rainy name={goal.name}> </Rainy>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{goal.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <form>
              <FormControl>
                <FormLabel>Name your goal</FormLabel>
                <FormHelperText>
                  People with personalized goals are more likely to achieve them
                </FormHelperText>
                <Input
                  value={name}
                  onChange={(e) => {
                    handleShow("$");
                    setName(e.target.value);
                  }}
                />
              </FormControl>
              {showAmt ? (
                <FormControl mt="2rem">
                  <FormLabel>How much do you want to save?</FormLabel>
                  <FormHelperText>
                    You'll be able to change this later if you need to.
                  </FormHelperText>
                  <NumberInput
                    precision={2}
                    value={goalamount}
                    onChange={(e) => {
                      handleShow("date");
                      setgoalamount(e);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              ) : null}
              {showDate ? (
                <FormControl mt="2rem">
                  <FormLabel>Awesome! When should you begin?</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="date"
                    value={start_date}
                    onChange={(e) => {
                      setStart_date(e.target.value);
                    }}
                  />
                  <FormLabel>Awesome! When do you need it by?</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="date"
                    value={goal_date}
                    onChange={(e) => {
                      setGoal_date(e.target.value);
                      handleShow("");
                      handleDateCalc(e.target.value);
                    }}
                  />
                </FormControl>
              ) : null}
              {showSaveAmt ? (
                <FormControl mt="2rem">
                  <FormLabel>How much can you save each month?</FormLabel>
                  <NumberInput
                    precision={2}
                    value={monthlySaveAmt}
                    onChange={(e) => {
                      setmonthlySaveAmt(e);
                      if (
                        e !== "" &&
                        e !== "0.00" &&
                        e !== "0.0" &&
                        e !== "0." &&
                        e !== "0"
                      ) {
                        handleNewDate(e);
                      }
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>
                    Expected end date: {expectedDate}
                  </FormHelperText>
                </FormControl>
              ) : null}
            </form>
          </ModalBody>
          {showSaveAmt ? (
            <Button
              onClick={(e) => {
                handleFormSubmit(e);
                onClose();
                window.location.reload();
              }}
            >
              Set Goal
            </Button>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}
