import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button, Stack } from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import { DeleteIcon } from "@chakra-ui/icons";

function EditModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let {
    subCategory,
    budgetedAmount,
    handleSubmit,
    handleDeleteBudget,
    newBudgetedAmount,
    setNewBudgetedAmount,
  } = props;

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        className="edit-budget col-2 ms-auto"
        style={{ width: "80px" }}
      >
        <Button
          leftIcon={<BsPencil />}
          colorScheme="purple.500"
          variant="link"
          onClick={onOpen}
          style={{ height: "5px" }}
        >
          Edit
        </Button>
      </Stack>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your {subCategory} budget</ModalHeader>
          <ModalCloseButton />
          <form
            id="update-budget-form"
            onSubmit={(evt) =>
              handleSubmit(evt, subCategory, newBudgetedAmount)
            }
            className="column"
          >
            <ModalBody>
              <h4 className="mb-2">What is the budget amount ? </h4>
              <input
                type="text"
                class="form-control"
                id="defaultFormControlInput"
                placeholder={parseInt(budgetedAmount)}
                value={newBudgetedAmount}
                onChange={(evt) => setNewBudgetedAmount(evt.target.value)}
              />

              <Stack
                direction="row"
                spacing={0}
                className="edit-budget col-2 mt-2"
              >
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="purple"
                  variant="link"
                  onClick={(evt) => {
                    handleDeleteBudget(evt, subCategory);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  onClick={onClose}
                  colorScheme="purple"
                  variant="solid"
                >
                  Save
                </Button>
              </Stack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
