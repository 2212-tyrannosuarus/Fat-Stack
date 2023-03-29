import React, { useEffect } from "react";
import "./AllTransactions.css";
import { connect } from "react-redux";
import {
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  fetchTransactionsFromDateToDate,
} from "../../reducers/allTransactionsPageSlice";

import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Plaid from "../Plaid";

const AccountOverview = ({ user }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let userId = user.id;
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
  };
  useEffect(() => {
    dispatch(fetchAllBankAccounts({ userId }));
    const fromDate = formatDateObjects([oneWeekAgo, today])[0];
    const toDate = formatDateObjects([oneWeekAgo, today])[1];
    dispatch(
      fetchTransactionsFromDateToDate({
        userId: userId,
        fromDate: fromDate,
        toDate: toDate,
      })
    );
  }, [dispatch]);

  const getTotalAccountBalance = () => {
    let balance;
    if (bankAccounts.length > 0) {
      balance = bankAccounts.reduce((accum, account) => {
        accum += Number(account.available_balance);
        return accum;
      }, 0);
    }
    if (balance) {
      return balance.toFixed(2);
    }
  };
  const totalAccountBalance = getTotalAccountBalance();

  const getWeeklyTotal = (allTransactionsThisWeek, thisAccount) => {
    const accountSpecificTransactions = allTransactionsThisWeek.filter(
      (transaction) => {
        if (thisAccount === true) {
          return thisAccount;
        }
        return transaction.account_id === thisAccount.account_id;
      }
    );
    if (accountSpecificTransactions.length > 0) {
      const weeklyTotal = accountSpecificTransactions
        .reduce((accum, transaction) => {
          if (transaction.credit_debit === "debit") {
            accum += parseFloat(transaction.amount);
          }
          return accum;
        }, 0)
        .toFixed(2);
      return weeklyTotal;
    } else return "0";
  };

  return bankAccounts.length > 0 ? (
    <>
      <Accordion allowToggle>
        <Flex
          direction={"column"}
          boxShadow="md"
          bg="white"
          rounded="lg"
          overflow="hidden"
        >
          <AccordionItem>
            <AccordionButton>
              <Flex w={"90%"} direction="row">
                <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                  {"All Accounts"}
                </Text>
                <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                  {formatter.format(totalAccountBalance)}
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
                  Total spending this week:
                </Text>
                <Text
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  w={"50%"}
                >
                  {formatter.format(
                    getWeeklyTotal(allTransactionsThisWeek, true)
                  )}
                </Text>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          {bankAccounts.map((account) => (
            <AccordionItem>
              <AccordionButton>
                <Flex w={"90%"} direction="row">
                  <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                    {account.account_name}
                  </Text>
                  <Text fontWeight={"bold"} w={"50%"} fontSize={"1em"}>
                    {formatter.format(account.available_balance)}
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
      <Plaid />
    </>
  ) : (
    <>
      <Flex direction={"column"} justifyContent={"center"}>
        <Text fontWeight={"bold"}>You haven't connected an account!</Text>
        <Plaid />
      </Flex>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(AccountOverview);
