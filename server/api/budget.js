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
        category: currentCategory.category_name
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
   
    res.json({accounts: accountsArr, budget: budget, transactions: transactionsArr});
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


