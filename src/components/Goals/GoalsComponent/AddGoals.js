import React, { useEffect, useState } from "react";
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

export default function AddGoals() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>New Goals</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Goals</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>Name your goal</FormLabel>
                <FormHelperText>
                  People who personalize their goals are more likely to achieve
                  them
                </FormHelperText>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>How much do you want to save?</FormLabel>
                <FormHelperText>
                  You'll be able to change this later if you need to.
                </FormHelperText>
                <NumberInput precision={2} step={0.1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Awesome! When do you need it by?</FormLabel>
                <Input placeholder="Select Date and Time" type="date" />
              </FormControl>

              <FormControl>
                <FormLabel>How much can you save each month?</FormLabel>
                <NumberInput precision={2} step={0.1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Expected Goal Date:</FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <Button>Set Goal</Button>
        </ModalContent>
      </Modal>
    </>
  );
}
