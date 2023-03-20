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
import EditNote from "./EditNote";

export default function Note({ transactionId }) {
  const notes = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes({ transactionId }));
  }, []);

  return (
    <>
      {" "}
      <Box>
        <List size="xl" variant="custom" spacing={5}>
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
        </List>
      </Box>
    </>
  );
}
