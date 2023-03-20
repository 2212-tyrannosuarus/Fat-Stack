import React, { useEffect } from "react";
import { ProgressBar } from 'react-bootstrap'
import './Budget.css'

const Income = (props) => {
  const { income } = props;

//   useEffect(() => {
    if (income !== undefined) {
      console.log("income ", income.flat().slice(0, -1)[0]);
    }
//   });

  return (
    
    <div className="row">
        {income !== undefined && income.length ? (
            <div class="col-md-9 col-lg-9 order-2 mb-4 mt-2">
            <div class="card h-100">
              <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title m-0 me-2 ">Income</h5>
              </div>
              <div class="card-body">
                <ul class="p-0 m-0">
                  <li class="d-flex mb-2 pb-1">
                   
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        <h6 class="text-muted d-block mb-1">{income.flat().slice(0, -1)[0].categoryName}: <span className="text-dark">{income.flat().slice(0, -1)[0].subCategoryName}</span></h6>
                      </div>
                      <div class="user-progress d-flex align-items-center gap-1">
                        <h6 class="mb-0">${income.flat().slice(0, -1)[0].transactionAmount}</h6>{" "}
                        <span class="text-muted">of ${income.flat().slice(0, -1)[0].budgetedAmount}</span>
                      </div>
                    </div>
                  </li>
                  <li class="mb-0 pb-1 income-progress-bar">
                  <ProgressBar variant='primary' now={(income.flat().slice(0, -1)[0].transactionAmount/income.flat().slice(0, -1)[0].budgetedAmount) * 100} style={{height: "10px"}}/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ): null}
      

    </div>
  );
};

export default Income;
