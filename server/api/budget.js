const router = require("express").Router();
const {db,
  models: { Budget, Transaction },
} = require("../db");
const Bank_Account = require("../db/models/Bank_Account");
const Budget_Scheme = require("../db/models/Budget_Scheme");
const Category = require("../db/models/Category");
const Sub_Category = require("../db/models/Sub_Category");
module.exports = router;

// GET /api/budget/budgeted/:userId/:fromDate/:toDate
router.get("/budgeted/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const budgetedSpending = await db.query(`select 
    budgets.budget_name as "budgetName", 
    budgets.amount * 
    ((EXTRACT(year FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))*12 + EXTRACT(month FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))) +1)
    as "budgetedAmount", 
    budgets.date_started as "budgetStartDate",
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    sum(transactions.amount) as "transactionAmount"
    from
    budgets,
    subcategories,
    categories,
    transactions
    where
    subcategories.id=budgets."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."subcategoryId"=subcategories.id
    and transactions.credit_debit= 'debit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
    group by 
    budgets.budget_name, 
    budgets.amount, 
    budgets.date_started,
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`);

    res.json(budgetedSpending);
  } catch (err) {
    next(err);
  }
});

// GET /api/budget/unbudgeted/:userId/:fromDate/:toDate
router.get("/unbudgeted/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const unbudgetedSpending = await db.query(`select 
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    sum(transactions.amount) as "transactionAmount"
    from
    transactions,
    subcategories,
    categories
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and not exists (select 1 from budgets where budgets."subcategoryId" = subcategories.id)
    and subcategories.id=transactions."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."userId"=${req.params.userId}
    group by 
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`);

    res.json(unbudgetedSpending);
  } catch (err) {
    next(err);
  }
});

// GET /api/budget/income/:userId/:fromDate/:toDate
router.get("/income/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const budgetedIncome = await db.query(`select 
    budgets.budget_name as "budgetName", 
    budgets.amount * 
    ((EXTRACT(year FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))*12 + EXTRACT(month FROM age(to_date(${req.params.toDate},'YYYY-MM-DD'),to_date(${req.params.fromDate},'YYYY-MM-DD')))) +1)
    as "budgetedAmount", 
    budgets.date_started as "budgetStartDate",
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    sum(transactions.amount) as "transactionAmount"
    from
    budgets,
    subcategories,
    categories,
    transactions
    where
    subcategories.id=budgets."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."subcategoryId"=subcategories.id
    and transactions.credit_debit= 'credit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
    group by 
    budgets.budget_name, 
    budgets.amount, 
    budgets.date_started,
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`);

    
     
    res.json(budgetedIncome);
  } catch (err) {
    next(err);
  }
});



