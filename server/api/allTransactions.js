const router = require("express").Router();
const {
  models: { Transaction },
} = require("../db");
// api/transactions
router.get("/", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: {
        userId: 1,
      },
    });
    res.status(200).json(allTransactions);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const postedTransaction = await Transaction.create({
      account_id: req.body.transaction.account_id,
      merchant: req.body.transaction.merchant,
      date: req.body.transaction.date,
      amount: req.body.transaction.amount,
      credit_debit: req.body.transaction.credit_debit,
    });

    res.status(200).json(postedTransaction);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
