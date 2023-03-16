const Sequelize = require("sequelize");
const db = require("../db");

const User_Category = db.define("usercategory", {
  user_category_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});
module.exports = User_Category;
