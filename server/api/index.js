const router = require("express").Router();
module.exports = router;

router.use("/overview", require("./overview"));
router.use("/allTransactions", require("./allTransactions"));
router.use("/singleTransaction", require("./singleTransaction"));
router.use("/budget", require("./budget"));
router.use("/plaid", require("./plaid"));
router.use("/bankAccounts", require("./bankAccounts"));
router.use("/subCategories", require("./subCategories"));
router.use("/trends", require("./trends"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
