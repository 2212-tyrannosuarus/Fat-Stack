const Sequelize = require("sequelize");
const db = require("../db");

const Goal_Category = db.define("goal_category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Goal_Category;
