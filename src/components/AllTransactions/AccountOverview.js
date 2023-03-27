import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./AllTransactions.css";
import {
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  selectSubCategories,
  fetchAllSubCategories,
  deleteSingleTransaction,
  fetchTransactionsFromDateToDate,
} from "../../reducers/allTransactionsPageSlice";

import {
  Box,
  Container,
  Flex,
  List,
  ListItem,
  Text,
  Button,
  IconButton,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AccountOverview = () => {
  const dispatch = useDispatch();

  const bankAccounts = useSelector(selectAllBankAccounts);
  const allTransactionsThisWeek = useSelector(selectAllTransactions);

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const formatDateObjects = (selectedDates) => {
    const monthLookup = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const formattedDates = selectedDates.map((date) => {
      const tempDate = date.toString().split(" ");
      let day;
      if (tempDate[2].length < 2) {
        day = "0" + tempDate[2];
      } else {
        day = tempDate[2];
      }
      let month = monthLookup[tempDate[1]];
      return tempDate[3] + "-" + month + "-" + day;
    });
    return formattedDates;
    // return { dates: { fromDate, toDate } };
  };
  useEffect(() => {
    dispatch(fetchAllBankAccounts());
    console.log("dates", oneWeekAgo, today);
    const fromDate = formatDateObjects([oneWeekAgo, today])[0];
    const toDate = formatDateObjects([oneWeekAgo, today])[1];
    dispatch(
      fetchTransactionsFromDateToDate({
        fromDate: fromDate,
        toDate: toDate,
      })
    );
  }, [dispatch]);
  if (bankAccounts.length > 0) {
    let totalAccountBalance = bankAccounts.reduce((accum, account) => {
      accum += Number(account.available_balance);
      return accum;
    }, 0);
  }

  const getWeeklyTotal = (allTransactionsThisWeek, thisAccount) => {
    const accountSpecificTransactions = allTransactionsThisWeek.filter(
      (transaction) => {
        console.log(
          "filter comparison",
          transaction.account_id,
          thisAccount.account_id
        );
        return transaction.account_id === thisAccount.account_id;
      }
    );
    if (accountSpecificTransactions.length > 0) {
      console.log("one week of transacitons", accountSpecificTransactions);
      const weeklyTotal = accountSpecificTransactions
        .reduce((accum, transaction) => {
          if (transaction.credit_debit === "debit") {
            accum += parseFloat(transaction.amount);
          }
          console.log(accum);
          return accum;
        }, 0)
        .toFixed(2);
      console.log("weely totaly", weeklyTotal);
      return weeklyTotal;
    } else return "0";
  };

  return bankAccounts.length > 0 ? (
    // <Box
    //   bg="white"
    //   rounded="lg"
    //   overflow="hidden"
    //   w={"300px"}
    //   h={"300px"}
    //   px={6}
    //   py={12}
    //   mr={5}
    //   display="flex"
    //   flexDirection="column"
    //   boxShadow="md"
    // >
    <Accordion allowToggle>
      <Flex
        direction={"column"}
        boxShadow="md"
        bg="white"
        rounded="lg"
        overflow="hidden"
      >
        {bankAccounts.map((account) => (
          <AccordionItem>
            <AccordionButton>
              <Flex w={"90%"} direction="row">
                <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                  {account.account_name}
                </Text>
                <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                  ${account.available_balance}
                </Text>
              </Flex>
              <AccordionIcon w={"10%"} />
            </AccordionButton>
            <AccordionPanel>
              <Divider />
              <Flex direction={"row"} justify={"flex-end"} w="90%" h={"50%"}>
                <Text
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  w={"50%"}
                >
                  Spending this week:
                </Text>
                <Text
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  w={"50%"}
                >
                  ${getWeeklyTotal(allTransactionsThisWeek, account)}
                </Text>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Flex>
    </Accordion>
  ) : (
    // </Box>
    <></>
  );
};

export default AccountOverview;
