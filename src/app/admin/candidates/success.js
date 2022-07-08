import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto mt-5">
          <div class="payment">
            <div class="payment_header">
              <div class="check">
                <i class="fa fa-check" aria-hidden="true"></i>
              </div>
            </div>
            <div class="content">
              <h1>Resume Updated Succesfully !</h1>
              <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.{" "}
              </p>
              <br />
              <Link to={"/admin/candidate/register-2"}>Go to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
