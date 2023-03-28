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
const {
  budgetedSpendingFunc,
  unbudgetedSpendingFunc,
  budgetedIncomeFunc,
  budgetCategoriesFunc,
} = require("../../script/budgetQueries.js");
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
    let budgetedSpendingQuery = budgetedSpendingFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const budgetedSpending = await db.query(`${budgetedSpendingQuery}`);

    res.json(budgetedSpending);
  } catch (err) {
    next(err);
  }
});

// GET /api/budget/unbudgeted/:userId/:fromDate/:toDate
router.get("/unbudgeted/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let unbudgetedSpendingQuery = unbudgetedSpendingFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const unbudgetedSpending = await db.query(unbudgetedSpendingQuery);

    res.json(unbudgetedSpending);
  } catch (err) {
    next(err);
  }
});

// GET /api/budget/income/:userId/:fromDate/:toDate
router.get("/income/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let budgetedIncomeQuery = budgetedIncomeFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const budgetedIncome = await db.query(budgetedIncomeQuery);

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
    let budgetCategoriesQuery = budgetCategoriesFunc(req.params.userId);

    const categories = await db.query(budgetCategoriesQuery)

    res.json(categories);
  } catch (err) {
    next(err);
  }
});
