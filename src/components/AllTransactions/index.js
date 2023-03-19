import React, { useEffect } from "react";
import {
  fetchAllTransactions,
  selectAllTransactions,
} from "../../reducers/allTransactionsPageSlice";
import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return (
    <>
      <div>
        Date............Description............Category............Amount
      </div>
      <ul>
        {allTransactions.map((transaction, idx) => {
          if (idx < 50) {
            return (
              <li>
                <div>
                  {transaction.date}............
                  {transaction.merchant}............
                  {transaction.category}............
                  {transaction.amount}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default AllTransactions;
