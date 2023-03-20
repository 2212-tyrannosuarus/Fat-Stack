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
import SubCatTag from "./subCatTag";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import "./SingleTransaction.css";
import Note from "../Note";

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
    <div className="single-transaction-container">
      {singleTransaction.id ? (
        <div>
          <Stat>
            <StatLabel>
              Transaction <UpdateTransaction />
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
                  singleTransaction.credit_debit === "credit" ? "green" : "red"
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
            notes={singleTransaction.notes}
            transactionId={singleTransaction.id}
          />
        </div>
      ) : null}
      <Plaid />
    </div>
  );
};

export default SingleTransction;
