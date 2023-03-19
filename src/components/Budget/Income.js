import React, { useEffect } from "react";
import { ProgressBar } from 'react-bootstrap'
import './Budget.css'

const Income = (props) => {
  const { income } = props;

//   useEffect(() => {
    if (income !== undefined) {
      console.log("income ", income);
    }
//   });

  return (
    
    <div className="row">
        {income !== undefined ? (
            <div class="col-md-9 col-lg-9 order-2 mb-4 mt-2">
            <div class="card h-100">
              <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title m-0 me-2 ">Income</h5>
              </div>
              <div class="card-body">
                <ul class="p-0 m-0">
                  <li class="d-flex mb-2 pb-1">
                    {/* <div class="avatar flex-shrink-0 me-3">
                      <img
                        src="{{asset('assets/img/icons/unicons/paypal.png')}}"
                        alt="User"
                        class="rounded"
                      />
                    </div> */}
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        <h6 class="text-muted d-block mb-1">{income.flat()[0].split(':')[0]}: <span className="text-dark">{income.flat()[0].split(':')[1]}</span></h6>
                      </div>
                      <div class="user-progress d-flex align-items-center gap-1">
                        <h6 class="mb-0">${income.flat()[1]}</h6>{" "}
                        <span class="text-muted">of ${income.flat()[2]}</span>
                      </div>
                    </div>
                  </li>
                  <li class="mb-0 pb-1 income-progress-bar">
                  <ProgressBar variant='primary' now={(income.flat()[1]/income.flat()[2]) * 100} style={{height: "10px"}}/>
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
