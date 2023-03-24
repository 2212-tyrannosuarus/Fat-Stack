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
import AddTransactionModal from "./AddTransactionModal";

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
    newTransactionAmount,
    newTransactionDate,
    newTransactionMerchant,
    newTransactionSubCategory,
    bankAccounts,
    subCategoriesAsStrings,
    handleNewTransactionSubmit,
    handleNewMerchantChange,
    handleNewAccountChange,
    handleNewCategoryChange,
    handleNewCreditDebitChange,
    handleNewDateChange,
    handleClear,
    setNewTransactionAmount,
  } = props;

  return (
    <List w="1000px" p={"2"} flex="1">
      <ListItem borderRadius={"20px"} bg={"gray.200"} p={"2"}>
        <Flex justify={"space-between"} rowGap={"50px"} align={"flex-start"}>
          <Box w={"21%"} flex="1">
            <Text fontSize="lg">Date</Text>
          </Box>
          <Box w={"21%"} flex="1">
            <Text fontSize="lg">Description</Text>
          </Box>
          <Box w={"21%"} flex="1">
            <Text fontSize="lg">Category</Text>
          </Box>
          <Box w={"21%"} flex="1">
            <Text fontSize="lg">Amount</Text>
          </Box>
          <Box w={"16%"} flex="1">
            <AddTransactionModal
              subCategories={subCategories}
              newTransactionAmount={newTransactionAmount}
              newTransactionDate={newTransactionDate}
              newTransactionMerchant={newTransactionMerchant}
              newTransactionSubCategory={newTransactionSubCategory}
              bankAccounts={bankAccounts}
              subCategoriesAsStrings={subCategoriesAsStrings}
              handleNewTransactionSubmit={handleNewTransactionSubmit}
              handleNewMerchantChange={handleNewMerchantChange}
              handleNewAccountChange={handleNewAccountChange}
              handleNewCategoryChange={handleNewCategoryChange}
              handleNewCreditDebitChange={handleNewCreditDebitChange}
              handleNewDateChange={handleNewDateChange}
              handleClear={handleClear}
              setNewTransactionAmount={setNewTransactionAmount}
            />
          </Box>
        </Flex>
      </ListItem>
      {allTransactions.map((transaction, idx) => {
        //   console.log("category", transaction.subcategoryId);
        //   const transactionCategory = await
        let transactionCategory;
        let alternateColor = "";
        if (idx % 2 === 0) {
          alternateColor = "gray.100";
        }
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
              <ListItem bg={alternateColor}>
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
  );
};

export default TransactionList;
