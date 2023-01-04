import { notification } from "antd";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { login } from "../../redux/action";
import {
  getAllCandidate,
  getAllPratner,
  getAllPratnerCandidate,
} from "../../redux/action/candidate";
import axios, {
  getAllCandidateMethode,
  getAllPratnerCandidateMethode,
} from "../axios";

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
    axios
      .post("user/signin", this.state)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          if (response.data.result.roles.length > 0) {
            this.props.Authenticat(response.data.result);
            sessionStorage.setItem(
              "token",
              JSON.stringify(response.data.result.token)
            );
            notification.success({
              message: "login successfull",
            });

            console.log(JSON.parse(sessionStorage.getItem("token")));
            if (response.data.result.roles[0].rolename === "ROLE_PARTNER") {
              setTimeout(() => {
                getAllPratnerCandidateMethode(
                  this.props.getAllPratnerCandidate,
                  response.data.result.name
                );
                this.props.history.push(
                  `/partners/dashboard/${response.data.result.name}`
                );
              }, 2000);
            } else if (response.data.result.roles[0].rolename === "ROLE_HR") {
              setTimeout(() => {
                getAllPratnerCandidateMethode(
                  this.props.getAllPratnerCandidate,
                  response.data.result.name
                );
                this.props.history.push(`/hr/dashboard`);
              }, 2000);
            } else if (
              response.data.result.roles[0].rolename === "ROLE_EMPLOYE"
            ) {
              setTimeout(() => {
                getAllPratnerCandidateMethode(
                  this.props.getAllPratnerCandidate,
                  response.data.result.name
                );
                this.props.history.push(`/employe/dashboard`);
              }, 2000);
            } else {
              axios
                .get("/admin/get/userdetails", {
                  headers: {
                    Authorization: `Bearer ${response.data.result.token}`,
                  },
                })
                .then((res) => this.props.getPartner(res.data.result));
              getAllCandidateMethode(this.props.getAllCandidate);
              this.props.history.push(`/dashboard`);
            }
          }
        } else {
          notification.warn({
            message: response.data.message,
          });
        }
      })
      .catch((res) =>
        notification.warn({
          message: res.message,
        })
      );
  };
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <h2 className="text-white">
                    WEBRIXTEC<span style={{ color: "#fdc134" }}>.</span>
                  </h2>
                </div>
                <h4 className="text-white">Hello! let's get started</h4>
                <h6 className="font-weight-light text-white">
                  Sign in to continue.
                </h6>
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
                      style={{
                        backgroundColor: "#fdc134",
                        color: "#284966",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                      className="btn btn-block btn-primary  btn-lg font-weight-medium auth-form-btn"
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
                    {/* <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-muted"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}
                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/user-pages/register-1" className="text-primary">
                      Create
                    </Link>
                  </div> */}
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
    Authenticat: (val) => dispatch(login(val)),
    getPartner: (val) => dispatch(getAllPratner(val)),
    getAllCandidate: (val) => dispatch(getAllCandidate(val)),
    getAllPratnerCandidate: (val) => dispatch(getAllPratnerCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
