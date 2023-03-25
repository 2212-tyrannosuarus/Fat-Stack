import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Plaid from "../Plaid";
import {
  fetchSingleTransaction,
  selectSingleTransaction,
  selectAllTransactions,
  fetchAllTransactions,
} from "../../reducers/singleTransactionPageSlice";
import UpdateTransaction from "./UpdateTransaction";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  Text,
  Square,
  Icon,
  Box,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import "./SingleTransaction.css";
import Note from "../Note";
import GoalTransaction from "./GoalTransaction";
import TransactionRow from "./Table/TransactionRow";
import { SlCalender } from "react-icons/sl";
import { FcDebt, FcMoneyTransfer } from "react-icons/fc";
import AddNote from "../Note/AddNote";

const SingleTransction = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleTransaction = useSelector(selectSingleTransaction);
  const allTransactionsStats = useSelector(selectAllTransactions);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(fetchSingleTransaction(id));
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      //change 1 to userId
      await dispatch(fetchAllTransactions(1));
    };
    handleFetch();
  }, [singleTransaction]);

  return (
    <Flex>
      <Square bg="white">
        <div className="single-transaction-container">
          {singleTransaction.id ? (
            <div>
              <Stat>
                <Flex
                  direction="column"
                  width={["35vw", "40vw", "50vw", "75vw"]}
                >
                  <Flex
                    direction={{ sm: "column", lg: "row" }}
                    justifyContent={{ sm: "center", lg: "space-between" }}
                    alignItems={{ sm: "center" }}
                    w="100%"
                    my={{ md: "12px" }}
                  >
                    <Text
                      color={textColor}
                      fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                      fontWeight="bold"
                    >
                      Transaction Summary
                    </Text>
                    <Flex alignItems="">
                      <Icon
                        as={SlCalender}
                        color="gray.400"
                        fontSize="md"
                        me="6px"
                      ></Icon>
                      <Text
                        color="gray.400"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {singleTransaction.date}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    color="gray.400"
                    fontSize={{ sm: "xs", md: "xs" }}
                    fontWeight="semibold"
                    my="10px"
                    as="samp"
                  >
                    {singleTransaction.account_id}
                  </Text>
                  {singleTransaction.credit_debit === "debit" ? (
                    <TransactionRow
                      name={singleTransaction.merchant}
                      logo={FcDebt}
                      price={singleTransaction.amount}
                      credit={singleTransaction.credit_debit}
                      transaction={singleTransaction}
                    />
                  ) : (
                    <TransactionRow
                      name={singleTransaction.merchant}
                      logo={FcMoneyTransfer}
                      price={singleTransaction.amount}
                      credit={singleTransaction.credit_debit}
                      transaction={singleTransaction}
                    />
                  )}
                </Flex>
                <Flex flexDirection="column">
                  <UpdateTransaction />
                  <AddNote id={singleTransaction.id} />
                  {/* <GoalTransaction /> */}
                  <Note
                    notesProp={singleTransaction.notes}
                    transactionId={singleTransaction.id}
                    transaction={singleTransaction}
                  />
                </Flex>
                <Flex direction="row">
                  <Stat mt="3rem">
                    <StatLabel>Transaction Type:</StatLabel>
                    <StatHelpText>
                      <StatArrow
                        type={
                          singleTransaction.credit_debit === "credit"
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {singleTransaction.credit_debit === "credit"
                        ? "Credit"
                        : "Debit"}
                    </StatHelpText>
                  </Stat>
                  <Flex direction="column" mt="3rem">
                    <Stat>
                      <StatLabel>Cumulative Earning</StatLabel>
                      <StatNumber>${allTransactionsStats.creditSum}</StatNumber>
                      {singleTransaction.credit_debit === "credit" ? (
                        <StatHelpText>
                          <StatArrow type="increase" />
                          <Tooltip
                            label="In comparison to average income transactions!"
                            aria-label="A tooltip"
                          >
                            {(
                              (parseInt(singleTransaction.amount) /
                                parseInt(allTransactionsStats.creditAverage)) *
                              100
                            ).toFixed(2) + "%"}
                          </Tooltip>
                        </StatHelpText>
                      ) : null}
                    </Stat>

                    <Stat>
                      <StatLabel>Cumulative Spending</StatLabel>
                      <StatNumber>${allTransactionsStats.debitSum}</StatNumber>
                      {singleTransaction.credit_debit === "debit" ? (
                        <StatHelpText>
                          <StatArrow type="decrease" />
                          <Tooltip
                            label="In comparison to average spending transactions!"
                            aria-label="A tooltip"
                          >
                            {(
                              (parseInt(singleTransaction.amount) /
                                parseInt(allTransactionsStats.debitAverage)) *
                              100
                            ).toFixed(2) + "%"}
                          </Tooltip>
                        </StatHelpText>
                      ) : null}
                    </Stat>
                  </Flex>
                </Flex>
              </Stat>
              <StatGroup>
                {/* <Stat>
                  <StatLabel>Merchant:</StatLabel>
                  <StatNumber>{singleTransaction.merchant} </StatNumber>
                  <StatHelpText
                    textColor={
                      singleTransaction.credit_debit === "credit"
                        ? "green"
                        : "red"
                    }
                  >
                    {" "}
                    {singleTransaction.credit_debit}
                  </StatHelpText>
                </Stat> */}

                {/* <Stat>
                  <StatLabel>Hide from Budget</StatLabel>
                  <StatNumber>
                    {singleTransaction.hide_from_budget ? "True" : "False"}
                  </StatNumber>
                </Stat> */}
              </StatGroup>
            </div>
          ) : null}
          {/* <Plaid /> */}
        </div>
      </Square>
    </Flex>
  );
};

export default SingleTransction;
