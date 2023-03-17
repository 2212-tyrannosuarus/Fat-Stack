const router = require("express").Router();
const {
  models: { Budget, Transaction },
} = require("../db");
module.exports = router;

// POST /api/budget/
router.post("/:id", async (req, res, next) => {
  try {

    const transactions = req.body;
    console.log('transactions ', req.body);
    let transactionsArr = []
    transactions.forEach(async (transaction) => {
      // console.log('transaction ', transaction);
      let accountId = '';
      if (transaction.accountName.includes('Checking')) {
        accountId = 'GD5JC6GNBB2SBRZ9W8Z1JB95IGWBSWT13EST0';
      }
      else if (transaction.accountName.includes('Platinum Card')) {
        accountId = '73OYBP3ZRDKKJMC7CX66HJLFX72RFGUEHRYDM';
      }
      else if (transaction.accountName.includes('Silver Card')) {
        accountId = 'D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P';
      }
      let transactionToCreate = {
        account_id: accountId,
        merchant: transaction.description,
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.subCategory,
        sub_category: transaction.subCategory,
        credit_debit: transaction.tranactionType
      }
      let newTransaction = await Transaction.create(transactionToCreate);
      transactionsArr.push(newTransaction);
    })
    
    res.json(transactionsArr);
  } catch (err) {
    next(err);
  }
});


