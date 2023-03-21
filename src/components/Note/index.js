import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, getNotes } from "../../reducers/noteSlice";
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
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Note({ transactionId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes({ transactionId }));
  }, []);

  return (
    <>
      {" "}
      <Box>
        <List size="xl" variant="custom" spacing={5}>
          <AddNote id={transactionId} />
          <NoteItem transactionId={transactionId} />
        </List>
      </Box>
    </>
  );
}
