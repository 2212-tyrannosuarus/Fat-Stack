import React, { useEffect } from "react";
import { ProgressBar } from 'react-bootstrap'
import './Budget.css'

const Other = (props) => {
  const { other } = props;

//   useEffect(() => {
    if (other !== undefined) {
      console.log("spending ", other);
    }
//   });

  return (
    
    <div className="row">
        {other !== undefined ? (
            <div class="col-md-9 col-lg-9 order-2 mb-4">
            <div class="card h-100">
              <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="card-title m-0 me-2 ">Other</h5>
              </div>
              <div class="card-body">
                
                    {other && other.length ? (
                        other.map(otherItem => {
                            return (
                                <ul class="p-0 m-0" key={otherItem[0]}>
                                <li class="d-flex mb-2 pb-1" key={otherItem[0]}>
                    {/* <div class="avatar flex-shrink-0 me-3">
                      <img
                        src="{{asset('assets/img/icons/unicons/paypal.png')}}"
                        alt="User"
                        class="rounded"
                      />
                    </div> */}
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        <h6 class="text-muted d-block mb-1">{otherItem.flat()[0].split(':')[0]}: <span className="text-dark">{otherItem.flat()[0].split(':')[1]}</span></h6>
                      </div>
                      <div class="user-progress d-flex align-items-center gap-1">
                        <h6 class="mb-0">${parseInt(otherItem.flat()[1])}</h6>{" "}
                        {/* <span class="text-muted">of ${otherItem.flat()[2]}</span> */}
                      </div>
                    </div>
                    
                  </li>
                  {/* <li class="mb-2 pb-1 income-progress-bar">
                  <ProgressBar animated variant={(otherItem.flat()[2]- otherItem.flat()[1]) >= 0 ? 'primary': 'warning'} now={(otherItem.flat()[1]/otherItem.flat()[2]) * 100} />
                  </li> */}
                  </ul>
                            )
                        })
                    ) : null}
                  
                  
                
              </div>
            </div>
          </div>
        ): null}
      

    </div>
  );
};

export default Other;
