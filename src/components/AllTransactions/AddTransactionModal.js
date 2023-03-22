import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
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

const AddTransactionModal = (props) => {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let {
    newTransactionAmount,
    newTransactionDate,
    newTransactionMerchant,
    newTransactionSubCategory,
    bankAccounts,
    subCategories,
    subCategoriesAsStrings,
    handleNewAccountChange,
    handleNewCategoryChange,
    handleNewCreditDebitChange,
    handleNewDateChange,
    handleNewMerchantChange,
    handleNewTransactionSubmit,
    handleClear,
    setNewTransactionAmount,
  } = props;
  return (
    <>
      <Button onClick={onOpen}>New Transaction</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>Account</FormLabel>
                <Select
                  placeholder={"Select Account"}
                  onChange={(e) => {
                    handleNewAccountChange(e);
                  }}
                >
                  {bankAccounts.map((account) => {
                    return (
                      <option value={account.account_id}>
                        {account.account_name}
                      </option>
                    );
                  })}
                </Select>
                <FormHelperText>Choose from existing accounts</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={newTransactionMerchant}
                  onChange={(e) => {
                    handleNewMerchantChange(e);
                  }}
                />
                <FormHelperText>
                  Briefly describe transaction. Eg: Amazon, Spotify...
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>

                <Select
                  onChange={(e) => {
                    handleNewCategoryChange(e);
                  }}
                  items={subCategoriesAsStrings}
                  value={newTransactionSubCategory}
                >
                  {subCategories.map((category) => {
                    return (
                      <option value={category.id}>
                        {category.sub_category_name}
                      </option>
                    );
                  })}
                </Select>
                <FormHelperText>Choose from list of Categories</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  type="date"
                  value={newTransactionDate}
                  onChange={(e) => {
                    handleNewDateChange(e);
                  }}
                />
                <FormHelperText>Choose from existing account</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  precision={2}
                  step={0.1}
                  value={format(newTransactionAmount)}
                  onChange={(amountString) =>
                    setNewTransactionAmount(parse(amountString))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Select the transaction amount</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Income or expense</FormLabel>
                <RadioGroup defaultValue="debit">
                  <Stack spacing={5} direction="row">
                    <Radio
                      colorScheme="red"
                      value="debit"
                      onChange={(e) => {
                        handleNewCreditDebitChange(e);
                      }}
                    >
                      Expense
                    </Radio>
                    <Radio
                      colorScheme="green"
                      value="credit"
                      onChange={(e) => {
                        handleNewCreditDebitChange(e);
                      }}
                    >
                      Income
                    </Radio>
                  </Stack>
                </RadioGroup>
                <FormHelperText>
                  Was this transaction income or an expense?
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <Button onClick={handleNewTransactionSubmit}>Submit</Button>
          <ModalFooter>
            <Button onClick={handleClear}>Clear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
