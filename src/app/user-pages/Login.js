import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { login, partnerDetails } from "../../redux/action";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handelSubmit = (val) => {
    val.preventDefault();
    console.log(this.state);

    switch (this.state.email) {
      case "webrixtec@gmail.com":
        this.props.login();
        this.props.history.push("/dashboard");
        break;
      case "abt@gmail.com":
        const abt = { name: "Absolute Tech", role: "partner" };
        this.props.login();
        this.props.company(abt);
        this.props.history.push("/partners/dashboard/Absolute Tech");
        break;
      case "nkt@gmail.com":
        const nkt = { name: "Nikita", role: "partner" };
        this.props.login();
        this.props.company(nkt);
        this.props.history.push("/partners/dashboard/Nikita");
        break;
      case "rdt@gmail.com":
        const rdt = { name: "Red dot", role: "partner" };
        this.props.login();
        this.props.company(rdt);
        this.props.history.push("/partners/dashboard/Red dot");
        break;
      case "dtp@gmail.com":
        const dtp = { name: "Destination To Japan", role: "partner" };
        this.props.login();
        this.props.company(dtp);
        this.props.history.push("/partners/dashboard/Destination To Japan");
        break;
      default:
        break;
    }
    // this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <Link to={"/"}> */}
                  {/* <img
                      src={require("../../assets/images/logo.svg")}
                      alt="logo"
                    /> */}
                  <h2 className="text-white">WEBRIXTEC</h2>
                  {/* </Link> */}
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={this.handelSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                    >
                      SIGN IN
                    </Button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-muted"
                    >
                      Forgot password?
                    </a>
                  </div>
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/user-pages/register-1" className="text-primary">
                      Create
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    company: (val) => dispatch(partnerDetails(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
