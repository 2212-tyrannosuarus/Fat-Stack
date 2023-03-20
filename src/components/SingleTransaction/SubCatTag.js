import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleTransaction,
  selectSingleTransaction,
  fetchSingleTransactionSubCat,
  selectSingleTransactionSubCat,
} from "../../reducers/singleTransactionPageSlice";

export default function SubCatTag({ transaction }) {
  const dispatch = useDispatch();
  const subCategory = useSelector(selectSingleTransactionSubCat);

  useEffect(() => {
    const handleSubFetch = async () => {
      dispatch(fetchSingleTransactionSubCat(transaction.subcategoryId));
    };
    handleSubFetch();
  }, [transaction]);

  return <p> {subCategory.sub_category_name}</p>;
}
