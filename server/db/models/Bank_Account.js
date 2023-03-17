const Sequelize = require("sequelize");
const db = require("../db");

const Bank_Account = db.define("bankaccount", {
  account_id: {
    //account number and Id would be strings, right?
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  available_balance: {
    type: Sequelize.DECIMAL(12, 2),
  },
  account_number: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  account_type: {
    type: Sequelize.STRING,
  },
  account_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Bank_Account;
