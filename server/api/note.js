const router = require("express").Router();
const {
  models: { Sub_Category, Note },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body.transactionId);
    let notes = await Note.findAll({
      where: { transactionId: req.body.transactionId },
    });
    res.send(notes);
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const note = await Note.findByPk(req.body.id);
    res.send(await note.update(req.body.body));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
