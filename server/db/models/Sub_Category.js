const Sequelize = require("sequelize");
const db = require("../db");

const Sub_Category = db.define("subcategory", {
  sub_category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Sub_Category;
