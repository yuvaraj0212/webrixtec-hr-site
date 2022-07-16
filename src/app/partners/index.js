import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Link, withRouter } from "react-router-dom";
export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromIdeas: props.match,
    };
  }
  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  areaData = {
    labels: ["2013", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true, // 3: no fill
      },
    ],
  };

  areaOptions = {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };
  render() {
    // console.warn(this.state);
    return (
      <div>
        <div className="row">
          <div className="col-sm-4 grid-margin">
            <Link to={"/partners/candidates"}>
              <div className="card">
                <div className="card-body">
                  <h5 className="text-white">Candidates</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">$32123</h2>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          +3.5%
                        </p>
                      </div>
                      <h6 className="text-muted font-weight-normal">
                        11.38% Since last month
                      </h6>
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-account-circle text-primary ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-sm-4 grid-margin">
            <Link to={"/partners/offers"}>
              <div className="card">
                <div className="card-body">
                  <h5 className="text-white">Offers</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">$45850</h2>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          +8.3%
                        </p>
                      </div>
                      <h6 className="text-muted font-weight-normal">
                        {" "}
                        9.61% Since last month
                      </h6>
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-wallet-travel text-success ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-sm-4 grid-margin">
            <Link to={"/partners/processing"}>
              <div className="card">
                <div className="card-body">
                  <h5 className="text-white">Processing</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">$2039</h2>
                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                          -2.1%{" "}
                        </p>
                      </div>
                      <h6 className="text-muted font-weight-normal">
                        2.27% Since last month
                      </h6>
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-cached text-warning ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Area Chart</h4>
                <Line data={this.areaData} options={this.areaOptions} />
              </div>
            </div>
          </div>

          <div className="col-md-4 grid-margin">
            <div className="grid-margin ">
              <Link to={"/partners/rejected"}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="text-white">Rejected</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 my-auto">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0">$2039</h2>
                          <p className="text-danger ml-2 mb-0 font-weight-medium">
                            -2.1%{" "}
                          </p>
                        </div>
                        <h6 className="text-muted font-weight-normal">
                          2.27% Since last month
                        </h6>
                      </div>
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i className="icon-lg mdi mdi-close text-danger ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="">
              <Link to={"/partners/duplication"}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="text-white">Duplication</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 my-auto">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0">$2039</h2>
                          <p className="text-danger ml-2 mb-0 font-weight-medium">
                            -2.1%{" "}
                          </p>
                        </div>
                        <h6 className="text-muted font-weight-normal">
                          2.27% Since last month
                        </h6>
                      </div>
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i className="icon-lg mdi mdi-block-helper text-danger ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
