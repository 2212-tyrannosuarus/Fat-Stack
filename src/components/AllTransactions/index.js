import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
// import { CUIAutoComplete } from "chakra-ui-autocomplete";
import {
  fetchAllTransactions,
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  selectSubCategories,
  fetchAllSubCategories,
} from "../../reducers/allTransactionsPageSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddTransactionModal from "./AddTransactionModal";
import TransactionList from "./TransactionList";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectAllTransactions);
  const bankAccounts = useSelector(selectAllBankAccounts);
  const subCategories = useSelector(selectSubCategories);
  const subCategoriesAsStrings = subCategories.map((subCategory) => {
    return {
      value: subCategory.sub_category_name,
      label: subCategory.sub_category_name,
    };
  });

  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("none");

  const [newTransactionAccountId, setNewTransactionAccountId] = useState("");
  const [newTransactionMerchant, setNewTransactionMerchant] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
  const [newTransactionCreditDebit, setNewTransactionCreditDebit] =
    useState("debit");
  const [newTransactionAmount, setNewTransactionAmount] = useState("0");
  const [newTransactionSubCategory, setNewTransactionSubCategory] =
    useState("");

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
  };
  const handleNewMerchantChange = (e) => {
    setNewTransactionMerchant(e.target.value);
  };
  const handleNewAccountChange = (e) => {
    setNewTransactionAccountId(e.target.value);
  };
  const handleNewCategoryChange = (e) => {
    setNewTransactionSubCategory(e.target.value);
  };
  const handleNewCreditDebitChange = (e) => {
    setNewTransactionCreditDebit(e.target.value);
  };
  const handleNewDateChange = (e) => {
    setNewTransactionDate(e.target.value);
  };

  //want to make this the filter for categories
  // <CUIAutoComplete
  //   value={newTransactionSubCategory}
  //   disableCreateItem="true"
  //   items={subCategoriesAsStrings}
  //   placeholder="Pick a category "
  //   onChange={(e) => {
  //     handleNewCategoryChange(e);
  //   }}
  // />

  //these functions format the number input field in the new Transaction form

  const handleClear = () => {
    setNewTransactionAccountId("");
    setNewTransactionSubCategory("");
    setNewTransactionAmount(0);
    setNewTransactionDate("");
    setNewTransactionMerchant("");
  };

  const handleNewTransactionSubmit = async () => {
    let newTransaction = {
      account_id: newTransactionAccountId,
      merchant: newTransactionMerchant,
      date: newTransactionDate,
      amount: newTransactionAmount,
      credit_debit: newTransactionCreditDebit,
    };
    const postedTransaction = await axios.post(
      "/api/allTransactions",
      newTransaction
    );
  };

  return subCategories.length > 0 ? (
    <>
      <div>
        <div>Your accounts:</div>
        <ul>
          <li>
            <Button
              value={"all"}
              onClick={(e) => {
                handleAccountClick(e);
              }}
            >
              {"All Accounts"}|{totalAccountBalance}
            </Button>
          </li>
          {bankAccounts.map((account) => {
            return (
              <li key={account.account_id}>
                <Button
                  value={account.id}
                  onClick={(e) => {
                    handleAccountClick(e);
                  }}
                >
                  {account.account_name}|{account.available_balance}
                </Button>
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
      <AddTransactionModal
        newTransactionAmount={newTransactionAmount}
        newTransactionDate={newTransactionDate}
        newTransactionMerchant={newTransactionMerchant}
        newTransactionSubCategory={newTransactionSubCategory}
        bankAccounts={bankAccounts}
        subCategories={subCategories}
        subCategoriesAsStrings={subCategoriesAsStrings}
        handleNewTransactionSubmit={handleNewTransactionSubmit}
        handleNewMerchantChange={handleNewMerchantChange}
        handleNewAccountChange={handleNewAccountChange}
        handleNewCategoryChange={handleNewCategoryChange}
        handleNewCreditDebitChange={handleNewCreditDebitChange}
        handleNewDateChange={handleNewDateChange}
        handleClear={handleClear}
        setNewTransactionAmount={setNewTransactionAmount}
      />

      {/* TRANSACTIONS COMPONENT HERE */}
      <TransactionList
        allTransactions={allTransactions}
        selectedAccount={selectedAccount}
        selectedCategory={selectedCategory}
        subCategories={subCategories}
      />
      {/* <ul>
        {allTransactions.map((transaction, idx) => {
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
      </ul> */}
    </>
  ) : (
    <>LOADING</>
  );
};

export default AllTransactions;
