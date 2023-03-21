import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
// import { CUIAutoComplete } from "chakra-ui-autocomplete";
import {
  fetchAllTransactions,
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  selectSubCategories,
  fetchAllSubCategories,
} from "../../reducers/allTransactionsPageSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const allTransactions = useSelector(selectAllTransactions);
  const bankAccounts = useSelector(selectAllBankAccounts);
  const subCategories = useSelector(selectSubCategories);
  const subCategoriesAsStrings = subCategories.map((subCategory) => {
    return {
      value: subCategory.sub_category_name,
      label: subCategory.sub_category_name,
    };
  });

  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("none");

  const [newTransactionAccountId, setNewTransactionAccountId] = useState("");
  const [newTransactionMerchant, setNewTransactionMerchant] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
  const [newTransactionCreditDebit, setNewTransactionCreditDebit] =
    useState("debit");
  const [newTransactionAmount, setNewTransactionAmount] = useState("0");
  const [newTransactionSubCategory, setNewTransactionSubCategory] =
    useState("");

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllBankAccounts());
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  let totalAccountBalance = bankAccounts.reduce((accum, account) => {
    accum += Number(account.available_balance);
    return accum;
  }, 0);

  const handleAccountClick = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleNewMerchantChange = (e) => {
    setNewTransactionMerchant(e.target.value);
  };
  const handleNewAccountChange = (e) => {
    console.log("account id?", e.target.value);
    setNewTransactionAccountId(e.target.value);
  };
  const handleNewCategoryChange = (e) => {
    setNewTransactionSubCategory(e.target.value);
  };
  const handleNewCreditDebitChange = (e) => {
    setNewTransactionCreditDebit(e.target.value);
  };
  const handleNewDateChange = (e) => {
    setNewTransactionDate(e.target.value);
  };

  //want to make this the filter for categories
  // <CUIAutoComplete
  //   value={newTransactionSubCategory}
  //   disableCreateItem="true"
  //   items={subCategoriesAsStrings}
  //   placeholder="Pick a category "
  //   onChange={(e) => {
  //     handleNewCategoryChange(e);
  //   }}
  // />

  //these functions format the number input field in the new Transaction form
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const handleClear = () => {
    setNewTransactionAccountId("");
    setNewTransactionSubCategory("");
    setNewTransactionAmount(0);
    setNewTransactionDate("");
    setNewTransactionMerchant("");
  };

  const handleNewTransactionSubmit = async () => {
    let newTransaction = {
      account_id: newTransactionAccountId,
      merchant: newTransactionMerchant,
      date: newTransactionDate,
      amount: newTransactionAmount,
      credit_debit: newTransactionCreditDebit,
    };
    console.log(newTransaction);
    const postedTransaction = await axios.post(
      "/api/allTransactions",
      newTransaction
    );
  };

  return subCategories.length > 0 ? (
    <>
      <div>
        <div>Your accounts:</div>
        <ul>
          <li>
            <Button
              value={"all"}
              onClick={(e) => {
                handleAccountClick(e);
              }}
            >
              {"All Accounts"}|{totalAccountBalance}
            </Button>
          </li>
          {bankAccounts.map((account) => {
            return (
              <li key={account.account_id}>
                <Button
                  value={account.id}
                  onClick={(e) => {
                    handleAccountClick(e);
                  }}
                >
                  {account.account_name}|{account.available_balance}
                </Button>
              </li>
            );
          })}
        </ul>
        <div>filters</div>
        <label for="category">Category</label>
        <select
          id="category"
          onChange={(e) => {
            handleCategoryChange(e);
          }}
        >
          {subCategories.map((category) => {
            return (
              <option value={category.id}>{category.sub_category_name}</option>
            );
          })}
        </select>
        <label>Date</label>
      </div>

      <div>Transactions:</div>
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
      <div>
        Date............Description............Category............Amount
      </div>
      <ul>
        {allTransactions.map((transaction, idx) => {
          if (idx < 50) {
            if (
              (selectedAccount === "all" ||
                transaction.bankaccountId === Number(selectedAccount)) &&
              (selectedCategory === "none" ||
                Number(selectedCategory) === Number(transaction.subcategoryId))
            ) {
              return (
                <li>
                  <div>
                    {transaction.date}............
                    {transaction.merchant}............
                    {transaction.category}............
                    {transaction.amount}
                  </div>
                </li>
              );
            }
          }
        })}
      </ul>
    </>
  ) : (
    <>LOADING</>
  );
};

export default AllTransactions;
