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
  deleteSingleTransaction,
} from "../../reducers/allTransactionsPageSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddTransactionModal from "./AddTransactionModal";
import TransactionList from "./TransactionList";
import Paginator from "./Paginator";

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
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedTransaction, setDeletedTransaction] = useState({});
  const [postedTransaction, setPostedTransaction] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState(
    allTransactions || []
  );
  const transactionsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllBankAccounts());
    dispatch(fetchAllSubCategories());
  }, [dispatch, deletedTransaction, postedTransaction]);

  useEffect(() => {
    setFilteredTransactions(
      allTransactions.filter((transaction) => {
        if (
          (selectedAccount === "all" ||
            transaction.bankaccountId === Number(selectedAccount)) &&
          (selectedCategory === "none" ||
            Number(selectedCategory) === Number(transaction.subcategoryId))
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
    console.log("filteredtransactions", filteredTransactions);
  }, [allTransactions, selectedAccount, selectedCategory, deletedTransaction]);
  useEffect(() => {
    setTotalPageCount(
      Math.floor(filteredTransactions.length / transactionsPerPage) + 1
    );
    setCurrentPage(1);
  }, [filteredTransactions]);

  useEffect(() => {
    console.log("totalPageCount", totalPageCount);
  }, [totalPageCount]);

  let totalAccountBalance = bankAccounts.reduce((accum, account) => {
    accum += Number(account.available_balance);
    return accum;
  }, 0);

  const handleAccountClick = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleDelete = async (evt, transactionId) => {
    evt.preventDefault();

    const newDeletedTransaction = await dispatch(
      deleteSingleTransaction(transactionId)
    );
    setDeletedTransaction(newDeletedTransaction);

    console.log("old", filteredTransactions.length);
    setFilteredTransactions(
      filteredTransactions.filter((transaction) => {
        return transaction.id !== deletedTransaction.id;
      })
    );
    console.log("new", filteredTransactions.length);
  };

  const handlePageChange = (e) => {
    console.log(e);
    setCurrentPage(e.selected + 1);
    console.log("current page", currentPage);
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
    const newPostedTransaction = await axios.post(
      "/api/allTransactions",
      newTransaction
    );
    setPostedTransaction(newPostedTransaction);
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
        allTransactions={filteredTransactions}
        selectedAccount={selectedAccount}
        selectedCategory={selectedCategory}
        subCategories={subCategories}
        handleDelete={handleDelete}
        totalPageCount={totalPageCount}
        transactionsPerPage={transactionsPerPage}
        currentPage={currentPage}
      />
      <Paginator
        handlePageChange={handlePageChange}
        totalPageCount={totalPageCount}
      />
    </>
  ) : (
    <>LOADING</>
  );
};

export default AllTransactions;
