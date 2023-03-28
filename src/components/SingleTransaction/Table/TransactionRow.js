import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSingleTransactionSubCat,
  selectSingleTransactionSubCat,
} from "../../../reducers/singleTransactionPageSlice";

function TransactionRow(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const { name, date, logo, price, id, credit, transaction } = props;
  const dispatch = useDispatch();
  const subCategory = useSelector(selectSingleTransactionSubCat);

  useEffect(() => {
    const handleSubFetch = async () => {
      dispatch(fetchSingleTransactionSubCat(transaction.subcategoryId));
    };
    handleSubFetch();
  }, [transaction]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Flex my="1rem" justifyContent="space-between">
      <Flex alignItems="">
        <Box
          me="12px"
          borderRadius="50%"
          color={
            price[0] === "+"
              ? "green.400"
              : price[0] === "-"
              ? "red.400"
              : "gray.400"
          }
          border="1px solid"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="60px"
          h="60px"
        >
          <Icon as={logo} boxSize={8} />
        </Box>
        <Flex direction="column">
          <Text
            fontSize={{ sm: "md", md: "lg", lg: "md" }}
            color={textColor}
            fontWeight="bold"
          >
            {name}
          </Text>
          <Text
            fontSize={{ sm: "xs", md: "sm", lg: "xs" }}
            color="gray.400"
            fontWeight="semibold"
          >
            {subCategory.sub_category_name}
          </Text>
        </Flex>
      </Flex>
      <Box
        color={
          price[0] === "+"
            ? "green.400"
            : price[0] === "-"
            ? "red.400"
            : { textColor }
        }
      >
        <Text
          fontSize={{ sm: "lg", md: "md", lg: "xl" }}
          fontWeight="bold"
          color={credit === "debit" ? "red" : "green"}
        >
          {formatter.format(price)}
        </Text>
      </Box>
    </Flex>
  );
}

export default TransactionRow;
