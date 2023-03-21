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
import {DeleteIcon} from '@chakra-ui/icons';

function AddBudgetModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let {
    subCategoryName,
    handleSubmitAddBudget,
    addBudgetAmount,
    setAddBudgetAmount,
    categoriesForAddBudget
  } = props;

  console.log('categories inside modal ', categoriesForAddBudget);

  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}

      {/* <Stack direction="row" spacing={0} className="edit-budget col-2" > */}
        {/* <Button
          leftIcon={<BsPencil />}
          colorScheme="purple"
          variant="link"
          onClick={onOpen}
          style={{height: "5px"}}
        >
          Edit
        </Button> */}
        <button class="btn btn-sm btn-outline-primary col-2 ml-0" onClick={onOpen}>
          + Add Budget
        </button>
  

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a budget</ModalHeader>
          <ModalCloseButton />
          <form
            id="update-budget-form"
            onSubmit={(evt) =>
              handleSubmitAddBudget(evt, subCategoryName, addBudgetAmount)
            }
            className="column"
          >
            <ModalBody>
            <h4 className="mb-2">Choose a category</h4>
              {/* <input
                type="text"
                class="form-control"
                id="defaultFormControlInput"
                placeholder={parseInt(addBudgetAmount)}
                value={budgetedAmount}
                onChange={(evt) => setNewBudgetedAmount(evt.target.value)}
              /> */}
              <h4 className="mb-2">What is the budget amount ? </h4>
              <input
                type="text"
                class="form-control"
                id="defaultFormControlInput"
                placeholder="0"
                value={addBudgetAmount}
                onChange={(evt) => setAddBudgetAmount(evt.target.value)}
              />

<Stack direction="row" spacing={0} className="edit-budget col-2 mt-2">
        {/* <Button
          leftIcon={<DeleteIcon />}
          colorScheme="purple"
          variant="link"
          onClick={(evt) => {handleDeleteBudget(evt, subCategory); onClose()}}
        >
          Delete
        </Button> */}
      </Stack>
            </ModalBody>
            <ModalFooter>
            <Stack direction='row' spacing={4}>
              <Button onClick={onClose} >Cancel</Button>
              <Button type="submit" onClick={onClose} colorScheme='purple' variant='solid'>
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

export default AddBudgetModal;
