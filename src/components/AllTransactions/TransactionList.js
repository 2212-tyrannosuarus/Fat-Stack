import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

const TransactionList = (props) => {
  const { allTransactions, selectedAccount, selectedCategory, subCategories } =
    props;

  return (
    <Container>
      <List w={1000} p={"2"}>
        <ListItem outline={"3px ridge"} p={"2"}>
          <Flex justify={"space-between"} rowGap={"50px"} align={"flex-start"}>
            <Box w={"23%"}>
              <Text fontSize="lg">Date</Text>
            </Box>
            <Box w={"23%"}>
              <Text fontSize="lg">Description</Text>
            </Box>
            <Box w={"23%"}>
              <Text fontSize="lg">Category</Text>
            </Box>
            <Box w={"23%"}>
              <Text fontSize="lg">Amount</Text>
            </Box>
            <Box w={"8%"}></Box>
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
          if (idx < 50) {
            if (
              (selectedAccount === "all" ||
                transaction.bankaccountId === Number(selectedAccount)) &&
              (selectedCategory === "none" ||
                Number(selectedCategory) === Number(transaction.subcategoryId))
            ) {
              return (
                <ListItem outline={"1px ridge"}>
                  <Flex
                    justify={"space-between"}
                    rowGap={"50px"}
                    align={"flex-start"}
                  >
                    <Box w={"23%"}>
                      <Text fontSize="lg">{transaction.date}</Text>
                    </Box>
                    <Box w={"23%"}>
                      <Text fontSize="lg">{transaction.merchant}</Text>
                    </Box>
                    <Box w={"23%"}>
                      <Text fontSize="lg">{transactionCategory}</Text>
                    </Box>
                    <Box w={"23%"}>
                      <Text fontSize="lg">{transaction.amount}</Text>
                    </Box>
                    <Box w={"8%"}>
                      <NavLink to={`./${transaction.id}`}>
                        <Text>View</Text>
                      </NavLink>
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
