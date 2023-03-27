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
router.get("/:id", async (req, res, next) => {
  try {
    const bankAccount = await Bank_Account.findByPk(req.params.id);
    res.json(bankAccount);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  console.log("re body", req.params.id);
  try {
    const bankAccount = await Bank_Account.findByPk(req.params.id);
    res.json(await bankAccount.update(req.body));
  } catch (e) {
    next(e);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const bankAccounts = await Bank_Account.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json(bankAccounts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
