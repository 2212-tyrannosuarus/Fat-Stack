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
  start_date: {
    // 2018-07-09
    type: Sequelize.STRING,
    allowNull: false,
  },
  goal_date: {
    // 2018-07-09
    type: Sequelize.STRING,
    allowNull: false,
  },
  completion_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Goal;
