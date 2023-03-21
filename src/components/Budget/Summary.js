import React from "react";
import './Budget.css'

const Summary = () => {
  return (
    <div class="col-md-12 col-lg-12 order-2 mb-4">
            <div class="card h-100">
              <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title m-0 me-2">Summary</h5>
                
              </div>
              <div class="card-body">
                <ul class="p-0 m-0">
                  <li class="d-flex mb-4 pb-1">
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        {/* <small class="text-muted d-block mb-1">Paypal</small> */}
                        <h6 class="mb-0">Send money</h6>
                      </div>
                      <div class="user-progress d-flex align-items-center gap-1">
                        <h6 class="mb-0">+82.6</h6>{" "}
                        <span class="text-muted">USD</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  );
};

export default Summary;
