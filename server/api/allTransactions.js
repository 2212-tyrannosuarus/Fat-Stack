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
  console.log("req.body", req.body);
  try {
    const postedTransaction = await Transaction.create({
      account_id: req.body.account_id,
      merchant: req.body.merchant,
      date: req.body.date,
      amount: req.body.amount,
      credit_debit: req.body.credit_debit,
    });

    res.status(201).json(postedTransaction);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
