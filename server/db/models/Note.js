const Sequelize = require("sequelize");
const db = require("../db");

const Note = db.define("note", {
  transaction_note: {
    type: Sequelize.STRING,
  },
});

module.exports = Note;
