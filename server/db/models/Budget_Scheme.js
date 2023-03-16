const Sequelize = require("sequelize");
const db = require("../db");

const Budget_Scheme = db.define("budgetscheme", {
  scheme_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});
module.exports = Budget_Scheme;
