const Category = require("../server/db/models/Category");
const Sub_Category = require("../server/db/models/Sub_Category");

const assignCategoryToSubCategory = async () => {
  // Auto & transport
  const autoInsurance = await Sub_Category.findOne({
    where: { sub_category_name: "Auto Insurance" },
  });
  const autoPayment = await Sub_Category.findOne({
    where: { sub_category_name: "Auto Payment" },
  });
  const gasNFuel = await Sub_Category.findOne({
    where: { sub_category_name: "Gas & Fuel" },
  });
  const parking = await Sub_Category.findOne({
    where: { sub_category_name: "Parking" },
  });
  const publicTransportation = await Sub_Category.findOne({
    where: { sub_category_name: "Public Transportation" },
  });
  const rideShare = await Sub_Category.findOne({
    where: { sub_category_name: "Ride Share" },
  });
  const ServiceNParts = await Sub_Category.findOne({
    where: { sub_category_name: "Service & Parts" },
  });

  const autoNTransport = await Category.findOne({
    where: { category_name: "Auto & Transport" },
  });

  autoInsurance.setCategory(autoNTransport);
  autoPayment.setCategory(autoNTransport);
  gasNFuel.setCategory(autoNTransport);
  parking.setCategory(autoNTransport);
  publicTransportation.setCategory(autoNTransport);
  rideShare.setCategory(autoNTransport);
  ServiceNParts.setCategory(autoNTransport);

  // Bills & Utilities
  const homePhone = await Sub_Category.findOne({
    where: { sub_category_name: "Home Phone" },
  });
  const internet = await Sub_Category.findOne({
    where: { sub_category_name: "Internet" },
  });
  const mobilePhone = await Sub_Category.findOne({
    where: { sub_category_name: "Mobile Phone" },
  });
  const television = await Sub_Category.findOne({
    where: { sub_category_name: "Television" },
  });
  const utilities = await Sub_Category.findOne({
    where: { sub_category_name: "Utilities" },
  });
  const subscription = await Sub_Category.findOne({
    where: { sub_category_name: "Subscription" },
  });

  const billsNUtilities = await Category.findOne({
    where: { category_name: "Bills & Utilities" },
  });

  homePhone.setCategory(billsNUtilities);
  internet.setCategory(billsNUtilities);
  mobilePhone.setCategory(billsNUtilities);
  television.setCategory(billsNUtilities);
  utilities.setCategory(billsNUtilities);
  subscription.setCategory(billsNUtilities);

  // Business Services
  const advertising = await Sub_Category.findOne({
    where: { sub_category_name: "Advertising" },
  });
  const legal = await Sub_Category.findOne({
    where: { sub_category_name: "Legal" },
  });
  const officeSupplies = await Sub_Category.findOne({
    where: { sub_category_name: "Office Supplies" },
  });
  const printing = await Sub_Category.findOne({
    where: { sub_category_name: "Printing" },
  });
  const shipping = await Sub_Category.findOne({
    where: { sub_category_name: "Shipping" },
  });

  const businessServices = await Category.findOne({
    where: { category_name: "Business Services" },
  });

  advertising.setCategory(businessServices);
  legal.setCategory(businessServices);
  officeSupplies.setCategory(businessServices);
  printing.setCategory(businessServices);
  shipping.setCategory(businessServices);

  // Education
  const booksNSupplies = await Sub_Category.findOne({
    where: { sub_category_name: "Books & Supplies" },
  });
  const studentLoan = await Sub_Category.findOne({
    where: { sub_category_name: "Student Loan" },
  });
  const tuition = await Sub_Category.findOne({
    where: { sub_category_name: "Tuition" },
  });

  const education = await Category.findOne({
    where: { category_name: "Education" },
  });

  booksNSupplies.setCategory(education);
  studentLoan.setCategory(education);
  tuition.setCategory(education);

  // Entertainement
  const amusement = await Sub_Category.findOne({
    where: { sub_category_name: "Amusement" },
  });
  const arts = await Sub_Category.findOne({
    where: { sub_category_name: "Arts" },
  });
  const moviesNDvds = await Sub_Category.findOne({
    where: { sub_category_name: "Movies & DVDs" },
  });
  const newspapersNMagazines = await Sub_Category.findOne({
    where: { sub_category_name: "Newspapers & Magazines" },
  });
  const entertainment = await Sub_Category.findOne({
    where: { sub_category_name: "Entertainment" },
  });

  const entertaimentCat = await Category.findOne({
    where: { category_name: "Entertainement" },
  });

  amusement.setCategory(entertaimentCat);
  arts.setCategory(entertaimentCat);
  moviesNDvds.setCategory(entertaimentCat);
  newspapersNMagazines.setCategory(entertaimentCat);
  entertainment.setCategory(entertaimentCat);

  // Fees & Charges
  const atmFee = await Sub_Category.findOne({
    where: { sub_category_name: "ATM Fee" },
  });
  const bankFees = await Sub_Category.findOne({
    where: { sub_category_name: "Bank Fees" },
  });
  const financeCharge = await Sub_Category.findOne({
    where: { sub_category_name: "Finance Charge" },
  });
  const lateFee = await Sub_Category.findOne({
    where: { sub_category_name: "Late Fee" },
  });
  const serviceFee = await Sub_Category.findOne({
    where: { sub_category_name: "Service Fee" },
  });
  const tradeCommissions = await Sub_Category.findOne({
    where: { sub_category_name: "Trade Commissions" },
  });

  const feesNCharges = await Category.findOne({
    where: { category_name: "Fees & Charges" },
  });

  atmFee.setCategory(feesNCharges);
  bankFees.setCategory(feesNCharges);
  financeCharge.setCategory(feesNCharges);
  lateFee.setCategory(feesNCharges);
  serviceFee.setCategory(feesNCharges);
  tradeCommissions.setCategory(feesNCharges);

  // Financial
  const financialAdvisor = await Sub_Category.findOne({
    where: { sub_category_name: "Financial Advisor" },
  });
  const financialPlanning = await Sub_Category.findOne({
    where: { sub_category_name: "Financial Planning and Investments" },
  });
  const lifeInsurance = await Sub_Category.findOne({
    where: { sub_category_name: "Life Insurance" },
  });

  const financial = await Category.findOne({
    where: { category_name: "Financial" },
  });

  financialAdvisor.setCategory(financial);
  financialPlanning.setCategory(financial);
  lifeInsurance.setCategory(financial);

  // Food & Dining
  const alcoholNBars = await Sub_Category.findOne({
    where: { sub_category_name: "Alcohol & Bars" },
  });
  const coffeeShops = await Sub_Category.findOne({
    where: { sub_category_name: "Coffee Shops" },
  });
  const fastFood = await Sub_Category.findOne({
    where: { sub_category_name: "Fast Food" },
  });
  const foodDelivery = await Sub_Category.findOne({
    where: { sub_category_name: "Food Delivery" },
  });
  const groceries = await Sub_Category.findOne({
    where: { sub_category_name: "Groceries" },
  });
  const restaurants = await Sub_Category.findOne({
    where: { sub_category_name: "Restaurants" },
  });

  const foodNDining = await Category.findOne({
    where: { category_name: "Food & Dining" },
  });

  alcoholNBars.setCategory(foodNDining);
  coffeeShops.setCategory(foodNDining);
  fastFood.setCategory(foodNDining);
  foodDelivery.setCategory(foodNDining);
  groceries.setCategory(foodNDining);
  restaurants.setCategory(foodNDining);

  // Gifts & Donations
  const charity = await Sub_Category.findOne({
    where: { sub_category_name: "Charity" },
  });
  const gift = await Sub_Category.findOne({
    where: { sub_category_name: "Gift" },
  });

  const giftsNDonations = await Category.findOne({
    where: { category_name: "Gifts & Donations" },
  });

  charity.setCategory(giftsNDonations);
  gift.setCategory(giftsNDonations);

  // Health & Fitness
  const dentist = await Sub_Category.findOne({
    where: { sub_category_name: "Dentist" },
  });
  const doctor = await Sub_Category.findOne({
    where: { sub_category_name: "Doctor" },
  });
  const eyeCare = await Sub_Category.findOne({
    where: { sub_category_name: "Eye Care" },
  });
  const gym = await Sub_Category.findOne({
    where: { sub_category_name: "Gym" },
  });
  const healthcareInsurance = await Sub_Category.findOne({
    where: { sub_category_name: "HealthCare Insurance" },
  });
  const pharmacy = await Sub_Category.findOne({
    where: { sub_category_name: "Pharmacy" },
  });
  const sports = await Sub_Category.findOne({
    where: { sub_category_name: "Sports" },
  });

  const healthNFitness = await Category.findOne({
    where: { category_name: "Health & Fitness" },
  });

  dentist.setCategory(healthNFitness);
  doctor.setCategory(healthNFitness);
  eyeCare.setCategory(healthNFitness);
  gym.setCategory(healthNFitness);
  healthcareInsurance.setCategory(healthNFitness);
  pharmacy.setCategory(healthNFitness);
  sports.setCategory(healthNFitness);

  // Home
  const furnishings = await Sub_Category.findOne({
    where: { sub_category_name: "Furnishings" },
  });
  const homeImprovement = await Sub_Category.findOne({
    where: { sub_category_name: "Home Improvement" },
  });
  const homeInsurance = await Sub_Category.findOne({
    where: { sub_category_name: "Home Insurance" },
  });
  const homeServices = await Sub_Category.findOne({
    where: { sub_category_name: "Home Services" },
  });
  const homeSupplies = await Sub_Category.findOne({
    where: { sub_category_name: "Home Supplies" },
  });
  const lawnNGarden = await Sub_Category.findOne({
    where: { sub_category_name: "Lawn & Garden" },
  });
  const mortgageNRent = await Sub_Category.findOne({
    where: { sub_category_name: "Mortgage & Rent" },
  });

  const home = await Category.findOne({ where: { category_name: "Home" } });

  furnishings.setCategory(home);
  homeImprovement.setCategory(home);
  homeInsurance.setCategory(home);
  homeServices.setCategory(home);
  homeSupplies.setCategory(home);
  lawnNGarden.setCategory(home);
  mortgageNRent.setCategory(home);

  // Income
  const bonus = await Sub_Category.findOne({
    where: { sub_category_name: "Bonus" },
  });
  const interestIncome = await Sub_Category.findOne({
    where: { sub_category_name: "Interest Income" },
  });
  const paycheck = await Sub_Category.findOne({
    where: { sub_category_name: "Paycheck" },
  });
  const reimbursement = await Sub_Category.findOne({
    where: { sub_category_name: "Reimbursement" },
  });
  const rentalIncome = await Sub_Category.findOne({
    where: { sub_category_name: "Rental Income" },
  });
  const rentedPurchase = await Sub_Category.findOne({
    where: { sub_category_name: "Rented Purchase" },
  });

  const income = await Category.findOne({ where: { category_name: "Income" } });

  bonus.setCategory(income);
  interestIncome.setCategory(income);
  paycheck.setCategory(income);
  reimbursement.setCategory(income);
  rentalIncome.setCategory(income);
  rentedPurchase.setCategory(income);

  // Investments
  const buy = await Sub_Category.findOne({
    where: { sub_category_name: "Buy" },
  });
  const deposit = await Sub_Category.findOne({
    where: { sub_category_name: "Deposit" },
  });
  const dividendNCapGains = await Sub_Category.findOne({
    where: { sub_category_name: "Dividend & Cap Gains" },
  });
  const sell = await Sub_Category.findOne({
    where: { sub_category_name: "Sell" },
  });
  const investmentWithdrawal = await Sub_Category.findOne({
    where: { sub_category_name: "Investment Withdrawal" },
  });
  const goals = await Sub_Category.findOne({
    where: { sub_category_name: "Goals" },
  });

  const investments = await Category.findOne({
    where: { category_name: "Investments" },
  });

  buy.setCategory(investments);
  deposit.setCategory(investments);
  dividendNCapGains.setCategory(investments);
  sell.setCategory(investments);
  investmentWithdrawal.setCategory(investments);
  goals.setCategory(investments);

  // Kids
  const allowance = await Sub_Category.findOne({
    where: { sub_category_name: "Allowance" },
  });
  const babySupplies = await Sub_Category.findOne({
    where: { sub_category_name: "Baby Supplies" },
  });
  const babySitter = await Sub_Category.findOne({
    where: { sub_category_name: "Baby Sitter & Daycare" },
  });
  const childSupport = await Sub_Category.findOne({
    where: { sub_category_name: "Child Support" },
  });
  const kidsActivities = await Sub_Category.findOne({
    where: { sub_category_name: "Kids Activities" },
  });
  const toys = await Sub_Category.findOne({
    where: { sub_category_name: "Toys" },
  });

  const kids = await Category.findOne({ where: { category_name: "Kids" } });

  allowance.setCategory(kids);
  babySupplies.setCategory(kids);
  babySitter.setCategory(kids);
  childSupport.setCategory(kids);
  kidsActivities.setCategory(kids);
  toys.setCategory(kids);

  // Loan
  const loanFees = await Sub_Category.findOne({
    where: { sub_category_name: "Loan Fees & Charges" },
  });
  const loanInsurance = await Sub_Category.findOne({
    where: { sub_category_name: "Loan Insurance" },
  });
  const loanInterest = await Sub_Category.findOne({
    where: { sub_category_name: "Loan Interest" },
  });
  const loanPayment = await Sub_Category.findOne({
    where: { sub_category_name: "Loan Payment" },
  });
  const loanPrincipal = await Sub_Category.findOne({
    where: { sub_category_name: "Loan Principal" },
  });

  const loan = await Category.findOne({ where: { category_name: "Loan" } });

  loanFees.setCategory(loan);
  loanInsurance.setCategory(loan);
  loanInterest.setCategory(loan);
  loanPayment.setCategory(loan);
  loanPrincipal.setCategory(loan);

  // Personal Care
  const hair = await Sub_Category.findOne({
    where: { sub_category_name: "Hair" },
  });
  const laundry = await Sub_Category.findOne({
    where: { sub_category_name: "Laundry" },
  });
  const spa = await Sub_Category.findOne({
    where: { sub_category_name: "Spa & Massage" },
  });
  const personalCare = await Sub_Category.findOne({
    where: { sub_category_name: "Personal Care" },
  });

  const personalCareCat = await Category.findOne({
    where: { category_name: "Personal Care" },
  });

  hair.setCategory(personalCareCat);
  laundry.setCategory(personalCareCat);
  spa.setCategory(personalCareCat);
  personalCare.setCategory(personalCareCat);

  // Pet
  const petFood = await Sub_Category.findOne({
    where: { sub_category_name: "Pet Food & Supplies" },
  });
  const petGrooming = await Sub_Category.findOne({
    where: { sub_category_name: "Pet Grooming" },
  });
  const veterinary = await Sub_Category.findOne({
    where: { sub_category_name: "Veterinary" },
  });
  const pets = await Sub_Category.findOne({
    where: { sub_category_name: "Pets" },
  });

  const pet = await Category.findOne({ where: { category_name: "Pet" } });

  petFood.setCategory(pet);
  petGrooming.setCategory(pet);
  veterinary.setCategory(pet);
  pets.setCategory(pet);

  // Shopping
  const books = await Sub_Category.findOne({
    where: { sub_category_name: "Books" },
  });
  const clothing = await Sub_Category.findOne({
    where: { sub_category_name: "Clothing and Accessories" },
  });
  const electronics = await Sub_Category.findOne({
    where: { sub_category_name: "Electronics & Software" },
  });
  const artsNCrafts = await Sub_Category.findOne({
    where: { sub_category_name: "Arts and Crafts" },
  });
  const sportingGoods = await Sub_Category.findOne({
    where: { sub_category_name: "Sporting Goods" },
  });
  const auctions = await Sub_Category.findOne({
    where: { sub_category_name: "Auctions" },
  });
  const hardwareStore = await Sub_Category.findOne({
    where: { sub_category_name: "Hardware Store" },
  });
  const shops = await Sub_Category.findOne({
    where: { sub_category_name: "Shops" },
  });

  const shopping = await Category.findOne({
    where: { category_name: "Shopping" },
  });

  books.setCategory(shopping);
  clothing.setCategory(shopping);
  electronics.setCategory(shopping);
  artsNCrafts.setCategory(shopping);
  sportingGoods.setCategory(shopping);
  auctions.setCategory(shopping);
  hardwareStore.setCategory(shopping);
  shops.setCategory(shopping);

  // Taxes
  const federalTax = await Sub_Category.findOne({
    where: { sub_category_name: "Federal tax" },
  });
  const localTax = await Sub_Category.findOne({
    where: { sub_category_name: "Local Tax" },
  });
  const propertyTax = await Sub_Category.findOne({
    where: { sub_category_name: "Property Tax" },
  });
  const salesTax = await Sub_Category.findOne({
    where: { sub_category_name: "Sales tax" },
  });
  const stateTax = await Sub_Category.findOne({
    where: { sub_category_name: "State tax" },
  });

  const taxes = await Category.findOne({ where: { category_name: "Taxes" } });

  federalTax.setCategory(taxes);
  localTax.setCategory(taxes);
  propertyTax.setCategory(taxes);
  salesTax.setCategory(taxes);
  stateTax.setCategory(taxes);

  // Transfer
  const creditCardPayment = await Sub_Category.findOne({
    where: { sub_category_name: "Credit Card Payment" },
  });
  const withdrawal = await Sub_Category.findOne({
    where: { sub_category_name: "Withdrawal" },
  });
  const debit = await Sub_Category.findOne({
    where: { sub_category_name: "Debit" },
  });
  const transferForCashSpending = await Sub_Category.findOne({
    where: { sub_category_name: "Transfer For Cash Spending" },
  });

  const transfer = await Category.findOne({
    where: { category_name: "Transfer" },
  });

  creditCardPayment.setCategory(transfer);
  withdrawal.setCategory(transfer);
  debit.setCategory(transfer);
  transferForCashSpending.setCategory(transfer);

  // Travel
  const travel = await Sub_Category.findOne({
    where: { sub_category_name: "Travel" },
  });
  const airTravel = await Sub_Category.findOne({
    where: { sub_category_name: "Air Travel" },
  });
  const hotel = await Sub_Category.findOne({
    where: { sub_category_name: "Hotel" },
  });
  const rentalCar = await Sub_Category.findOne({
    where: { sub_category_name: "Rental Car & taxi" },
  });
  const vacation = await Sub_Category.findOne({
    where: { sub_category_name: "Vacation" },
  });

  const travelCat = await Category.findOne({
    where: { category_name: "Travel" },
  });

  travel.setCategory(travelCat);
  airTravel.setCategory(travelCat);
  hotel.setCategory(travelCat);
  rentalCar.setCategory(travelCat);
  vacation.setCategory(travelCat);

  // Uncategorized
  const uncategorized = await Sub_Category.findOne({
    where: { sub_category_name: "Uncategorized" },
  });

  const uncategorizedCat = await Category.findOne({
    where: { category_name: "Uncategorized" },
  });

  uncategorized.setCategory(uncategorizedCat);
};

module.exports = assignCategoryToSubCategory;
