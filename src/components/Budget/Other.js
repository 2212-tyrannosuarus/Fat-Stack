import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Budget.css";

const Other = (props) => {
  const { other } = props;

  return (
    <div className="row">
      {other !== undefined ? (
        <div className="col-md-12 col-lg-12 order-2 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2 ">Other Spending</h5>
            </div>
            <div className="card-body">
              {other && other.length
                ? other
                    .flat()
                    .slice(0, -1)
                    .map((otherItem) => {
                      return (
                        <ul className="p-0 m-0" key={otherItem.subCategoryId}>
                          <li
                            className="d-flex mb-2 pb-1"
                            key={otherItem.subCategoryId}
                          >
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="text-muted d-block mb-1">
                                  {otherItem.categoryName}:{" "}
                                  <span className="text-dark">
                                    {otherItem.subCategoryName}
                                  </span>
                                </h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">
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
