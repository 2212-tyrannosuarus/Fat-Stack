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

const SingleTransction = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [transUpdated, setTransUpdated] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleTransaction = useSelector(selectSingleTransaction);
  const subCategory = useSelector(selectSingleTransactionSubCat);

  useEffect(() => {
    const handleFetch = async () => {
      await dispatch(fetchSingleTransaction(id));
      setTransUpdated(true);
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const handleSubFetch = async () => {
      dispatch(fetchSingleTransactionSubCat(singleTransaction.subcategoryId));
    };
    handleSubFetch();
  }, [transUpdated]);

  return (
    <div>
      {singleTransaction.id ? (
        <div>
          {/* <p>Transaction ID: {singleTransaction.account_id}</p> */}
          <p>Merchant: {singleTransaction.merchant}</p>
          <p>Transaction Date: {singleTransaction.date}</p>
          <p>Amount: {singleTransaction.amount}</p>
          {subCategory ? (
            <p>Category: {subCategory.sub_category_name}</p>
          ) : null}
          <p>
            Hide From Budget:{" "}
            {singleTransaction.hide_from_budget ? "True" : "False"}
          </p>
          <p>Credit/Debit: {singleTransaction.credit_debit}</p>
          <p></p>
          <p></p>
        </div>
      ) : null}
      <Plaid />
      <UpdateTransaction />
    </div>
  );
};

export default SingleTransction;
