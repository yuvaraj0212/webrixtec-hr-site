import React, { Component } from "react";
import "./spinner.css";
export class Spinner extends Component {
  render() {
    return (
      <div id="divSpinner">
        <div className="logoLoader">
          <img
            src={require("../../assets/img/logos/webrixtec-log.png")}
            alt="spinner"
          />
        </div>
      </div>
    );
  }
}

export default Spinner;
