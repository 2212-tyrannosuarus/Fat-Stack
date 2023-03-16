import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Plaid from "../Plaid";
import {
  fetchSingleTransaction,
  selectSingleTransaction,
} from "../../reducers/singleTransactionPageSlice";

const SingleTransction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleTransaction = useSelector(selectSingleTransaction);

  useEffect(() => {
    dispatch(fetchSingleTransaction(id));
  }, []);
  return (
    <div>
      {singleTransaction.id ? (
        <div>
          <p>{singleTransaction.account_id}</p>
          <p> {singleTransaction.merchant}</p>
          <p> {singleTransaction.date}</p>
          <p> {singleTransaction.amount}</p>
          <p> {singleTransaction.category}</p>
          <p> {singleTransaction.sub_category}</p>
          <p> {singleTransaction.hide_from_budget ? "True" : "False"}</p>
          <p> {singleTransaction.credit_debt}</p>
          <p></p>
          <p></p>
        </div>
      ) : null}
      <Plaid />
    </div>
  );
};

export default SingleTransction;
