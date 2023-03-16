const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  account_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  merchant: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    // format: 2018-07-09
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  //should these category fields be left off? Will they be defined
  //via relationships?
  category: {
    type: Sequelize.STRING,
  },
  sub_category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hide_from_budget: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  credit_debit: {
    type: Sequelize.ENUM,
    values: ["credit", "debit"],
  },
});

module.exports = Transaction;
