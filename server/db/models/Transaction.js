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
  hide_from_budget: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  credit_debit: {
    type: Sequelize.ENUM,
    values: ["credit", "debit"],
    defaultValue: "credit",
  },
});

module.exports = Transaction;
