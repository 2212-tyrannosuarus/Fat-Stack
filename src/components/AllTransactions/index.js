import React, { useEffect, useState } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
// import { CUIAutoComplete } from "chakra-ui-autocomplete";
import {
  selectAllTransactions,
  selectAllBankAccounts,
  fetchAllBankAccounts,
  selectSubCategories,
  fetchAllSubCategories,
  deleteSingleTransaction,
  fetchTransactionsFromDateToDate,
} from "../../reducers/allTransactionsPageSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddTransactionModal from "./AddTransactionModal";
import TransactionList from "./TransactionList";
import Paginator from "./Paginator";
import FilterBar from "./FilterBar";
import { Box } from "victory";

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
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

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
  const [selectedDates, setSelectedDates] = useState([
    sixMonthsAgo,
    new Date(),
  ]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    allTransactions || []
  );
  const transactionsPerPage = 10;

  const formatDateObjects = (selectedDates) => {
    const monthLookup = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const formattedDates = selectedDates.map((date) => {
      const tempDate = date.toString().split(" ");
      let day;
      if (tempDate[2].length < 2) {
        day = "0" + tempDate[2];
      } else {
        day = tempDate[2];
      }
      let month = monthLookup[tempDate[1]];
      return tempDate[3] + "-" + month + "-" + day;
    });
    return formattedDates;
    // return { dates: { fromDate, toDate } };
  };

  useEffect(() => {
    dispatch(fetchAllBankAccounts());
    dispatch(fetchAllSubCategories());
    const fromDate = formatDateObjects(selectedDates)[0];
    const toDate = formatDateObjects(selectedDates)[1];
    dispatch(
      fetchTransactionsFromDateToDate({
        fromDate: fromDate,
        toDate: toDate,
      })
    );
  }, [dispatch, deletedTransaction, postedTransaction, selectedDates]);

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
  }, [
    allTransactions,
    selectedAccount,
    selectedCategory,
    deletedTransaction,
    selectedDates,
  ]);
  useEffect(() => {
    setTotalPageCount(
      Math.floor(filteredTransactions.length / transactionsPerPage) + 1
    );
    setCurrentPage(1);
  }, [filteredTransactions]);

  useEffect(() => {}, [totalPageCount]);

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

    setFilteredTransactions(
      filteredTransactions.filter((transaction) => {
        return transaction.id !== deletedTransaction.id;
      })
    );
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
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
    // now update the bank account balance
    let avaialableBalanceDifferential = 0;
    if (newPostedTransaction.credit_debit === "debit") {
      avaialableBalanceDifferential -= Number(newPostedTransaction.data.amount);
    } else {
      avaialableBalanceDifferential += Number(newPostedTransaction.data.amount);
    }

    const bankAccountToUpdate = bankAccounts.filter((account) => {
      return account.account_id === newPostedTransaction.data.account_id;
    })[0];

    const availableBalanceToUpdate = Number(
      bankAccountToUpdate.available_balance
    );

    const newAccountBalance =
      availableBalanceToUpdate + avaialableBalanceDifferential;
    const updatedBankAccount = await axios.put(
      `/api/bankAccounts/${bankAccountToUpdate.id}`,
      { available_balance: newAccountBalance }
    );
  };

  return subCategories.length > 0 ? (
    <Flex direction={"column"}>
      <Flex direction={"row"}>
        <Flex
          direction={"column"}
          padding={"10px"}
          w="20%"
          alignItems={"flex-start"}
        >
          <FilterBar
            handleAccountClick={handleAccountClick}
            totalAccountBalance={totalAccountBalance}
            bankAccounts={bankAccounts}
            subCategories={subCategories}
            handleCategoryChange={handleCategoryChange}
            setSelectedDates={setSelectedDates}
            selectedDates={selectedDates}
          />
        </Flex>
        {/* ADD A GRAPH HERE  */}
        <Box bg="gray.100">TTest</Box>
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
          // props for New transaction modal element
          newTransactionAmount={newTransactionAmount}
          newTransactionDate={newTransactionDate}
          newTransactionMerchant={newTransactionMerchant}
          newTransactionSubCategory={newTransactionSubCategory}
          bankAccounts={bankAccounts}
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
      </Flex>
      <Paginator
        handlePageChange={handlePageChange}
        totalPageCount={totalPageCount}
      />
    </Flex>
  ) : (
    <>LOADING</>
  );
};

export default AllTransactions;
