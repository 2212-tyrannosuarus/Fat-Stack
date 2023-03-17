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
User.hasMany(Goal);
Goal.belongsTo(User);

User.hasMany(Bank_Account);
Bank_Account.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Bank_Account.hasMany(Transaction);
Transaction.belongsTo(Bank_Account);

Transaction.hasMany(Note);
Note.belongsTo(Transaction);

Transaction.belongsTo(Sub_Category);
Sub_Category.hasMany(Transaction);

Sub_Category.belongsTo(Category);
Category.hasMany(Sub_Category);

Category.hasMany(User_Category);
User_Category.belongsTo(Category);

Budget.belongsTo(Sub_Category);
Sub_Category.hasMany(Budget);

Budget.belongsTo(User_Category);
User_Category.hasMany(Budget);

Budget.hasOne(Budget_Scheme);
Budget_Scheme.hasMany(Budget);

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
