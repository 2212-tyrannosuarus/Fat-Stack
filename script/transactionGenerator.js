const merchantArr = require("./merchantList");
const subcategoryArr = require("./subcategoryList");
const accountIdArr = [
  "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
  "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
];
const generateTransactions = (
  user,
  subcategoryArr,
  merchantArr,
  accountIdArr,
  startingDate
) => {
  let transactionArr = [];
  //takes an array of vendors
  //subcategory will be attached to vendors
  //takes
  //run two transactions per day
  //monthly bills
  //monthly income

  const dateGenerator = (startingDate) => {
    const monthLookup = {
      01: 31,
      02: 59,
      03: 90,
      04: 120,
      05: 151,
      06: 181,
      07: 212,
      08: 243,
      09: 273,
      10: 304,
      11: 334,
      12: 365,
    };
    let numericDate = 1;
    let thisMonth = "";

    let lastMonth = "";
    //loop over each date
    const getDateFromNumber = (year, numericDate) => {
      let day = 1;

      const getMonthAndDay = (numericDate) => {
        for (let month in monthLookup) {
          thisMonth = month;
          if (numericDate <= 31) {
            day = numericDate.toString();
            thisMonth = "01";
            if (day.length < 2) {
              day = "0" + day;
            }
            return { day, thisMonth };
          }

          if (numericDate - monthLookup[month] <= 0) {
            day = numericDate - monthLookup[Number(lastMonth)];
            day = day.toString();
            if (day.length < 2) {
              day = "0" + day;
            }
            if (thisMonth.length < 2) {
              thisMonth = "0" + thisMonth;
            }
            return { day, thisMonth };
          }
          lastMonth = month;
        }
      };
      const monthAndDay = getMonthAndDay(numericDate);
      return [year, monthAndDay.thisMonth, monthAndDay.day].join("-");
    };
    let currDate = startingDate;
    let year = currDate.substring(0, 4);
    let month = currDate.substring(5, 7);
    let day = Number(currDate.substring(8));
    let daysFromMonth = monthLookup[Number(month)];
    numericDate = daysFromMonth + day;
    for (let i = 0; i < 365; i++) {
      if (numericDate === 365) {
        numericDate = 1;
        year = Number(year);
        year++;
        year = year.toString();
      }
      currDate = getDateFromNumber(year, numericDate);
      transactionArr.push({ date: currDate });
      numericDate++;
    }
  };
  dateGenerator(startingDate);

  const attachSubcategory = (subcategoryArr) => {
    transactionArr.map((transaction) => {
      let randomIdx = Math.floor(Math.random() * subcategoryArr.length);
      transaction.subcategory = subcategoryArr[randomIdx];
      return transaction;
    });
  };
  attachSubcategory(subcategoryArr);

  const attachMerchant = (merchantArr) => {
    transactionArr.map((transaction) => {
      let randomIdx = Math.floor(Math.random() * merchantArr.length);
      transaction.merchant = merchantArr[randomIdx];
      return transaction;
    });
  };
  attachMerchant(merchantArr);

  const attachAccountId = (accountIdArr) => {
    transactionArr.map((transaction) => {
      let randomIdx = Math.floor(Math.random() * accountIdArr.length);
      transaction.account_id = accountIdArr[randomIdx];
      return transaction;
    });
  };
  attachAccountId(accountIdArr);

  const attachAmount = (max) => {
    transactionArr.map((transaction) => {
      let randomAmount =
        Math.floor(Math.random() * max) + Math.round(Math.random() * 100) / 100;
      transaction.amount = randomAmount;
      return transaction;
    });
  };
  attachAmount(250);

  //   const attachUser = (userId) => {
  //     transactionArr.map((transaction) => {});
  //   };
  return transactionArr;
};

const bulkTransactions = generateTransactions(
  { miro: "miro" },
  subcategoryArr,
  merchantArr,
  accountIdArr,
  "2021-01-20"
);

module.exports = bulkTransactions;
