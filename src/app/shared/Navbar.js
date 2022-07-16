import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { Form, Input, InputNumber, Modal, DatePicker } from "antd";

import { connect } from "react-redux";
import { logout, partnerDetails } from "../../redux/action";

const partners = [
  { name: "Absolute Tech" },
  { name: "Nikita" },
  { name: "Red dot" },
  { name: "Destination To Japan" },
];
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  render() {
    const { visible } = this.state;
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 10,
      },
    };
    const handleCancel = () => {
      // form.resetFields();
      this.setState({ visible: false });
      console.log(this.props);
    };
    const handleSubmit = (values) => {
      console.log(values);
    };

    console.log(this.props);
    return (
      <>
        <Modal
          visible={visible}
          onOk={"document.getElementById('myFrom').submit"}
          onCancel={handleCancel}
          width="100%"
        >
          <Form {...layout} id={"myFrom"} onFinish={handleSubmit}>
            <h6>Create list</h6>
            <div className="row">
              <div className="col-md-6 col-12">
                <Form.Item
                  label={"Company Name"}
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Company Email"
                  name="companyEmail"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your company Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Alternative Email"
                  name="companyAltEmail"
                  rules={[
                    {
                      required: false,
                      type: "email",
                      message: "Please input your company Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="NDA Date"
                  name="NDADate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your NDA date!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Contact Number"
                  name="companyNumber"
                  rules={[
                    { required: true, message: "Please input Contact Number" },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Alternative Number"
                  name="companyAltNumber"
                  rules={[
                    { required: false, message: "Please input Contact Number" },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>

              <div className="col-md-6 col-12">
                <Form.Item
                  label="Representative Name 1"
                  name="representativeName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your representative Name !",
                    },
                    {
                      type: "",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Representative Name 2"
                  name="representativeAltName"
                  rules={[
                    {
                      required: false,
                      message: "Please input your representative Name !",
                    },
                    {
                      type: "",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Company CEO"
                  name="companyCEO"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company CEO!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please input your City!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please input your Country!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
        <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <Link className="navbar-brand brand-logo-mini" to="/dashboard">
              <h3 className="text-white">W</h3>
            </Link>
          </div>
          <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button
              className="navbar-toggler align-self-center"
              type="button"
              onClick={() =>
                document.body.classList.toggle("sidebar-icon-only")
              }
            >
              <span className="mdi mdi-menu"></span>
            </button>
            <ul className="navbar-nav w-100">
              <li className="nav-item w-100">
                <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products"
                  />
                </form>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              {this.props.company.role !== "partner" && (
                <Dropdown
                  alignRight
                  as="li"
                  className="nav-item d-none d-lg-block"
                >
                  <Dropdown.Toggle className="nav-link btn btn-success create-new-button no-caret">
                    <Trans>Partners</Trans>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown preview-list create-new-dropdown-menu">
                    <h6 className="p-3 mb-0 text-success">
                      <Trans className="">Add Partner</Trans>
                    </h6>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      // href="!#"
                      onClick={(evt) => this.setState({ visible: true })}
                      className="preview-item"
                    >
                      <Trans>Create Partners</Trans>
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <h6 className="p-3 mb-0 text-success">
                      <Trans>List Partner</Trans>
                    </h6>

                    <Dropdown.Divider />

                    {partners.map((pName) => (
                      <>
                        <Dropdown.Item className="preview-item">
                          <Link
                            to={`/partners/dashboard/${pName.name}`}
                            onClick={() => this.props.Partner(pName.name)}
                          >
                            <Trans>{pName.name}</Trans>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                      </>
                    ))}

                    <>
                      {/* <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  {/* <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-file-outline text-primary"></i>
                    </div>
                  </div> 
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Software Development</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-web text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>UI Development</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-layers text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Software Testing</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">
                  <Trans>See all projects</Trans>
                </p> */}
                    </>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
                href="!#"
                onClick={(event) => event.preventDefault()}
              >
                <i className="mdi mdi-view-grid"></i>
              </a>
            </li> */}

              <Dropdown alignRight as="li" className="nav-item border-left">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link count-indicator cursor-pointer"
                >
                  <i className="mdi mdi-email"></i>
                  <span className="count bg-success"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0">
                    <Trans>Messages</Trans>
                  </h6>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img
                          src={require("../../assets/images/faces/face4.jpg")}
                          alt="profile"
                          className="rounded-circle profile-pic"
                        />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">
                        <Trans>Mark send you a message</Trans>
                      </p>
                      <p className="text-muted mb-0">
                        {" "}
                        1 <Trans>Minutes ago</Trans>{" "}
                      </p>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img
                          src={require("../../assets/images/faces/face2.jpg")}
                          alt="profile"
                          className="rounded-circle profile-pic"
                        />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">
                        <Trans>Cregh send you a message</Trans>
                      </p>
                      <p className="text-muted mb-0">
                        {" "}
                        15 <Trans>Minutes ago</Trans>{" "}
                      </p>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <img
                          src={require("../../assets/images/faces/face3.jpg")}
                          alt="profile"
                          className="rounded-circle profile-pic"
                        />
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">
                        <Trans>Profile picture updated</Trans>
                      </p>
                      <p className="text-muted mb-0">
                        {" "}
                        18 <Trans>Minutes ago</Trans>{" "}
                      </p>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <p className="p-3 mb-0 text-center">
                    4 <Trans>new messages</Trans>
                  </p>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown alignRight as="li" className="nav-item border-left">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link count-indicator cursor-pointer"
                >
                  <i className="mdi mdi-bell"></i>
                  <span className="count bg-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0">
                    <Trans>Notifications</Trans>
                  </h6>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">
                        <Trans>Event today</Trans>
                      </p>
                      <p className="text-muted ellipsis mb-0">
                        <Trans>
                          Just a reminder that you have an event today
                        </Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-danger"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject mb-1">
                        <Trans>Settings</Trans>
                      </h6>
                      <p className="text-muted ellipsis mb-0">
                        <Trans>Update dashboard</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-link-variant text-warning"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject mb-1">
                        <Trans>Launch Admin</Trans>
                      </h6>
                      <p className="text-muted ellipsis mb-0">
                        <Trans>New admin wow</Trans>!
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <p className="p-3 mb-0 text-center">
                    <Trans>See all notifications</Trans>
                  </p>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown alignRight as="li" className="nav-item">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link cursor-pointer no-caret"
                >
                  <div className="navbar-profile">
                    <img
                      className="img-xs rounded-circle"
                      src={require("../../assets/images/faces/face15.jpg")}
                      alt="profile"
                    />
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">
                      <Trans>Henry Klein</Trans>
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                  {/* <h6 className="p-3 mb-0">
                  <Trans>Profile</Trans>
                </h6> */}
                  <Dropdown.Divider />
                  {/* <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">
                        <Trans>Partners</Trans>
                      </p>
                    </div>
                  </Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href=""
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger"></i>
                      </div>
                    </div>
                    <Link
                      to={"/user-pages/login-1"}
                      onClick={() => console.log(this.props.logout())}
                      className="preview-item-content"
                    >
                      <p className="preview-subject mb-1">
                        <Trans>Log Out</Trans>
                      </p>
                    </Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">
                  <Trans>Advanced settings</Trans>
                </p> */}
                </Dropdown.Menu>
              </Dropdown>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              onClick={this.toggleOffcanvas}
            >
              <span className="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    Partner: (val) => dispatch(partnerDetails({ name: val })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
