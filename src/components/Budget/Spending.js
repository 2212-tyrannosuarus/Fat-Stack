import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Budget.css";
import EditModal from "./EditModal";


const Spending = (props) => {
  const {
    spending,
    handleSubmit,
    handleDeleteBudget,
    newBudgetedAmount,
    setNewBudgetedAmount,
  } = props;

  //   useEffect(() => {
  if (spending !== undefined) {
    console.log("spending ", spending.flat().slice(0, -1));
  }
  //   });

  return (
    <div className="row">
      {spending !== undefined && spending.flat().slice(0, -1).length? (
        <div class="col-md-12 col-lg-12 order-2 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="card-title m-0 me-2 ">Spending</h5>
            </div>
            <div class="card-body pb-0">
              {spending && spending.length
                ? spending
                    .flat()
                    .slice(0, -1)
                    .map((spendingItem) => {
                      return (
                        <ul class="p-0 m-0" key={spendingItem.subCategoryId}>
                          <li
                            class="d-flex mb-2 pb-1"
                            key={spendingItem.subCategoryId}
                          >
                            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div class="me-2">
                                <h6 class="text-muted d-block mb-1">
                                  {spendingItem.categoryName}:{" "}
                                  <span className="text-dark">
                                    {spendingItem.subCategoryName}
                                  </span>
                                </h6>
                              </div>
                              <div class="user-progress d-flex align-items-center gap-1">
                                <h6 class="mb-0">
                                  ${parseInt(spendingItem.transactionAmount)}
                                </h6>{" "}
                                <span class="text-muted">
                                  of ${parseInt(spendingItem.budgetedAmount)}
                                </span>
                              </div>
                            </div>
                          </li>
                          <li class="mb-2 pb-1 income-progress-bar">
                            <ProgressBar
                              variant={
                                spendingItem.budgetedAmount -
                                  spendingItem.transactionAmount >=
                                0
                                  ? "primary"
                                  : "danger"
                              }
                              now={
                                (spendingItem.transactionAmount /
                                  spendingItem.budgetedAmount) *
                                100
                              }
                              style={{ height: "10px" }}
                            />
                            <div className="row">

                              <EditModal
                                subCategory={spendingItem.subCategoryName}
                                budgetedAmount={spendingItem.budgetedAmount}
                                handleSubmit={handleSubmit}
                                handleDeleteBudget={handleDeleteBudget}
                                newBudgetedAmount={newBudgetedAmount}
                                setNewBudgetedAmount={setNewBudgetedAmount}
                              />
                            </div>
                          </li>
                        </ul>
                      );
                    })
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Spending;
