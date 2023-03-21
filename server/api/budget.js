const router = require("express").Router();
const {db,
  models: { Budget, Transaction },
} = require("../db");
const { ValidationError} = require("sequelize");
const Bank_Account = require("../db/models/Bank_Account");
const Budget_Scheme = require("../db/models/Budget_Scheme");
const Category = require("../db/models/Category");
const Sub_Category = require("../db/models/Sub_Category");
const User_Category  = require("../db/models/User_Category")
module.exports = router;


const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
    and transactions.credit_debit= 'debit'
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

// PUT /api/budget/:userId
router.put("/:userId", async (req, res, next) => {
  try {
    const subCategory = await Sub_Category.findOne({
      where: {
        sub_category_name: req.body.subCategoryName
      }
    })

    const budgetToUpdate = await Budget.findOne({
      where: {
        userId: req.params.userId,
        subcategoryId: subCategory.id
      }
      
    });

    const updatedBudget = await budgetToUpdate.update({
      amount: req.body.newBudgetedAmount
    });

    res.json(updatedBudget);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors[0].message);
    } else {
      next(error);
    }
  }
});

// DELETE /api/budget/:userId/:subCategoryName
router.delete("/:userId/:subCategoryName", async (req, res, next) => {
  try {
    const subCategory = await Sub_Category.findOne({
      where: {
        sub_category_name: req.params.subCategoryName
      }
    })

    await Budget.destroy({
      where: {
        userId: req.params.userId,
        subcategoryId: subCategory.id
      }
      
    });

    res.json("budget item deleted");
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors[0].message);
    } else {
      next(error);
    }
  }
});


// POST /api/budget/:userId
router.put("/:userId", async (req, res, next) => {
  try {
    let subCategory = await Sub_Category.findOne({
      where: {
        sub_category_name: req.body.subCategoryName
      }
    })
    let userCategory = "";

    if (!subCategory) {
      userCategory = await User_Category.findOne({
      where: {
        user_category_name: req.body.subCategoryName
      }
    })

    subCategory = userCategory;
    }

    let todaysDate = new Date();
    let currYear = todaysDate.split(' ')[3];
    let currMonth = MONTHS.indexof(todaysDate.split(' ')[1].toString());
    if (currMonth.length === 1) currMonth = `0${currMonth}`;

    const budgetToCreate = await Budget.create({
        budget_name: req.body.budgetName,
        amount: req.body.budgetAmount,
        date_started: ""
    });


    
    res.json(budgetToCreate);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors[0].message);
    } else {
      next(error);
    }
  }
});

