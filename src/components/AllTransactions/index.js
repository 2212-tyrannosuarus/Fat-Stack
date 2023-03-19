import React, { useEffect, useState } from "react";
import {
  fetchAllTransactions,
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  selectSubCategories,
  fetchAllSubCategories,
} from "../../reducers/allTransactionsPageSlice";

import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectAllTransactions);
  const bankAccounts = useSelector(selectAllBankAccounts);
  const subCategories = useSelector(selectSubCategories);

  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("none");

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllBankAccounts());
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  let totalAccountBalance = bankAccounts.reduce((accum, account) => {
    accum += Number(account.available_balance);
    return accum;
  }, 0);

  const handleAccountClick = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("category", selectedCategory);
  };

  return subCategories.length > 0 ? (
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
        <div>filters</div>
        <label for="category">Category</label>
        <select
          id="category"
          onChange={(e) => {
            handleCategoryChange(e);
          }}
        >
          {subCategories.map((category) => {
            return (
              <option value={category.id}>{category.sub_category_name}</option>
            );
          })}
        </select>
        <label>Date</label>
      </div>

      <div>Transactions:</div>
      <div>
        Date............Description............Category............Amount
      </div>
      <ul>
        {allTransactions.map((transaction, idx) => {
          console.log("cat id ", selectedCategory);
          console.log("trans cat id", transaction.subcategoryId);
          if (idx < 50) {
            if (
              (selectedAccount === "all" ||
                transaction.bankaccountId === Number(selectedAccount)) &&
              (selectedCategory === "none" ||
                Number(selectedCategory) === Number(transaction.subcategoryId))
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
  ) : (
    <>LOADING</>
  );
};

export default AllTransactions;
