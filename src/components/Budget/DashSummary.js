import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const DashSummary = (props) => {
  const { income, spending, other } = props;

  let totalExpenses = 0;
  let goals = 0;

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
      <Flex justifyContent="space-between">
        <Box
          width={200}
          height="200px"
          mb={4}
          p={5}
          mr={4}
          borderRadius={4}
          bg={"white"}
          textAlign={"center"}
          justifyContent={"center"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Total Income
          </Text>
          {income[0] !== undefined && income[0].length ? (
            <Text fontSize="2xl" color="green">
              + ${parseInt(income.flat()[0].transactionAmount)}
            </Text>
          ) : (
            <Text>No income data available</Text>
          )}
        </Box>

        <Box
          width={200}
          height="200px"
          mb={4}
          p={5}
          mr={4}
          borderRadius={4}
          bg={"white"}
          textAlign={"center"}
          justifyContent={"center"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Total Expenses
          </Text>
          {spending[0] !== undefined && spending[0].length ? (
            <Text fontSize="2xl" color="red">
              - ${parseInt(totalExpenses)}
            </Text>
          ) : (
            <Text>No spending data available</Text>
          )}
        </Box>

        <Box
          width={200}
          height="200px"
          mb={4}
          p={5}
          mr={4}
          borderRadius={4}
          bg={"white"}
          textAlign={"center"}
          justifyContent={"center"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Leftover
          </Text>
          {income[0] !== undefined &&
          income[0].length &&
          spending[0] !== undefined &&
          spending[0].length &&
          other !== undefined ? (
            <Text fontSize="2xl">
              $
              {parseInt(income.flat()[0].transactionAmount) -
                parseInt(totalExpenses) -
                parseInt(goals)}
            </Text>
          ) : (
            <Text>No data available</Text>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default DashSummary;
