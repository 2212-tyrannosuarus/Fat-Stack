import React from "react";
import { ProgressBar } from "react-bootstrap";

const DashIncome = (props) => {
  const { income } = props;

  return (
    <div className="row">
      {income !== undefined && income.length ? (
        <div class="col-md-12 col-lg-12 order-2 mb-4 mt-2 pb-0 mr-0">
          <div class="card h-100">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="card-title m-0 me-2 ">Income</h5>
            </div>
            <div class="card-body">
              <ul class="p-0 m-0">
                {income !== undefined && income.length
                  ? income
                      .flat()
                      .slice(0, -1)
                      .map((incomeItem) => {
                        return (
                          <>
                            <li class="d-flex mb-2 pb-1">
                              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div class="me-2">
                                  <h6 class="text-muted d-block mb-1">
                                    {incomeItem.categoryName}:{" "}
                                    <span className="text-dark">
                                      {incomeItem.subCategoryName}
                                    </span>
                                  </h6>
                                </div>
                                <div class="user-progress d-flex align-items-center gap-1">
                                  <h6 class="mb-0">
                                    ${parseInt(incomeItem.transactionAmount)}
                                  </h6>{" "}
                                  <span class="text-muted">
                                    of ${parseInt(incomeItem.budgetedAmount)}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li class="mb-0 pb-0 income-progress-bar">
                              <ProgressBar
                                variant="primary"
                                now={
                                  (incomeItem.transactionAmount /
                                    incomeItem.budgetedAmount) *
                                  100
                                }
                                style={{ height: "10px" }}
                              />
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

export default DashIncome;
