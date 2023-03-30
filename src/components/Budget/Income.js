import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Budget.css";
import EditModal from "./EditModal";

const Income = (props) => {
  const {
    income,
    handleSubmit,
    handleDeleteBudget,
    newBudgetedAmount,
    setNewBudgetedAmount,
  } = props;

  return (
    <div className="row">
      {income !== undefined && income.length ? (
        <div className="col-md-12 col-lg-12 order-2 mb-4 mt-2 pb-0 mr-0">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2 ">Income</h5>
            </div>
            <div className="card-body">
              <ul className="p-0 m-0">
                {income !== undefined && income.length
                  ? income
                      .flat()
                      .slice(0, -1)
                      .map((incomeItem) => {
                        return (
                          <>
                            <li className="d-flex mb-2 pb-1">
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <h6 className="text-muted d-block mb-1">
                                    {incomeItem.categoryName}:{" "}
                                    <span className="text-dark">
                                      {incomeItem.subCategoryName}
                                    </span>
                                  </h6>
                                </div>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <h6 className="mb-0">
                                    ${parseInt(incomeItem.transactionAmount)}
                                  </h6>{" "}
                                  <span className="text-muted">
                                    of ${parseInt(incomeItem.budgetedAmount)}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="mb-0 pb-0 income-progress-bar">
                              <ProgressBar
                                variant="primary"
                                now={
                                  (incomeItem.transactionAmount /
                                    incomeItem.budgetedAmount) *
                                  100
                                }
                                style={{ height: "10px" }}
                              />
                              <div className="row">
                                <EditModal
                                  subCategory={incomeItem.subCategoryName}
                                  budgetedAmount={incomeItem.budgetedAmount}
                                  handleSubmit={handleSubmit}
                                  handleDeleteBudget={handleDeleteBudget}
                                  newBudgetedAmount={newBudgetedAmount}
                                  setNewBudgetedAmount={setNewBudgetedAmount}
                                />
                              </div>
                            </li>
                          </>
                        );
                      })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Income;
