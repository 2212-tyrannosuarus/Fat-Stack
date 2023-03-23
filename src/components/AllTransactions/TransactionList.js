import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeletePopup from "./DeletePopup";
import {
  Box,
  Container,
  Flex,
  List,
  ListItem,
  Text,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { current } from "@reduxjs/toolkit";

const TransactionList = (props) => {
  const {
    allTransactions,
    handleDelete,
    selectedAccount,
    selectedCategory,
    subCategories,
    totalPageCount,
    transactionsPerPage,
    currentPage,
  } = props;

  return (
    <Container>
      <List w={1000} p={"2"}>
        <ListItem outline={"3px ridge"} p={"2"}>
          <Flex justify={"space-between"} rowGap={"50px"} align={"flex-start"}>
            <Box w={"21%"}>
              <Text fontSize="lg">Date</Text>
            </Box>
            <Box w={"21%"}>
              <Text fontSize="lg">Description</Text>
            </Box>
            <Box w={"21%"}>
              <Text fontSize="lg">Category</Text>
            </Box>
            <Box w={"21%"}>
              <Text fontSize="lg">Amount</Text>
            </Box>
            <Box w={"16%"}></Box>
          </Flex>
        </ListItem>
        {allTransactions.map((transaction, idx) => {
          //   console.log("category", transaction.subcategoryId);
          //   const transactionCategory = await
          let transactionCategory;
          subCategories.forEach((subcat) => {
            if (transaction.subcategoryId === subcat.id) {
              transactionCategory = subcat.sub_category_name;
            }
          });
          if (
            idx < currentPage * transactionsPerPage &&
            idx > (currentPage - 1) * transactionsPerPage
          ) {
            if (
              (selectedAccount === "all" ||
                transaction.bankaccountId === Number(selectedAccount)) &&
              (selectedCategory === "none" ||
                Number(selectedCategory) === Number(transaction.subcategoryId))
            ) {
              return (
                <ListItem outline={"1px ridge"}>
                  <Flex
                    direction={"row"}
                    justify={"space-between"}
                    align={"center"}
                  >
                    <Box w={"21%"}>
                      <Text fontSize="lg">{transaction.date}</Text>
                    </Box>
                    <Box w={"21%"}>
                      <Text fontSize="lg">{transaction.merchant}</Text>
                    </Box>
                    <Box w={"21%"}>
                      <Text fontSize="lg">{transactionCategory}</Text>
                    </Box>
                    <Box w={"21%"}>
                      <Text fontSize="lg">{transaction.amount}</Text>
                    </Box>
                    <Box w={"10%"}>
                      <NavLink to={`/transactions/${transaction.id}`}>
                        <Text>View</Text>
                        <ExternalLinkIcon />
                      </NavLink>
                    </Box>
                    <Box w={"6%"}>
                      <DeletePopup
                        handleDelete={handleDelete}
                        transactionId={transaction.id}
                      />
                    </Box>
                  </Flex>
                </ListItem>
              );
            }
          }
        })}
      </List>
    </Container>
  );
};

export default TransactionList;
