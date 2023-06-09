import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  selectGoalList,
  getExistingGoals,
  getUserAccount,
  selectBankAccount,
  createGoalTransaction,
  contributeToGoal,
} from "../../reducers/goalPageSlice";
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
  FormHelperText,
} from "@chakra-ui/react";
import {
  fetchAllBankAccounts,
  fetchTransactionsFromDateToDate,
} from "../../reducers/allTransactionsPageSlice";

export function GoalTransaction(props) {
  const { user, fromDate, toDate, handleGoalSubmit, setNewGoal } = props;
  const [merchant, setTransactionName] = useState("");
  const [account_id, setAccountId] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [amount, setAmount] = useState(0);
  const [hide_from_budget, setHideFromBudget] = useState(false);
  const [credit, setCredit] = useState("debit");
  const [userId, setUserId] = useState(1);
  const [bankaccountId, setBankAccountId] = useState(1);
  const [subcategoryId, setSubcategoryId] = useState(111);
  const [goalamount, setGoalAmount] = useState(0);
  const [missingamount, setMissingAmount] = useState(0);
  const [updatedBankAccount, setUpdatedBankAccount] = useState({});

  const dispatch = useDispatch();
  const goalList = useSelector(selectGoalList);
  const bankAccounts = useSelector(selectBankAccount);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bank = bankAccounts.filter(
      (account) => account.account_id === account_id
    );
    let newAmount = parseFloat(amount);
    const newGoal = await dispatch(
      createGoalTransaction({
        account_id,
        merchant,
        date,
        amount,
        hide_from_budget,
        credit_debit: credit,
        userId,
        bankaccountId: bank[0].id,
        subcategoryId,
      })
    );
    await dispatch(
      contributeToGoal({ name: merchant, contributedamount: newAmount })
    );
    //update account balance
    let avaialableBalanceDifferential = 0;
    avaialableBalanceDifferential -= Number(amount);

    const bankAccountToUpdate = bank;
    const availableBalanceToUpdate = Number(
      bankAccountToUpdate[0].available_balance
    );

    const newAccountBalance =
      Number(availableBalanceToUpdate) + Number(avaialableBalanceDifferential);
    const update = await axios.put(
      `/api/bankAccounts/${bankAccountToUpdate[0].id}`,
      { available_balance: newAccountBalance }
    );
    setUpdatedBankAccount(update);
    handleGoalSubmit(newGoal);
    setNewGoal(newGoal);
    console.log("userId, fromDate, toDate", user.id, fromDate, toDate);
    dispatch(
      fetchTransactionsFromDateToDate({
        userId: user.id,
        fromDate: fromDate,
        toDate: toDate,
      })
    );
  };

  useEffect(() => {
    const handleFetch = async (id = 1) => {
      await dispatch(getExistingGoals(user.id));
      await dispatch(getUserAccount(id));
    };
    handleFetch();
  }, []);

  useEffect(() => {
    dispatch(fetchAllBankAccounts());
  }, [updatedBankAccount]);

  const handleGoalAmount = (goalList, merchant) => {
    let newArr = goalList.filter((goal) => goal.name === merchant);
    setGoalAmount(newArr[0].goalamount);
    setMissingAmount(
      newArr[0].goalamount - parseInt(newArr[0].contributedamount)
    );
  };

  return (
    <>
      {goalList.length > 0 ? (
        <Button
          flex="1"
          w={"100%"}
          bg={"purple.100"}
          // alignSelf={"flex-end"}
          // justifySelf={"flex-end"}
          onClick={() => {
            onOpen();
            setTransactionName(goalList[0].name || "");
            setAccountId(bankAccounts[0].account_id || "");
            setBankAccountId(bankAccounts[0].id || 1);
          }}
        >
          Contribute To Goals
        </Button>
      ) : null}

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
          <ModalHeader>Add to Goals</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Goal:</FormLabel>
              <FormHelperText>
                Please choose a goal to contribute towards
              </FormHelperText>
              <Select
                required={true}
                value={merchant}
                onChange={(e) => {
                  setTransactionName(e.target.value);
                }}
              >
                {goalList.map((goal) => (
                  <option key={goal.id} value={goal.name}>
                    {" "}
                    {goal.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Select Account:</FormLabel>
              <FormHelperText>Choose from existing account</FormHelperText>
              <Select
                required={true}
                value={account_id}
                onChange={(e) => {
                  setAccountId(e.target.value);
                }}
              >
                {bankAccounts.map((account) => (
                  <option key={account.id} value={account.account_id}>
                    {" "}
                    {account.account_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                required={true}
                placeholder="Select Date and Time"
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Amount:</FormLabel>
              <FormHelperText>
                How much do you want to contribute to your goals?
              </FormHelperText>
              <Input
                required={true}
                ref={initialRef}
                placeholder="Amount"
                value={amount}
                onClick={() => handleGoalAmount(goalList, merchant)}
                onChange={(e) => setAmount(e.target.value)}
              />
              <FormHelperText>
                Goal: ${missingamount} / ${goalamount}!
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={(e) => {
                handleSubmit(e);
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

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(GoalTransaction);
