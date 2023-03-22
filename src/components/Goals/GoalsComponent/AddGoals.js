import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export default function AddGoals({ goal }) {
  const [name, setName] = useState("");
  const [goalamount, setgoalamount] = useState(0);
  const [contributedamount, setcontributedamount] = useState(0);
  const [monthlySaveAmt, setmonthlySaveAmt] = useState(0);
  const [goal_date, setGoal_date] = useState(moment().format("YYYY-MM-DD"));
  const [expectedDate, setexpectedDate] = useState("");

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

  const handleDateCalc = () => {
    let currentDate = moment();
    let goalDate = moment(goal_date);
    let monthDiff = goalDate.diff(currentDate, "months", true);
    monthDiff <= 1
      ? setmonthlySaveAmt(goalamount)
      : setmonthlySaveAmt((goalamount / monthDiff).toFixed(2));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{goal.name}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{goal.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>Name your goal</FormLabel>
                <FormHelperText>
                  People who personalize their goals are more likely to achieve
                  them
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
                <FormControl>
                  <FormLabel>How much do you want to save?</FormLabel>
                  <FormHelperText>
                    You'll be able to change this later if you need to.
                  </FormHelperText>
                  <Input
                    precision={2}
                    value={goalamount}
                    onChange={(e) => {
                      handleShow("date");
                      setgoalamount(e.target.value);
                    }}
                  ></Input>
                </FormControl>
              ) : null}
              {showDate ? (
                <FormControl>
                  <FormLabel>Awesome! When do you need it by?</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="date"
                    value={goal_date}
                    onChange={(e) => {
                      setGoal_date(e.target.value);
                      handleShow("");
                    }}
                  />
                </FormControl>
              ) : null}
              {showSaveAmt ? (
                <FormControl>
                  <FormLabel>How much can you save each month?</FormLabel>
                  <Input
                    precision={2}
                    value={monthlySaveAmt}
                    onClick={handleDateCalc}
                    onChange={(e) => {
                      setmonthlySaveAmt(e.target.value);
                    }}
                  ></Input>
                  <FormHelperText>
                    Expected end date: {goal_date}
                  </FormHelperText>
                </FormControl>
              ) : null}
            </form>
          </ModalBody>
          <Button>Set Goal</Button>
        </ModalContent>
      </Modal>
    </>
  );
}
