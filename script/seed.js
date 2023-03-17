//transactions
("use strict");
//overcview, alltrasn, signle trans, budget
const convertCsv = require("./transactionSeed");
const subcategoryArr = require("./subcategoryList");
const bulkTransactions = require("./transactionGenerator");
const subcategoryArrObj = subcategoryArr.map((subCategory) => {
  return {
    sub_category_name: subCategory,
  };
});

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
console.log("test");
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

  // const bulkSeedTransactions = await Transaction.bulkCreate(bulkTransactions);
  const bulkSeedSubCategories = await Sub_Category.bulkCreate(
    subcategoryArrObj
  );

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

  // Reading csv transaciton data and adding transactions to db
  const csvDataArr = await convertCsv();
  let transactionsArr = [];
  csvDataArr.forEach(async (transaction) => {
    let bankAccount = "";
    // console.log("transaction ", transaction);
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

  //creating budget schemes
  const budgetScheme1 = await Budget_Scheme.create({scheme_name: "Every Month"});
  const budgetScheme2 = await Budget_Scheme.create({scheme_name: "Once"});
  for (let i = 3; i <= 12; i++) {
    await Budget_Scheme.create({scheme_name: `Every Few Months ${i}`});
  }

  //creating budget items for user tasneem
  const budgetItem1 = await Budget.create({budget_name: "Travel", amount: 500.00, date_started: "2023-01-01"});
  budgetItem1.setBudgetscheme(budgetScheme1);
  budgetItem1.setUser(userTasneem);
  let travel = await Sub_Category.findOne({where: {sub_category_name: "Travel"}});
  budgetItem1.setSubcategory(travel);

  const budgetItem2 = await Budget.create({budget_name: "Mortgage", amount: 1500.00, date_started: "2023-01-01"});
  budgetItem2.setBudgetscheme(budgetScheme1);
  budgetItem2.setUser(userTasneem);
  let mortgage = await Sub_Category.findOne({where: {sub_category_name: "Mortgage & Rent"}});
  budgetItem2.setSubcategory(mortgage);

  console.log(`seeded successfully`);
  return;
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
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
