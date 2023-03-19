const router = require("express").Router();
const {
  models: { Budget, Transaction },
} = require("../db");
const Bank_Account = require("../db/models/Bank_Account");
const Budget_Scheme = require("../db/models/Budget_Scheme");
const Category = require("../db/models/Category");
const Sub_Category = require("../db/models/Sub_Category");
module.exports = router;

//GET /api/budget/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: 
      {userId: req.params.userId},
      include: [Sub_Category]
    })

    let transactionsArr = [];
    let accountsArr = [];
    // transactions.forEach(async (transaction) => {

    for (let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];

      let currentCategory = await Category.findByPk(transaction.subcategory.categoryId)
      let currentAccount = await Bank_Account.findByPk(transaction.bankaccountId);
     
      let newTransaction = {
        date: transaction.date,
        merchant: transaction.merchant,
        amount: transaction.amount,
        creditDebit: transaction.credit_debit,
        hideFromBudget: transaction.hide_from_budget,
        subCategory: transaction.subcategory.sub_category_name,
        category: currentCategory.category_name,
        subCategoryId: transaction.subcategory.id
      }
 
       transactionsArr.push(newTransaction);
    
        if (!accountsArr.length) {
          accountsArr.push({accountId: currentAccount.id, accountName: currentAccount.account_name, availablebalance: currentAccount.available_balance});
        }
        else {
          let includesAccountName = false;
          for (let j = 0; j < accountsArr.length; j++) {
            const {accountId, accountName} = accountsArr[j];
            if (accountName === currentAccount.account_name) includesAccountName = true;
          }
          if (includesAccountName === false) accountsArr.push({accountId: currentAccount.id, accountName: currentAccount.account_name, availablebalance: currentAccount.available_balance});
        }
   
    }

    const budget = await Budget.findAll({
      where: 
      {userId: req.params.userId},
      include: [Budget_Scheme]
    });

    let budgetArr = []
    for (let i = 0; i < budget.length; i++) {
      let currBudget = budget[i];
      let currSubCategory = await Sub_Category.findByPk(currBudget.subcategoryId);
      let currCategory = await Category.findByPk(currSubCategory.categoryId);
      let budgetToSend = {
        budgetName: currBudget.budget_name,
        budgetAmount: currBudget.amount,
        budgetSchemeName: currBudget.budgetscheme.scheme_name,
        budgetSchemeId: currBudget.budgetschemeId,
        budgetDateStarted: currBudget.date_started,
        budgetCategory: currCategory.category_name,
        budgetCategoryId: currCategory.id,
        budgetSubCategory: currSubCategory.sub_category_name,
        budgetSubCategoryId: currSubCategory.id
      }
      budgetArr.push(budgetToSend);
    }
   
    res.json({accounts: accountsArr, budget: budgetArr, transactions: transactionsArr});
  } catch (err) {
    next(err);
  }
});

// POST /api/budget/
// router.post("/:id", async (req, res, next) => {
//   try {

//     const transactions = req.body;
    
//     res.json(transactions);
//   } catch (err) {
//     next(err);
//   }
// });


