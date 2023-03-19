const Sequelize = require("sequelize");
const db = require("../db");

const Budget = db.define("budget", {
  budget_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  date_started: {
    //format 2018-07-09
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Budget;
