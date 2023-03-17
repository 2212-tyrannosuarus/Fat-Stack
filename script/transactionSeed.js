const fs = require("fs/promises");
const path = require("path");
const convertCsv = async () => {
  const data = await fs.readFile(
    path.resolve(__dirname, "Tranactions_Mar_15.csv"),
    { encoding: "utf8" }
  );
  const csvData = data.split("\n").map((row) => {
    const [
      date,
      description,
      amount,
      tranactionType,
      subCategory,
      accountName,
    ] = row.split(",");
    return {
      date: date.toString(),
      description: description,
      amount: parseFloat((amount * 1.0).toFixed(2)),
      tranactionType: tranactionType,
      subCategory: subCategory,
      accountName: accountName,
    };
  });
  //   console.log(“cdata”, csvData);
  return csvData;
};
convertCsv();
module.exports = convertCsv;
