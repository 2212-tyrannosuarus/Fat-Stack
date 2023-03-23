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

// router.get("/allTransactions", async (req, res, next) => {
//   try {
//     const transactionsByDate = await db.query(`select
//     transactions.merchant as "merchant",
//     budgets.amount *
//     ((EXTRACT(year FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))*12 + EXTRACT(month FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))) +1)
//     as "budgetedAmount",
//     budgets.date_started as "budgetStartDate",
//     subcategories.sub_category_name as "subCategoryName",
//     subcategories.id as "subCategoryId",
//     categories.category_name as "categoryName",
//     categories.id as "categoryId",
//     sum(transactions.amount) as "transactionAmount"
//     from
//     budgets,
//     subcategories,
//     categories,
//     transactions
//     where
//     subcategories.id=budgets."subcategoryId"
//     and categories.id=subcategories."categoryId"
//     and transactions."subcategoryId"=subcategories.id
//     and transactions.credit_debit= 'credit'
//     and to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
//     and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
//     and transactions."userId"=${req.params.userId}
//     group by
//     budgets.budget_name,
//     budgets.amount,
//     budgets.date_started,
//     subcategories.sub_category_name,
//     subcategories.id,
//     categories.category_name,
//     categories.id`);

//     res.json(budgetedIncome);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
