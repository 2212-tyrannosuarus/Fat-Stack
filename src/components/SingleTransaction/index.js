import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Plaid from "../Plaid";
import {
  fetchSingleTransaction,
  selectSingleTransaction,
  fetchSingleTransactionSubCat,
  selectSingleTransactionSubCat,
} from "../../reducers/singleTransactionPageSlice";
import UpdateTransaction from "./UpdateTransaction";
import SubCatTag from "./subCatTag";
import BoxTest from "./BoxTest";

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
    <div>
      {singleTransaction.id ? (
        <div>
          <h1>SINGLE TRANSACTION:</h1>
          <p>{"a"}</p>
          <p>{"a"}</p>
          {/* <p>Transaction ID: {singleTransaction.account_id}</p> */}
          <p>
            Merchant: {singleTransaction.merchant} <UpdateTransaction />
          </p>
          <p>Transaction Date: {singleTransaction.date}</p>
          <p>Amount: {singleTransaction.amount}</p>
          <SubCatTag transaction={singleTransaction} />
          <p>
            Hide From Budget:{" "}
            {singleTransaction.hide_from_budget ? "True" : "False"}
          </p>
          <p>Credit/Debit: {singleTransaction.credit_debit}</p>
          <p></p>
          <p></p>
          <BoxTest />
        </div>
      ) : null}
      <Plaid />
    </div>
  );
};

export default SingleTransction;
