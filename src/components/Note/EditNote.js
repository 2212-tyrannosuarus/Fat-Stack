import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateNote, deleteNote } from "../../reducers/noteSlice";
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
  Checkbox,
  Select,
} from "@chakra-ui/react";

export default function EditNote({ id }) {
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(
      updateNote({
        id: id,
        body: {
          transaction_note: note,
        },
      })
    );
  };

  const handleDelete = async () => {
    await dispatch(deleteNote(id));
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size="xxs"
        textColor="black"
        colorScheme="whiteAlpha"
      >
        Edit
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
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Note:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
            <Button
              onClick={(e) => {
                onClose();
                handleDelete();
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
