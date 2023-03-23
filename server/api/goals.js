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

    let status = false;
    if (newBalance >= goal.goalamount) status = true;

    res.status(201).send(
      await goal.update({
        contributedamount: newBalance,
        completion_status: status,
      })
    );
  } catch (err) {
    next(err);
  }
});

router.get("/goallist", async (req, res, next) => {
  try {
    const goallist = await Goal.findAll({
      where: { completion_status: false },
    });
    res.send(goallist);
  } catch (err) {
    next(err);
  }
});

router.get("/goallist/completed", async (req, res, next) => {
  try {
    const goallist = await Goal.findAll({
      where: { completion_status: true },
    });
    res.send(goallist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

module.exports = router;