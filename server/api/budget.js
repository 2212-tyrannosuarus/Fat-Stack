const router = require("express").Router();
const {
  models: { Budget, Transaction },
} = require("../db");
const Sub_Category = require("../db/models/Sub_Category");
module.exports = router;

//GET /api/budget/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: 
      {userId: req.params.userId},
      include: [Sub_Category]
    })
   
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

// POST /api/budget/
router.post("/:id", async (req, res, next) => {
  try {

    const transactions = req.body;
   
    
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});


