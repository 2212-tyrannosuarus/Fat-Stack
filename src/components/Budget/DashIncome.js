import React from "react";

const DashIncome = ({ income }) => {
  let totalIncome = 0;

  if (income !== undefined && income.length) {
    totalIncome = income.flat().reduce((total, current) => {
      return total + parseInt(current.transactionAmount);
    }, 0);
  }

  return (
    <div>
      <h5>Total Income: ${totalIncome}</h5>
    </div>
  );
};

export default DashIncome;
