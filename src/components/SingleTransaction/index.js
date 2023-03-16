import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Plaid from "../Plaid";

const SingleTransction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  return (
    <div>
      <Plaid />
    </div>
  );
};

export default SingleTransction;
