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

  return (
    <div className="row">
      {spending !== undefined && spending.flat().slice(0, -1).length ? (
        <div className="col-md-12 col-lg-12 order-2 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2 ">Spending</h5>
            </div>
            <div className="card-body pb-0">
              {spending && spending.length
                ? spending
                    .flat()
                    .slice(0, -1)
                    .map((spendingItem) => {
                      return (
                        <ul className="p-0 m-0" key={spendingItem.subCategoryId}>
                          <li
                            className="d-flex mb-2 pb-1"
                            key={spendingItem.subCategoryId}
                          >
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="text-muted d-block mb-1">
                                  {spendingItem.categoryName}:{" "}
                                  <span className="text-dark">
                                    {spendingItem.subCategoryName}
                                  </span>
                                </h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">
                                  ${parseInt(spendingItem.transactionAmount)}
                                </h6>{" "}
                                <span className="text-muted">
                                  of ${parseInt(spendingItem.budgetedAmount)}
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="mb-2 pb-1 income-progress-bar">
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
