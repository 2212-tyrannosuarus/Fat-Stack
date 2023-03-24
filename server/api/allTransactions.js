const router = require("express").Router();
const {
  db,
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

router.get("/:fromDate/:toDate", async (req, res, next) => {
  console.log("testing now");
  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;
  console.log("in the right route", fromDate, toDate);
  try {
    const transactionsByDate = await db.query(
      `select
          *
        from
          transactions
        where
          to_date(date, 'YYYY-MM-DD') >= to_date('${fromDate}', 'YYYY-MM-DD')
          and to_date(date, 'YYYY-MM-DD') <= to_date('${toDate}', 'YYYY-MM-DD')
        and "userId" = 1
      `
    );
    res.json(transactionsByDate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
