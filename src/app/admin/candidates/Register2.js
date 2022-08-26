// import { notification } from "antd";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { addResume } from "../../axios";

export class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      phone: "",
      company: "",
      mfile: {},
      status: false,
    };
  }
  handelSubmit = (val) => {
    val.preventDefault();
    console.log(this.state);
    const { name, phone, email, company, mfile } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("phone", phone);
    bodyFormData.append("email", email);
    bodyFormData.append("company", company);
    bodyFormData.append("mfile", mfile);
    console.log(bodyFormData);
    // addResume(bodyFormData).then((val) => {
    //   if (val.data.status === 200) {
    //     console.log(val.result);
    //     notification.success({
    //       message: val.data.message,
    //       description: "This feature has been updated later!",
    //     });
    //     this.props.history.push("/admin/candidate/success");
    //   }
    //   if (val.data.status !== 200) {
    //     notification.warn({
    //       message: val.data.message,
    //       description: "This feature has been updated later!",
    //     });
    //     console.log(val.message);
    //   }
    // });
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
                <form className="pt-3" onSubmit={this.handelSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Name"
                      onChange={(e) => this.setState({ name: e.target.value })}
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
                    <select
                      required
                      onChange={(e) =>
                        this.setState({ company: e.target.value })
                      }
                      className="form-control"
                      id="exampleSelectGender"
                    >
                      <option value={""}>Select your company</option>
                      <option value={"Destination To Japan"}>DTP</option>
                      <option value={"Absolute Tech"}>AT</option>
                      <option value={"Nikita"}>NKT</option>
                      <option value={"Red dot"}>RDT</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <Form.Group>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          required
                          className="form-control visibility-hidden"
                          id="customFileLang"
                          lang="es"
                          onChange={(e) =>
                            this.setState({ mfile: e.target.files[0] })
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileLang"
                        >
                          Upload image
                        </label>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                    >
                      Register
                    </button>
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

export default Register2;
