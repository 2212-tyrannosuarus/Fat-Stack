const router = require("express").Router();

const {
  models: { Transaction, Sub_Category, Category },
} = require("../db");

module.exports = router;

// GET api/transactions/#transactionId

router.get("/subcategory/:id", async (req, res, next) => {
  try {
    const subCategory = await Sub_Category.findByPk(req.params.id);
    res.json(subCategory);
  } catch (err) {
    next(err);
  }
});

router.get("/category/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    res.json(await transaction.update(req.body));
  } catch (err) {
    next(err);
  }
});
