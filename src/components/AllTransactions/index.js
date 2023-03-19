import React, { useEffect } from "react";
import {
  fetchAllTransactions,
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
} from "../../reducers/allTransactionsPageSlice";
import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectAllTransactions);
  const bankAccounts = useSelector(selectAllBankAccounts);

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllBankAccounts());
  }, [dispatch]);

  return (
    <>
      <div>
        Your accounts:
        <ul>
          {bankAccounts.map((account) => {
            return (
              <li>
                {account.account_name}|{account.available_balance}
              </li>
            );
          })}
        </ul>
      </div>

      <div>Transactions:</div>
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
