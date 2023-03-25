const router = require("express").Router();

const {
  models: { Transaction, Sub_Category, Category, Note },
} = require("../db");

module.exports = router;

// GET api/transactions/#transactionId

router.get("/subcategory", async (req, res, next) => {
  try {
    const subCategory = await Sub_Category.findAll();
    res.json(subCategory);
  } catch (err) {
    next(err);
  }
});

router.post("/goalstransaction", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { merchant: req.body.name },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.put("/changeallsubcategory", async (req, res, next) => {
  try {
    const { name, body } = req.body;
    const transactions = await Transaction.findAll(
      {
        where: { merchant: name },
      },
      { include: [Note] }
    );
    transactions.forEach((transaction) => {
      transaction.update(body);
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

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

router.get("/users/:userId", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [Note],
    });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  console.log("req.params.id", req.params.id);
  const deletedTransaction = await Transaction.findByPk(req.params.id);
  try {
    await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(deletedTransaction);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [Note],
    });
    res.json(await transaction.update(req.body));
  } catch (err) {
    next(err);
  }
});
