const fs = require("fs/promises");
const path = require("path");
const csvToData = async () => {
  const csvData = await fs.readFile(
    path.resolve(__dirname, "Transactions_User_2.csv"),
    { encoding: "utf8" }
  );
  let result = [];
  let lines = csvData.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let cols = line.split(",");
    result.push({
      date: cols[2],
      description: cols[6],
      amount: parseFloat(Math.abs(cols[4])).toFixed(2),
      transactionType: cols[4].startsWith("-") ? "debit" : "credit",
      subCategory: cols[6] === "" ? "Uncategorized" : cols[6],
      accountName: cols[7].replace(/\r/g, "\n").trim(),
    });
  }
  return result;
};

csvToData();

module.exports = csvToData;
