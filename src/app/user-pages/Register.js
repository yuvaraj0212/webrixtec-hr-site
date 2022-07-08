import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      phone: "",
    };
  }
  handelSubmit = (val) => {
    val.preventDefault();
    console.log(this.state);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <Link to={"/user-pages/login-1"}>
                    {/* <img
                      src={require("../../assets/images/logo.svg")}
                      alt="logo"
                    /> */}
                    <h3 className="mb-0 text-white">WEBRIXTEC</h3>
                  </Link>
                </div>
                {/* <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                <form className="pt-3" onSubmit={this.handelSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Username"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      required
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Mobile"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>I agree to all Terms &
                        Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/user-pages/login-1" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
