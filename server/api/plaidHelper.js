const {
  models: { Bank_Account, Transaction },
} = require("../db");

const categoryMap = {
  "Auto Insurance": 1,
  "Auto Payment": 2,
  "Gas & Fuel": 3,
  Parking: 4,
  "Public Transportation": 5,
  "Ride Share": 6,
  "Service & Parts": 7,
  "Home Phone": 8,
  Internet: 9,
  "Mobile Phone": 10,
  Television: 11,
  Utilities: 12,
  Subscription: 13,
  Advertising: 14,
  Legal: 15,
  "Office Supplies": 16,
  Printing: 17,
  Shipping: 18,
  "Books & Supplies": 19,
  "Student Loan": 20,
  Tuition: 21,
  Amusement: 22,
  Arts: 23,
  "Movies & DVDs": 24,
  "Newspapers & Magazines": 25,
  Entertainment: 26,
  "ATM Fee": 27,
  "Bank Fees": 28,
  "Finance Charge": 29,
  "Late Fee": 30,
  "Service Fee": 31,
  "Trade Commissions": 32,
  "Financial Advisor": 33,
  "Financial Planning and Investments": 34,
  "Life Insurance": 35,
  "Alcohol & Bars": 36,
  "Coffee Shops": 37,
  "Fast Food": 38,
  "Food Delivery": 39,
  Groceries: 40,
  Restaurants: 41,
  Charity: 42,
  Gift: 43,
  Dentist: 44,
  Doctor: 45,
  "Eye Care": 46,
  Gym: 47,
  "HealthCare Insurance": 48,
  Pharmacy: 49,
  Sports: 50,
  Furnishings: 51,
  "Home Improvement": 52,
  "Home Insurance": 53,
  "Home Services": 54,
  "Home Supplies": 55,
  "Lawn & Garden": 56,
  "Mortgage & Rent": 57,
  Bonus: 58,
  "Interest Income": 59,
  Paycheck: 60,
  Reimbursement: 61,
  "Rental Income": 62,
  "Rented Purchase": 63,
  Buy: 64,
  Deposit: 65,
  "Dividend & Cap Gains": 66,
  Sell: 67,
  Allowance: 68,
  "Baby Supplies": 69,
  "Baby Sitter & Daycare": 70,
  "Child Support": 71,
  "Kids Activities": 72,
  Toys: 73,
  "Loan Fees & Charges": 74,
  "Loan Insurance": 75,
  "Loan Interest": 76,
  "Loan Payment": 77,
  "Loan Principal": 78,
  Hair: 79,
  Laundry: 80,
  "Spa & Massage": 81,
  "Personal Care": 82,
  "Pet Food & Supplies": 83,
  "Pet Grooming": 84,
  Veterinary: 85,
  Pets: 86,
  Books: 87,
  "Clothing and Accessories": 88,
  "Electronics & Software": 89,
  "Arts and Crafts": 90,
  "Sporting Goods": 91,
  Auctions: 92,
  "Hardware Store": 93,
  Shops: 94,
  "Federal tax": 95,
  "Local Tax": 96,
  "Property Tax": 97,
  "Sales tax": 98,
  "State tax": 99,
  "Credit Card Payment": 100,
  Withdrawal: 101,
  Debit: 102,
  "Transfer For Cash Spending": 103,
  Travel: 104,
  "Air Travel": 105,
  Hotel: 106,
  "Rental Car & taxi": 107,
  Vacation: 108,
  "Cash & ATM": 109,
  Check: 110,
  "Credit Card": 111,
  "Debit Card": 112,
  Uncategorized: 113,
};

const plaidMap = {
  Insurance: 1,
  "Gas Stations": 3,
  Gas: 3,
  "Public Transportation Services": 5,
  "Car Parts and Accessories": 7,
  "Internet Services": 9,
  Cable: 11,
  Billpay: 12,
  "Business Services": 14,
  Bookstores: 19,
  Education: 21,
  "Arts and Crafts": 23,
  "Arts and Entertainment": 23,
  "Music, Video and DVD": 24,
  "Credit Counseling and Bankruptcy Services": 31,
  Financial: 34,
  "Coffee Shop": 37,
  "Supermarkets and Groceries": 40,
  "Convenience Store": 40,
  Food: 41,
  "Food and Beverage": 41,
  "Food and Drink": 41,
  "Gift and Novelty": 43,
  "Glasses and Optometrist": 46,
  "Gyms and Fitness Centers": 47,
  "Furniture and Home Decor": 51,
  "Keep the Change Savings Program": 64,
  "Loans and Mortgages": 77,
  "Beauty Products": 82,
  "Marine Supplies": 83,
  Clothing: 88,
  "Computers and Electronics": 89,
  Electronics: 89,
  "Department Stores": 94,
  "Digital Purchase": 94,
  "Discount Stores": 94,
  "Credit Card": 100,
  "Airlines and Aviation Services": 105,
  Lodging: 106,
  Taxi: 107,
  "Equipment Rental": 107,
};

const accountToDB = async (arr, arr2) => {
  for (let i = 0; i < arr.length; i++) {
    const bankAccount = await Bank_Account.create({
      account_id: arr[i].account_id,
      account_number: arr2.ach[i].account,
      account_type: arr[i].name,
      account_name: arr[i].official_name,
      available_balance: arr[i].balances.available,
      //using account_id, look up user with such account_id and assign userId to that user's ID
    });
  }
  console.log("seeding user success");
};

const transactionToDB = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let credit = "debit";
    let catId = 113;
    if (arr[i].amount < 0) {
      credit = "credit";
    }
    if (plaidMap.hasOwnProperty(arr[i].category[arr[i].category.length - 1])) {
      let str = arr[i].category[arr[i].category.length - 1];
      catId = plaidMap[str];
    } else if (
      categoryMap.hasOwnProperty(arr[i].category[arr[i].category.length - 1])
    ) {
      let str = arr[i].category[arr[i].category.length - 1];
      catId = categoryMap[str];
    }

    const transaction = await Transaction.create({
      account_id: arr[i].account_id,
      merchant: arr[i].name,
      date: arr[i].date,
      amount: arr[i].amount,
      // category: arr[i].category[0],
      hide_from_budget: false,
      credit_debit: credit,
      subcategoryId: catId,
      //somehow do category
    });
  }
};

module.exports = { accountToDB, transactionToDB };
