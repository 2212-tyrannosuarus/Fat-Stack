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

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Goal.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
