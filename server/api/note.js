const router = require("express").Router();
const {
  models: { Sub_Category, Note },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.id);
    res.send(note);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let notes = await Note.findAll({
      where: { transactionId: req.body.transactionId },
    });
    res.send(notes);
  } catch (e) {
    next(e);
  }
});

router.post("/addnote", async (req, res, next) => {
  try {
    console.log(req.body);
    const note = await Note.create(req.body);
    res.send(note);
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

router.delete("/:id", async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.id);
    console.log(note);
    res.send(await note.destroy());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
