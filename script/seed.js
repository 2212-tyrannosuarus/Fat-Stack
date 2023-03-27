//transactions
("use strict");
//overcview, alltrasn, signle trans, budget
const convertCsv = require("./transactionSeed");
const subcategoryArr = require("./subcategoryList");
const bulkTransactions = require("./transactionGenerator");
const categoriesArr = require("./categoryList");
const dataSetTwoFunc = require("./transactionCsvFormatter");

const assignCategoryToSubCategory = require("./assignCategoryToSubCategory");

const subcategoryArrObj = subcategoryArr.map((subCategory) => {
  return {
    sub_category_name: subCategory,
  };
});

const goalCategoryArr = [
  "Crush a Loan",
  "Save for a Rainy Day",
  "Prepare for Retirement",
  "Buy a Home",
  "Buy a Car",
  "Save for College",
  "Take a Trip",
  "Something Else",
];
const {
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
} = require("../server/db");
const Goal_Category = require("../server/db/models/GoalCategory");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  const bankAccountArr = [
    "GD5JC6GNBB2SBRZ9W8Z1JB95IGWBSWT13EST0",
    "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    "73OYBP3ZRDKKJMC7CX66HJLFX72RFGUEHRYDM",
  ];
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  //*******START OF DEMO DATA */
  const bulkGoalCategoryObjArr = goalCategoryArr.map((goal) => {
    return { name: goal };
  });
  const createBulkGoalCategories = await Goal_Category.bulkCreate(
    bulkGoalCategoryObjArr
  );
  const bulkSeedSubCategories = await Sub_Category.bulkCreate(
    subcategoryArrObj
  );

  //Creating 3 goals
  const dateArrGoals = [
    "2020-01-21",
    "2020-02-21",
    "2020-03-21",
    "2020-04-21",
    "2020-05-21",
    "2020-06-21",
    "2020-07-21",
    "2020-08-21",
    "2020-09-21",
    "2020-10-21",
    "2020-11-21",
    "2020-12-21",
    "2021-01-21",
    "2021-02-21",
    "2021-03-21",
    "2021-04-21",
    "2021-05-21",
    "2021-06-21",
    "2021-07-21",
    "2021-08-21",
    "2021-09-21",
    "2021-10-21",
    "2021-11-21",
    "2021-12-21",
    "2022-01-21",
    "2022-02-21",
    "2022-03-21",
    "2022-04-21",
    "2022-05-21",
    "2022-06-21",
    "2022-07-21",
    "2022-08-21",
    "2022-09-21",
    "2022-10-21",
    "2022-11-21",
    "2022-12-21",
    "2023-01-21",
    "2023-02-21",
    "2023-03-21",
    "2023-04-21",
  ];

  // creating three bank a/cs for csv transaction data
  const bankAccountOne = await Bank_Account.create({
    account_id: "GD5JC6GNBB2SBRZ9W8Z1JB95IGWBSWT13EST0",
    available_balance: 10000.0,
    account_number: "34049320",
    account_type: "Checking",
    account_name: "Chase Checking",
  });
  const bankAccountTwo = await Bank_Account.create({
    account_id: "73OYBP3ZRDKKJMC7CX66HJLFX72RFGUEHRYDM",
    available_balance: 20000.0,
    account_number: "55224476",
    account_type: "Credit",
    account_name: "Platiunum Card",
  });
  const bankAccountThree = await Bank_Account.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    available_balance: 10000.0,
    account_number: "96895944",
    account_type: "Credit",
    account_name: "Silver Card",
  });
  const bankAccountFour = await Bank_Account.create({
    account_id: "05K6UQO2YFSB3PCUJXW25G8EZHVWK71RJMB",
    available_balance: 570.8,
    account_number: "79924094",
    account_type: "Checking",
    account_name: "Chase Debit Card",
  });
  const bankAccountFive = await Bank_Account.create({
    account_id: "2QKGZ1UJF6RHX8B54E7YMWV20PCJSN3OAD9",
    available_balance: 750.9,
    account_number: "22876221",
    account_type: "Checking",
    account_name: "M&T Debit Card",
  });

  // creating user for csv transaction data
  const userTasneem = await User.create({
    username: "tasneemp",
    password: "tasneemPass",
    email: "tasnee@gmail.com",
    phone_number: "1234561234",
  });
  bankAccountOne.setUser(userTasneem);
  bankAccountTwo.setUser(userTasneem);
  bankAccountThree.setUser(userTasneem);
  const userMiro = await User.create({
    username: "mirom",
    password: "miroPass",
    email: "miro@gmail.com",
    phone_number: "2345671234",
  });
  bankAccountFour.setUser(userMiro);
  bankAccountFive.setUser(userMiro);

  // Create categories
  categoriesArr.forEach(async (category) => {
    await Category.create({ category_name: category });
  });

  const tripGoal = await Goal.create({
    name: "Hawaii",
    goalamount: 5000,
    contributedamount: 5000,
    start_date: "2022-04-21",
    goal_date: "2023-08-21",
    completion_status: true,
    userId: 1,
    goalCategoryId: 7,
  });
  const studentloan = await Goal.create({
    name: "Student Loans",
    goalamount: 20000,
    contributedamount: 5700,
    start_date: "2020-01-21",
    goal_date: "2030-02-21",
    completion_status: false,
    userId: 1,
    goalCategoryId: 1,
  });
  const house = await Goal.create({
    name: "Lake House Downpayment",
    goalamount: 78999,
    contributedamount: 12225,
    start_date: "2021-01-01",
    goal_date: "2035-01-01",
    completion_status: false,
    userId: 1,
    goalCategoryId: 4,
  });

  // assign category to sub category
  assignCategoryToSubCategory();

  // Reading csv transaciton data and adding transactions to db
  const csvDataArr = await convertCsv();
  const dataSetTwo = await dataSetTwoFunc();
  let transactionsArr = [];
  csvDataArr.forEach(async (transaction) => {
    let bankAccount = "";

    let accountId = "";
    if (transaction.accountName.includes("Checking")) {
      accountId = "GD5JC6GNBB2SBRZ9W8Z1JB95IGWBSWT13EST0";
      bankAccount = await Bank_Account.findOne({
        where: { account_id: accountId },
      });
    } else if (transaction.accountName.includes("Platinum Card")) {
      accountId = "73OYBP3ZRDKKJMC7CX66HJLFX72RFGUEHRYDM";
      bankAccount = await Bank_Account.findOne({
        where: { account_id: accountId },
      });
    } else if (transaction.accountName.includes("Silver Card")) {
      accountId = "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P";
      bankAccount = await Bank_Account.findOne({
        where: { account_id: accountId },
      });
    }
    let transactionToCreate = {
      account_id: accountId,
      merchant: transaction.description,
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.subCategory,
      sub_category: transaction.subCategory,
      credit_debit: transaction.tranactionType,
    };
    let newTransaction = await Transaction.create(transactionToCreate);
    let currentSubCategory = await Sub_Category.findOne({
      where: { sub_category_name: transaction.subCategory },
    });

    if (!currentSubCategory || currentSubCategory === null) {
      let uncategorized = await Sub_Category.findOne({
        where: { sub_category_name: "Uncategorized" },
      });
      newTransaction.setSubcategory(uncategorized);
      newTransaction.setUser(userTasneem);
      newTransaction.setBankaccount(bankAccount);
    } else {
      newTransaction.setSubcategory(currentSubCategory);
      newTransaction.setUser(userTasneem);
      newTransaction.setBankaccount(bankAccount);
    }
    transactionsArr.push(newTransaction);
  });

  dataSetTwo.forEach(async (transaction) => {
    let bankAccount = "";
    let accountId = "";
    if (transaction.accountName.includes("Chase")) {
      accountId = "05K6UQO2YFSB3PCUJXW25G8EZHVWK71RJMB";
      bankAccount = await Bank_Account.findOne({
        where: { account_id: accountId },
      });
    } else if (transaction.accountName.includes("M&T")) {
      accountId = "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P";
      bankAccount = await Bank_Account.findOne({
        where: { account_id: accountId },
      });
    }
    let transactionToCreate = {
      account_id: accountId,
      merchant: transaction.description,
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.subCategory,
      sub_category: transaction.subCategory,
      credit_debit: transaction.tranactionType,
    };

    let newTransaction = await Transaction.create(transactionToCreate);
    let currentSubCategory = await Sub_Category.findOne({
      where: { sub_category_name: transaction.subCategory },
    });

    if (!currentSubCategory || currentSubCategory === null) {
      let uncategorized = await Sub_Category.findOne({
        where: { sub_category_name: "Uncategorized" },
      });
      newTransaction.setSubcategory(uncategorized);
      newTransaction.setUser(userMiro);
      newTransaction.setBankaccount(bankAccount);
    } else {
      newTransaction.setSubcategory(currentSubCategory);
      newTransaction.setUser(userMiro);
      newTransaction.setBankaccount(bankAccount);
    }
    transactionsArr.push(newTransaction);
  });

  let tripTrans = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Hawaii",
    date: "2022-04-21",
    amount: 1500,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let tripTrans1 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Hawaii",
    date: "2022-06-21",
    amount: 1700,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let tripTrans2 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Hawaii",
    date: "2022-08-21",
    amount: 1300,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let tripTrans3 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Hawaii",
    date: "2023-01-21",
    amount: 500,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house1 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-01-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house2 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-02-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house3 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-03-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house4 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-04-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house5 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-05-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house6 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-06-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house7 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-07-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house8 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-08-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house9 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-09-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house10 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-10-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house11 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-11-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house12 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2021-12-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house13 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-01-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });
  let house14 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-02-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });
  let house15 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-03-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });
  let house16 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-04-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });
  let house17 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-05-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });
  let house18 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-06-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house19 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-07-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house20 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-08-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house21 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-09-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house22 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-10-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house23 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-11-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house24 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2022-12-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  let house25 = await Transaction.create({
    account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
    merchant: "Lake House Downpayment",
    date: "2023-01-21",
    amount: 489,
    hide_from_budget: false,
    credit_debit: "debit",
    userId: 1,
    bankaccountId: 3,
    subcategoryId: 111,
  });

  dateArrGoals.forEach(async (date) => {
    await Transaction.create({
      account_id: "D4M21L8KADVDLHTR7M3YV3FP4V2IFZ0N15A3P",
      merchant: "Student Loans",
      date: date,
      amount: 150,
      hide_from_budget: false,
      credit_debit: "debit",
      userId: 1,
      bankaccountId: 3,
      subcategoryId: 111,
    });
    console.log(date);
  });

  //creating budget schemes
  const budgetScheme1 = await Budget_Scheme.create({
    scheme_name: "Every Month",
  });
  const budgetScheme2 = await Budget_Scheme.create({ scheme_name: "Once" });
  for (let i = 3; i <= 12; i++) {
    await Budget_Scheme.create({ scheme_name: `Every Few Months ${i}` });
  }

  //creating budget items for user tasneem
  const budgetItem1 = await Budget.create({
    budget_name: "Restaurants",
    amount: 200.0,
    date_started: "2023-01-01",
  });
  budgetItem1.setBudgetscheme(budgetScheme1);
  budgetItem1.setUser(userTasneem);
  let restaurants = await Sub_Category.findOne({
    where: { sub_category_name: "Restaurants" },
  });
  budgetItem1.setSubcategory(restaurants);

  const budgetItem2 = await Budget.create({
    budget_name: "Mortgage",
    amount: 1500.0,
    date_started: "2023-01-01",
  });
  budgetItem2.setBudgetscheme(budgetScheme1);
  budgetItem2.setUser(userTasneem);
  let mortgage = await Sub_Category.findOne({
    where: { sub_category_name: "Mortgage & Rent" },
  });
  budgetItem2.setSubcategory(mortgage);

  const budgetItem3 = await Budget.create({
    budget_name: "Paycheck",
    amount: 5000.0,
    date_started: "2023-01-01",
  });
  budgetItem3.setBudgetscheme(budgetScheme1);
  budgetItem3.setUser(userTasneem);
  let paycheck = await Sub_Category.findOne({
    where: { sub_category_name: "Paycheck" },
  });
  budgetItem3.setSubcategory(paycheck);

  return;
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
