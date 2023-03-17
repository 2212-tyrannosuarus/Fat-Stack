import React from "react";

const Homepage = () => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-dark text-white">
        <div class="container">
          <h1 class="display-4">Your Text Here</h1>
          <p class="lead">Some additional text can go here if needed.</p>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <p class="card-text">Some text describing card 1.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <p class="card-text">Some text describing card 2.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <p class="card-text">Some text describing card 3.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
