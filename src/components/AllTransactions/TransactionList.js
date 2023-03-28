import React from "react";
import { NavLink } from "react-router-dom";
import DeletePopup from "./DeletePopup";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import AddTransactionModal from "./AddTransactionModal";

const TransactionList = (props) => {
  const {
    allTransactions,
    handleDelete,
    selectedAccount,
    selectedCategory,
    subCategories,
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
      <ListItem
        w={"100%"}
        justify={"center"}
        borderRadius={"20px"}
        bg={"gray.200"}
        p={"2"}
      >
        <Flex justify={"space-between"} align={"flex-start"}>
          <Box w={"21%"} flex="100">
            <Text fontSize="lg">Date</Text>
          </Box>
          <Box w={"21%"} flex="105">
            <Text fontSize="lg">Description</Text>
          </Box>
          <Box w={"21%"} flex="100">
            <Text fontSize="lg">Category</Text>
          </Box>
          <Box w={"21%"} flex="97">
            <Text fontSize="lg">Amount</Text>
          </Box>
          <Box w={"16%"} flex="90">
            {bankAccounts.length > 0 ? (
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
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </ListItem>
      {allTransactions.length > 0 ? (
        allTransactions.map((transaction, idx) => {
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
              (selectedCategory === "None" ||
                Number(selectedCategory) === Number(transaction.subcategoryId))
            ) {
              return (
                <ListItem
                  key={transaction.id}
                  bg={alternateColor}
                  _hover={{ bg: "purple.50" }}
                >
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
                      <Text fontSize="lg">${transaction.amount}</Text>
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
        })
      ) : (
        <Text textAlign={"center"} as={"h2"}>
          No Transactions To Display!
        </Text>
      )}
    </List>
  );
};
export default TransactionList;
