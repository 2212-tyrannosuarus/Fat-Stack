const Sequelize = require("sequelize");
const db = require("../db");

const Goal = db.define("goal", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  goalamount: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  contributedamount: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  goal_date: {
    // 2018-07-09
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Goal;
