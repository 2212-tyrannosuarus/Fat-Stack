import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const DeletePopup = (props) => {
  const { transactionId, handleDelete } = props;
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
