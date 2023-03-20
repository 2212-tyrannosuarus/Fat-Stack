const router = require("express").Router();
const {
  models: { Sub_Category },
} = require("../db");
// api/subCategories
router.get("/", async (req, res, next) => {
  try {
    const subCategories = await Sub_Category.findAll();
    res.status(200).json(subCategories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
