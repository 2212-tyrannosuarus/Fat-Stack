const router = require("express").Router();
const {
  models: { Transaction },
} = require("../db");
// api/transactions
router.get("/", async (req, res, next) => {
  //talk to Chance about getting logged in user info
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

module.exports = router;
