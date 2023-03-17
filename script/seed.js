//transactions
//overcview, alltrasn, signle trans, budget
const bulkTransactions = require("./transactionGenerator");
("use strict");

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

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  //*******START OF DEMO DATA */
  const bulkSeedTransactions = await Transaction.bulkCreate(bulkTransactions);
  const seededTransactions = await Promise.all([
    Transaction.create({
      account_id: "1234567",
      merchant: "Amazon",
      date: "2023-02-25",
      amount: 12.5,
      sub_category: "Electronics",
      credit_debit: "credit",
    }),
    Transaction.create({
      account_id: "1234567",
      merchant: "Taco Bell",
      date: "2023-02-26",
      amount: 5.57,
      sub_category: "Food",
      credit_debit: "credit",
    }),
    Transaction.create({
      account_id: "1234567",
      merchant: "Taco Bell",
      date: "2023-02-27",
      amount: 8.44,
      sub_category: "Food",
      credit_debit: "credit",
    }),
    Transaction.create({
      account_id: "1234567",
      merchant: "Amazon",
      date: "2023-02-27",
      amount: 240.75,
      sub_category: "Electronics",
      credit_debit: "credit",
    }),
    Transaction.create({
      account_id: "1234567",
      merchant: "STRIIDE",
      date: "2023-02-28",
      amount: 820.5,
      sub_category: "Clothing",
      credit_debit: "credit",
    }),
    Transaction.create({
      account_id: "1234567",
      merchant: "STRIIDE",
      date: "2023-03-01",
      amount: 240.9,
      sub_category: "Clothing",
      credit_debit: "credit",
    }),
  ]);

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
