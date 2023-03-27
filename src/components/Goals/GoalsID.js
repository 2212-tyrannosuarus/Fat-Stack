import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  selectGoalTransactions,
  getGoalsTransaction,
} from "../../reducers/singleTransactionPageSlice";
import { getGoal, selectGoal } from "../../reducers/goalPageSlice";
import GoalIDBox from "./GoalsComponent/GoalIDBox";
import {
  Wrap,
  WrapItem,
  Center,
  Flex,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  getInspirationQuote,
  selectInspiringQuote,
  selectGoalDirection,
  getGoalDirection,
} from "../../reducers/openAiSlice";
import LineCart from "./Charts/LineCart";

export default function GoalsID({ name }) {
  const { goalid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transactions = useSelector(selectGoalTransactions);
  const goal = useSelector(selectGoal);
  const inspiringQuote = useSelector(selectInspiringQuote);
  const goalDirections = useSelector(selectGoalDirection);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoal(goalid));
      await dispatch(getInspirationQuote());
      await dispatch(getGoalDirection());
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(getGoalsTransaction({ name: goal.name }));
    };
    if (goal.id) {
      handleFetch();
    }
  }, [goal]);

  return (
    <>
      <Flex flexDirection="column">
        <Box width={["35vw", "40vw", "50vw", "75vw"]}>
          <div>
            <GoalIDBox key={goal.id} goal={goal} />
          </div>
        </Box>
        <Box width="95%">
          <Flex justifyContent="space-between">
            <Box width="100%">
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <TableCaption>
                    A goal a day, keeps the brokeness away
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>
                        <Heading size="xs">Contributions</Heading>
                      </Th>
                      <Th>Amount</Th>
                      <Th isNumeric>View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((transaction) => (
                      <Tr key={transaction.id}>
                        <Td>{transaction.date}</Td>
                        <Td>${transaction.amount}</Td>
                        <Td
                          isNumeric
                          onClick={() =>
                            navigate(`/transactions/${transaction.id}`)
                          }
                        >
                          ↣
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box width="20%" ml="4rem" mt="2rem">
              <Text mb="2rem" fontSize="m" as="i">
                "{inspiringQuote}"
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
