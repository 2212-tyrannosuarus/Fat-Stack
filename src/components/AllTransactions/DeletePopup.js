import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  List,
  ListItem,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { deleteSingleTransaction } from "../../reducers/allTransactionsPageSlice";
import axios from "axios";

const DeletePopup = (props) => {
  const { transactionId, handleDelete } = props;
  console.log("handledelete", handleDelete);
  return (
    <>
      <IconButton
        onClick={(e) => {
          handleDelete(e, transactionId);
        }}
        aria-label="Delete"
        icon={<DeleteIcon />}
        variant="link"
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DeletePopup;
