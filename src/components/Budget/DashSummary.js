import React, { useState } from "react";
import { Box, Text, Container, Grid, Flex } from "@chakra-ui/react";

const DashSummary = (props) => {
  const { income, spending, other } = props;

  let totalExpenses = 0;
  let goals = 0;

  const [titleDate, setTitleDate] = useState(
    `${new Date().toString().split(" ")[1]} ${
      new Date().toString().split(" ")[3]
    }`
  );

  if (spending !== undefined) {
    let spendingArr = spending.flat();

    for (let i = 0; i < spendingArr.length - 1; i++) {
      totalExpenses += parseInt(spendingArr[i].transactionAmount);
    }
  }

  if (other !== undefined) {
    let otherArr = other.flat();

    for (let i = 0; i < otherArr.length - 1; i++) {
      if (otherArr[i].subCategoryName === "Goals") {
        goals = otherArr[i].transactionAmount;
      } else {
        totalExpenses += parseInt(otherArr[i].transactionAmount);
      }
    }
  }

  return (
    <>
      <Box display="flex" alignItems="flex-start">
        <Box textAlign="left">
          {income[0] !== undefined &&
          income[0].length &&
          spending[0] !== undefined &&
          spending[0].length &&
          other !== undefined ? (
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {titleDate}
            </Text>
          ) : null}

          <Flex flexWrap="wrap">
            <Box
              flex="1"
              minWidth="180px"
              maxWidth="180px"
              borderRadius={4}
              bg={"white"}
              mr={4}
              py={5}
              textAlign={"center"}
              justifyContent={"center"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              boxShadow="md"
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Total Income
              </Text>
              {income[0] !== undefined && income[0].length ? (
                <Text mt={2} fontWeight="bold" fontSize="2xl" color="green">
                  + ${parseInt(income.flat()[0].transactionAmount)}
                </Text>
              ) : (
                <Text mt={2} fontWeight="bold" fontSize="2xl" color="lightgrey">
                  -
                </Text>
              )}
            </Box>
            <Box
              flex="1"
              minWidth="180px"
              maxWidth="180px"
              borderRadius={5}
              bg={"white"}
              textAlign={"center"}
              justifyContent={"center"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              boxShadow="md"
              py={10}
              mr={4}
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Total Expenses
              </Text>
              {spending[0] !== undefined && spending[0].length ? (
                <Text mt={2} fontWeight="bold" fontSize="2xl" color="red">
                  - ${parseInt(totalExpenses)}
                </Text>
              ) : (
                <Text mt={2} fontWeight="bold" fontSize="2xl" color="lightgrey">
                  -
                </Text>
              )}
            </Box>
            <Box
              flex="1"
              minWidth="180px"
              maxWidth="180px"
              borderRadius={4}
              bg={"white"}
              textAlign={"center"}
              justifyContent={"center"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              boxShadow="md"
              py={10}
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Leftover
              </Text>
              {income[0] !== undefined &&
              income[0].length &&
              spending[0] !== undefined &&
              spending[0].length &&
              other !== undefined ? (
                <Text mt={2} fontWeight="bold" fontSize="2xl">
                  $
                  {parseInt(income.flat()[0].transactionAmount) -
                    parseInt(totalExpenses) -
                    parseInt(goals)}
                </Text>
              ) : (
                <Text mt={2} fontWeight="bold" fontSize="2xl" color="lightgrey">
                  -
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DashSummary;
