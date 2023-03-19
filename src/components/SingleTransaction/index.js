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
          <p>{singleTransaction.account_id}</p>
          <p> {singleTransaction.merchant}</p>
          <p> {singleTransaction.date}</p>
          <p> {singleTransaction.amount}</p>
          {subCategory ? <p>{subCategory.sub_category_name}</p> : null}
          <p> {singleTransaction.hide_from_budget ? "True" : "False"}</p>
          <p> {singleTransaction.credit_debt}</p>
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
