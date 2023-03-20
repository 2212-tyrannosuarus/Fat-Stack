const router = require("express").Router();
const {
  models: { Bank_Account },
} = require("../db");
// api/bankAccounts
router.get("/", async (req, res, next) => {
  try {
    const bankAccounts = await Bank_Account.findAll({
      where: {
        userId: 1,
      },
    });
    res.status(200).json(bankAccounts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
