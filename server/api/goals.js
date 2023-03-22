const router = require("express").Router();
const {
  models: { Goal, Goal_Category },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const goal_categories = await Goal_Category.findAll();
    res.send(goal_categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
