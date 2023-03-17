const router = require("express").Router();
const {
  models: { Transaction },
} = require("../db");

module.exports = router;

// GET api/transactions/#transactionId
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const transaction = await Transaction.findByPk(id);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});
