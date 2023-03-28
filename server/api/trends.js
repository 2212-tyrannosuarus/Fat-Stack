const router = require("express").Router();
const { db } = require("../db");
const {
  trendsOvertimeFunc,
  trendsCategoryPieFunc,
  trendsMerchantPieFunc,
  trendsOvertimeBySubCategoryFunc,
  trendsCategoriesFunc,
  trendsOverviewChartFunc,
} = require("../../script/trendsQueries.js");
module.exports = router;

// GET /api/trends/overtime/:userId/:fromDate/:toDate
router.get("/overtime/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let trendsOvertimeQuery = trendsOvertimeFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const dataOvertime = await db.query(trendsOvertimeQuery);

    res.json(dataOvertime);
  } catch (err) {
    next(err);
  }
});

// GET /api/trends/categoryPie/:userId/:fromDate/:toDate
router.get("/categoryPie/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let trendsCategoryPieQuery = trendsCategoryPieFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const dataByCategory = await db.query(trendsCategoryPieQuery);

    res.json(dataByCategory);
  } catch (err) {
    next(err);
  }
});

// GET /api/trends/merchantPie/:userId/:fromDate/:toDate
router.get("/merchantPie/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let trendsMechantPieQuery = trendsMerchantPieFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const dataByMerchant = await db.query(trendsMechantPieQuery);

    res.json(dataByMerchant);
  } catch (err) {
    next(err);
  }
});

// GET /api/trends/subcategoryOvertime/:userId/:fromDate/:toDate/:subcategory
router.get(
  "/subcategoryOvertime/:userId/:fromDate/:toDate/:subcategory",
  async (req, res, next) => {
    try {
      let trendsOvertimeBySubCategoryQuery = trendsOvertimeBySubCategoryFunc(
        req.params.userId,
        req.params.fromDate,
        req.params.toDate,
        req.params.subcategory
      );

      const dataOvertimeBySubCategory = await db.query(
        trendsOvertimeBySubCategoryQuery
      );

      res.json(dataOvertimeBySubCategory);
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/trends/categories/:userId/:fromDate/:toDate
router.get("/categories/:userId/:fromDate/:toDate", async (req, res, next) => {
  try {
    let trendsCategoriesQuery = trendsCategoriesFunc(
      req.params.userId,
      req.params.fromDate,
      req.params.toDate
    );

    const categories = await db.query(trendsCategoriesQuery);

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// GET /api/trends/overviewChart/:userId/:fromDate/:toDate
router.get(
  "/overviewChart/:userId/:fromDate/:toDate",
  async (req, res, next) => {
    try {
      let trendsOverviewChartQuery = trendsOverviewChartFunc(
        req.params.userId,
        req.params.fromDate,
        req.params.toDate
      );

      const categories = await db.query(trendsOverviewChartQuery);

      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
);
