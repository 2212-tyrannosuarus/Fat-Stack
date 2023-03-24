import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import "./AllTransactions.css";

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
} from "@chakra-ui/react";

const FilterBar = (props) => {
  const {
    subCategories,
    handleCategoryChange,
    selectedDates,
    setSelectedDates,
    handleAccountClick,
    totalAccountBalance,
    bankAccounts,
  } = props;
  return (
    <List allowToggle w={"100%"} allowMultiple defaultIndex={[0, 1]}>
      <ListItem w="100%">
        <Text>
          <Box as="span" fontSize={"2xl"} flex="1" textAlign={"left"}>
            Your Accounts
          </Box>
        </Text>
        <Flex direction={"column"}>
          <Box bg={"purple.200"} borderRadius={"20px"}>
            <Button
              size={"lg"}
              w={"100%"}
              variant={"ghost"}
              value={"all"}
              onClick={(e) => {
                handleAccountClick(e);
              }}
            >
              All Accounts|
              {totalAccountBalance}
            </Button>
          </Box>
          {bankAccounts.map((account, idx) => {
            let varyColor = 200;
            if (idx % 2 === 0) {
              varyColor = 100;
            }
            return (
              <Box
                bg={`purple.${varyColor}`}
                borderRadius={"20"}
                key={account.account_id}
              >
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  w={"100%"}
                  value={account.id}
                  onClick={(e) => {
                    handleAccountClick(e);
                  }}
                >
                  {account.account_name}|{account.available_balance}
                </Button>
              </Box>
            );
          })}
        </Flex>
      </ListItem>
      <ListItem>
        <Text>
          <Box fontSize={"2xl"} flex="1" textAlign={"left"}>
            Filters
          </Box>
        </Text>
        <Flex direction={"column"}>
          <Box>
            <Text fontSize={"lg"}>Category</Text>
            <Select
              id="category"
              onChange={(e) => {
                handleCategoryChange(e);
              }}
            >
              {subCategories.map((category) => {
                return (
                  <option value={category.id}>
                    {category.sub_category_name}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box>
            <Text fontSize={"lg"}>Date</Text>
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
              propsConfigs={{
                inputProps: {
                  size: "lg",
                  _active: {
                    border: "purple",
                  },
                  _visited: {
                    border: "purple",
                  },
                  _focus: {
                    border: "none",
                  },
                },
              }}
            />
          </Box>
        </Flex>
      </ListItem>
    </List>
  );
};

export default FilterBar;
