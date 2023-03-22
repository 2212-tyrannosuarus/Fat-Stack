const router = require("express").Router();
const {
  db,
  models: { Budget, Transaction, User },
} = require("../db");
const { ValidationError } = require("sequelize");
const Bank_Account = require("../db/models/Bank_Account");
const Budget_Scheme = require("../db/models/Budget_Scheme");
const Category = require("../db/models/Category");
const Sub_Category = require("../db/models/Sub_Category");
const User_Category = require("../db/models/User_Category");
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
        sub_category_name: req.body.subCategoryName,
      },
    });

    const budgetToUpdate = await Budget.findOne({
      where: {
        userId: req.params.userId,
        subcategoryId: subCategory.id,
      },
    });

    const updatedBudget = await budgetToUpdate.update({
      amount: req.body.newBudgetedAmount,
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
        sub_category_name: req.params.subCategoryName,
      },
    });

    await Budget.destroy({
      where: {
        userId: req.params.userId,
        subcategoryId: subCategory.id,
      },
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
router.post("/:userId", async (req, res, next) => {
  try {
    let subCategory = await Sub_Category.findOne({
      where: {
        sub_category_name: req.body.subCategoryName,
      },
    });
    let userCategory = "";

    let todaysDate = new Date();
    let currYear = todaysDate.toString().split(" ")[3];
    let currMonth =
      MONTHS.indexOf(todaysDate.toString().split(" ")[1].toString()) + 1;
    console.log("curr month ", currMonth.toString().length);
    if (currMonth.toString().length === 1) currMonth = `0${currMonth}`;
    let currDay = todaysDate.toString().split(" ")[2];
    if (currDay.length === 1) currDay = `0${currDay}`;

    let budgetToCreate = "";

    if (!subCategory) {
      userCategory = await User_Category.findOne({
        where: {
          user_category_name: req.body.subCategoryName,
        },
      });

      subCategory = userCategory;

      budgetToCreate = await Budget.create({
        budget_name: req.body.subCategoryName,
        amount: req.body.budgetAmount,
        date_started: `${currYear}-${currMonth}-${currDay}`,
      });

      const user = await User.findByPk(req.params.userId);
      const budgetScheme = await Budget_Scheme.findByPk(1);

      budgetToCreate.setUser(user);
      budgetToCreate.setUsercategory(userCategory);
      budgetToCreate.setBudgetscheme(budgetScheme);
    } else {
      budgetToCreate = await Budget.create({
        budget_name: req.body.subCategoryName,
        amount: req.body.budgetAmount,
        date_started: `${currYear}-${currMonth}-${currDay}`,
      });

      const user = await User.findByPk(req.params.userId);
      const budgetScheme = await Budget_Scheme.findByPk(1);

      budgetToCreate.setUser(user);
      budgetToCreate.setSubcategory(subCategory);
      budgetToCreate.setBudgetscheme(budgetScheme);
    }

    res.json(budgetToCreate);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors[0].message);
    } else {
      next(error);
    }
  }
});

// GET /api/budget/categories/:userId
router.get("/categories/:userId", async (req, res, next) => {
  try {
    const categories = await db.query(`	SELECT
		categories.category_name AS "categoryName",
		subcategories.sub_category_name AS "subCategoryName"
	  FROM
		subcategories,
		categories
	  WHERE
		categories.id = subcategories."categoryId"
		AND NOT EXISTS (
			SELECT
				1
			FROM
				budgets
			WHERE
				budgets."subcategoryId" = subcategories.id
				AND budgets."userId" = 1)
	  GROUP BY
		categories.category_name,
		subcategories.sub_category_name
	  ORDER BY
		categories.category_name ASC,
		subcategories.sub_category_name ASC`);

    res.json(categories);
  } catch (err) {
    next(err);
  }
});
