const router = require("express").Router();
const {
  models: { Goal, Goal_Category, Transaction },
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

router.post("/transaction", async (req, res, next) => {
  try {
    res.status(201).send(await Transaction.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/contribute", async (req, res, next) => {
  try {
    const goal = await Goal.findOne({ where: { name: req.body.name } });
    let newBalance =
      parseInt(goal.contributedamount) + req.body.contributedamount;
    console.log(
      "newBalance",
      newBalance,
      typeof goal.contributedamount,
      typeof req.body.contributedamount
    );

    res.status(201).send(await goal.update({ contributedamount: newBalance }));
  } catch (err) {
    next(err);
  }
});

router.get("/goallist", async (req, res, next) => {
  try {
    const goallist = await Goal.findAll();
    res.send(goallist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
