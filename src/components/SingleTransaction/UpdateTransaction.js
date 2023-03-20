import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateSingleTransaction,
  selectAllSubCat,
  fetchAllSubCat,
  updateAllTransactionCat,
  selectSingleTransaction,
} from "../../reducers/singleTransactionPageSlice";
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

export default function UpdateTransaction() {
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [subcategoryId, setCategoryId] = useState(27);
  const [hideFromBudget, setHideFromBudget] = useState(false);

  const [changeAll, setChangeAll] = useState(false);
  const allSubCategories = useSelector(selectAllSubCat);
  const { id } = useParams();
  const transaction = useSelector(selectSingleTransaction);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    dispatch(fetchAllSubCat());
    setMerchant(transaction.merchant || "");
    setDate(transaction.date || "");
    setAmount(transaction.amount || "");
    setHideFromBudget(transaction.hide_from_budget || false);
  }, [dispatch, transaction]);

  const handleUpdate = async (event) => {
    console.log("called");
    event.preventDefault();
    if (changeAll) {
      await dispatch(
        updateAllTransactionCat({
          name: transaction.merchant,
          body: {
            merchant,
            date,
            amount,
            hide_from_budget: hideFromBudget,
            subcategoryId,
          },
        })
      );
    }
    await dispatch(
      updateSingleTransaction({
        id: id,
        body: {
          merchant,
          date,
          amount,
          hide_from_budget: hideFromBudget,
          subcategoryId,
        },
      })
    );
  };

  return (
    <>
      <Button onClick={onOpen} size="xs">
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
          <ModalHeader>Update Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Merchant:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Merchant"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Amount:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Checkbox
                value={changeAll}
                onChange={(e) => {
                  setChangeAll(!changeAll);
                }}
              >
                Apply to All
              </Checkbox>
            </FormControl>

            <FormControl>
              <Checkbox
                value={hideFromBudget}
                onChange={(e) => {
                  setHideFromBudget(!hideFromBudget);
                }}
              >
                {!hideFromBudget ? "Show in budget" : "Hide in Budget"}
              </Checkbox>
            </FormControl>

            <FormControl>
              <Select
                id="color_category"
                name="color_category"
                value={subcategoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  console.log(subcategoryId);
                }}
              >
                {allSubCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {" "}
                    {option.sub_category_name}
                  </option>
                ))}
              </Select>
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
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
