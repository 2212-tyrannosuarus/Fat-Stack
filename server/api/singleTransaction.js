const router = require("express").Router();
const {
  models: { Transaction },
} = require("../db");
module.exports = router;

// GET api/transactions/#transactionId
router.get("/", async (req, res, next) => {
  try {
    const transaction = await Product.findOne({
      include: [Cart_Item, { model: Inventory, include: Size }],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});
