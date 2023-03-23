const router = require("express").Router();
const {db,
  models: { Budget, Transaction },
} = require("../db");
const Bank_Account = require("../db/models/Bank_Account");
const Budget_Scheme = require("../db/models/Budget_Scheme");
const Category = require("../db/models/Category");
const Sub_Category = require("../db/models/Sub_Category");
const {QueryTypes, sequelize} = require('sequelize');
module.exports = router;

// GET /api/trends/overtime/:userId/:fromDate/:toDate
router.get("/overtime/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const dataOvertime = await db.query(`select 
    to_char(to_date(date,'YYYY-MM-DD'),'yyyy-mm') as "yearmonth",
    transactions.credit_debit,
    sum(transactions.amount) as "transactionAmount"
    from
    transactions
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
    group by
    transactions.credit_debit,
    yearmonth
    order by yearmonth`);

    res.json(dataOvertime);
  } catch (err) {
    next(err);
  }
});


// GET /api/trends/categoryPie/:userId/:fromDate/:toDate
router.get("/categoryPie/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const dataByCategory = await db.query(`select 
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
    and subcategories.id=transactions."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."userId"=${req.params.userId}
    and transactions.credit_debit= 'debit'
    group by 
    categories.category_name, 
    categories.id
    order by 
    "transactionAmount" desc`);

    res.json(dataByCategory);
  } catch (err) {
    next(err);
  }
});


// GET /api/trends/merchantPie/:userId/:fromDate/:toDate
router.get("/merchantPie/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const dataByMerchant = await db.query(`select merchant,
    sum(transactions.amount) as "transactionAmount"
    from transactions
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
    and transactions.credit_debit= 'debit'
    group by merchant
    order by 
    "transactionAmount" desc`);

    res.json(dataByMerchant);
  } catch (err) {
    next(err);
  }
});


// GET /api/trends/subcategoryOvertime/:userId/:fromDate/:toDate/:subcategory
router.get("/subcategoryOvertime/:userId/:fromDate/:toDate/:subcategory", async (req, res, next) => {
  try {
    const dataOvertimeBySubCategory = await db.query(`select 
    to_char(to_date(date,'YYYY-MM-DD'),'yyyy-mm') as "yearmonth",
    transactions.credit_debit,
    sum(transactions.amount) as "transactionAmount",
    subcategories.sub_category_name as "subcategoryName"
    from
    transactions,
    subcategories
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
    and transactions."subcategoryId"=subcategories.id
    and subcategories.sub_category_name=${req.params.subcategory}
    group by
    transactions.credit_debit,
    yearmonth,
    subcategories.sub_category_name
    order by yearmonth`);

    res.json(dataOvertimeBySubCategory);
  } catch (err) {
    next(err);
  }
});

// GET /api/trends/categories/:userId/:fromDate/:toDate
router.get("/categories/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    const categories = await db.query(`SELECT
		categories.category_name AS "categoryName",
		subcategories.sub_category_name AS "subCategoryName",
		sum(transactions.amount) AS "transactionAmount"
	  FROM
		subcategories,
		categories,
		transactions
	  WHERE
		categories.id = subcategories."categoryId"
		and transactions."subcategoryId"=subcategories.id
		and transactions.credit_debit='debit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${req.params.fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${req.params.toDate},'YYYY-MM-DD')
    and transactions."userId"=${req.params.userId}
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
