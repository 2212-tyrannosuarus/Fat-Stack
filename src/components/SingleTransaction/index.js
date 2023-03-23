import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Plaid from "../Plaid";
import {
  fetchSingleTransaction,
  selectSingleTransaction,
} from "../../reducers/singleTransactionPageSlice";
import UpdateTransaction from "./UpdateTransaction";
import SubCatTag from "./SubCatTag";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  Square,
} from "@chakra-ui/react";
import "./SingleTransaction.css";
import Note from "../Note";
import GoalTransaction from "./GoalTransaction";

const SingleTransction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleTransaction = useSelector(selectSingleTransaction);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(fetchSingleTransaction(id));
    };
    handleFetch();
  }, []);

  return (
    <Flex>
      <Square bg="white">
        <div className="single-transaction-container">
          {singleTransaction.id ? (
            <div>
              <Stat>
                <StatLabel>
                  Transaction <UpdateTransaction /> <GoalTransaction />
                </StatLabel>
                <StatNumber>${singleTransaction.amount} </StatNumber>
                <StatHelpText textColor="teal">
                  Date: {singleTransaction.date}
                </StatHelpText>
              </Stat>
              <StatGroup>
                <Stat>
                  <StatLabel>Merchant:</StatLabel>
                  <StatNumber>{singleTransaction.merchant} </StatNumber>
                  <StatHelpText
                    textColor={
                      singleTransaction.credit_debit === "credit"
                        ? "green"
                        : "red"
                    }
                  >
                    {" "}
                    {singleTransaction.credit_debit}
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Category</StatLabel>
                  <StatNumber>
                    {" "}
                    <SubCatTag transaction={singleTransaction} />
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Hide from Budget</StatLabel>
                  <StatNumber>
                    {singleTransaction.hide_from_budget ? "True" : "False"}
                  </StatNumber>
                </Stat>
              </StatGroup>
              <Note
                notesProp={singleTransaction.notes}
                transactionId={singleTransaction.id}
                transaction={singleTransaction}
              />
            </div>
          ) : null}
          <Plaid />
        </div>
      </Square>
    </Flex>
  );
};

export default SingleTransction;
