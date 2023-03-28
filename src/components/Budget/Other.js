import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Budget.css";

const Other = (props) => {
  const { other } = props;

  return (
    <div className="row">
      {other !== undefined ? (
        <div class="col-md-12 col-lg-12 order-2 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="card-title m-0 me-2 ">Other Spending</h5>
            </div>
            <div class="card-body">
              {other && other.length
                ? other
                    .flat()
                    .slice(0, -1)
                    .map((otherItem) => {
                      return (
                        <ul class="p-0 m-0" key={otherItem.subCategoryId}>
                          <li
                            class="d-flex mb-2 pb-1"
                            key={otherItem.subCategoryId}
                          >
                            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div class="me-2">
                                <h6 class="text-muted d-block mb-1">
                                  {otherItem.categoryName}:{" "}
                                  <span className="text-dark">
                                    {otherItem.subCategoryName}
                                  </span>
                                </h6>
                              </div>
                              <div class="user-progress d-flex align-items-center gap-1">
                                <h6 class="mb-0">
                                  ${parseInt(otherItem.transactionAmount)}
                                </h6>{" "}
                              </div>
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

export default Other;
