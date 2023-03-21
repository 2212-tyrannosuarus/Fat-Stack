import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, getNotes, deleteNote } from "../../reducers/noteSlice";
import {
  Box,
  IconButton,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  UnorderedList,
  useColorMode,
  Text,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import EditNote from "./EditNote";

export default function NoteItem({ transactionId }) {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);

  useEffect(() => {
    dispatch(getNotes({ transactionId }));
  }, []);

  return (
    <>
      {" "}
      {notes
        ? notes.map((note) => (
            <ListItem key={note.id}>
              <Checkbox>{note.transaction_note}</Checkbox>
              <Text color="gray.400" fontSize="xs">
                <EditNote id={note.id} />
              </Text>
            </ListItem>
          ))
        : null}
    </>
  );
}
