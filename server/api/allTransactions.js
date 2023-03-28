const router = require("express").Router();
const {
  db,
  models: { Transaction },
} = require("../db");
const {
  transactionsByDateQuery,
} = require("../../script/transactionQueries.js");
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

router.get("/:userId/:fromDate/:toDate", async (req, res, next) => {
  const userId = req.params.userId;
  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;
  const transactionQuery = transactionsByDateQuery(fromDate, toDate, userId);
  try {
    const transactionsByDate = await db.query(`${transactionQuery}`);

    res.json(transactionsByDate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
