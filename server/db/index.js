//this is the access point for all things database related!

const db = require("./db");

const Bank_Account = require("./models/Bank_Account");
const Budget_Scheme = require("./models/Budget_Scheme");
const Budget = require("./models/Budget");
const Category = require("./models/Category");
const Goal = require("./models/Goal");
const Note = require("./models/Note");
const Sub_Category = require("./models/Sub_Category");
const Transaction = require("./models/Transaction");
const User_Category = require("./models/User_Category");
const User = require("./models/User");

//associations could go here!

// Product.belongsToMany(Size, {
//   through: "product_size",
//   foreignKey: Product.id,
// });

// Size.belongsToMany(Product, { through: "product_size", foreignKey: Size.id });

module.exports = {
  db,
  models: {
    Bank_Account,
    Budget_Scheme,
    Budget,
    Category,
    Goal,
    Note,
    Sub_Category,
    Transaction,
    User_Category,
    User,
  },
};
