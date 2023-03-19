import React, { useEffect, useState } from "react";
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

  const [selectedAccount, setSelectedAccount] = useState("all");

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllBankAccounts());
  }, [dispatch]);

  let totalAccountBalance = bankAccounts.reduce((accum, account) => {
    accum += Number(account.available_balance);
    return accum;
  }, 0);

  const handleAccountClick = (e) => {
    setSelectedAccount(e.target.value);
  };

  return (
    <>
      <div>
        <div>Your accounts:</div>
        <ul>
          <li>
            <button
              value={"all"}
              onClick={(e) => {
                handleAccountClick(e);
              }}
            >
              {"All Accounts"}|{totalAccountBalance}
            </button>
          </li>
          {bankAccounts.map((account) => {
            return (
              <li key={account.account_id}>
                <button
                  value={account.id}
                  onClick={(e) => {
                    handleAccountClick(e);
                  }}
                >
                  {account.account_name}|{account.available_balance}
                </button>
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
            if (
              selectedAccount === "all" ||
              transaction.bankaccountId === Number(selectedAccount)
            ) {
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
          }
        })}
      </ul>
    </>
  );
};

export default AllTransactions;
