import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  DatePicker,
  Select,
  notification,
  Button,
} from "antd";
import axios, { getAllPratnerCandidateMethode } from "../axios";
import { connect } from "react-redux";
import { logout, partnerDetails } from "../../redux/action";
import { Password } from "@mui/icons-material";
import {
  getAllPratner,
  getAllPratnerCandidate,
} from "../../redux/action/candidate";
const { Option } = Select;

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
      let getdate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(values.Date);
      values.ndaDate = getdate;
      console.log(values);
      axios.post("/user/signup", values).then((res) => {
        if (res.data.status === 200) {
          axios
            .get("/admin/get/userdetails")
            .then((res) => this.props.getPartner(res.data.result));
          notification.success({
            message: res.data.message,
            // placement: "bottomRight",
          });
        } else {
          notification.warn({
            message: res.data.message,
          });
        }
      });
      this.setState({ visible: false });
    };

    console.log(this.props);
    return (
      <>
        <Modal
          visible={visible}
          footer={null}
          onCancel={handleCancel}
          width="100%"
        >
          <Form {...layout} id={"myFrom"} onFinish={handleSubmit}>
            <h6>Create list</h6>
            <div className="row">
              <div className="col-md-6 col-12">
                <Form.Item
                  label={"Company Name"}
                  name="name"
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
                  name="email"
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
                  name="altEmail"
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
                  name="Date"
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
                  name="phone"
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
                  name="altPhone"
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
                  label="Representative Name"
                  name="repName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your representative Name !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* <Form.Item
                  label="Representative Name 2"
                  name="repAltName"
                  rules={[
                    {
                      required: false,
                      message: "Please input your representative Name !",
                    },
                    {
                    },
                  ]}
                >
                  <Input />
                </Form.Item> */}

                <Form.Item
                  label="Company CEO"
                  name="ceo"
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

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Password!",
                    },
                    {
                      type: Password,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-10">
                <Form.Item className="float-right">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
        <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <div className="navbar-brand brand-logo-mini">
              <img
                src={require("../../assets/images/logo.png")}
                alt="logo "
                style={{ width: "100%" }}
              />
            </div>
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
              {this.props.auth.rolename === "ROLE_ADMIN" && (
                <Dropdown alignRight as="li" className="nav-item ">
                  <Dropdown.Toggle className="nav-link btn  create-new-button no-caret">
                    <Trans>Partners</Trans>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown preview-list create-new-dropdown-menu">
                    {/* <h6 className="p-3 mb-0 text-success">
                      <Trans className="">Add Partner</Trans>
                    </h6>
                    <Dropdown.Divider /> */}
                    <Dropdown.Item
                      // href="!#"

                      onClick={(evt) => this.setState({ visible: true })}
                      className="preview-item text-warning"
                    >
                      <Trans>Add Partners</Trans>
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <h6 className="p-3 mb-0 text-warning">
                      <Trans>List Partner</Trans>
                    </h6>

                    {/* <Dropdown.Item> */}
                    <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={
                        (input, option) => {
                          return (
                            option.value
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }
                        // option.children.includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      // }
                    >
                      {this.props.candidate.partnerList.map((data, index) => (
                        <Option
                          value={data.name}
                          key={index}
                          className="text-warning "
                        >
                          <Link to={`/partners/dashboard/${data.name}`}>
                            <span
                              onClick={() => {
                                sessionStorage.setItem(
                                  "pratner_name",
                                  JSON.stringify(data.name)
                                );
                                this.props.currentUser(data);
                                getAllPratnerCandidateMethode(
                                  this.props.getAllPratnerCandidate,
                                  data.name
                                );
                              }}
                            >
                              {data.name}
                            </span>
                          </Link>
                        </Option>
                      ))}
                    </Select>
                    {/* </Dropdown.Item> */}

                    <Dropdown.Divider />

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

              {/* <Dropdown alignRight as="li" className="nav-item border-left">
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
              </Dropdown> */}

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
                      <Trans>{this.props.auth.name}</Trans>
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
    getPartner: (val) => dispatch(getAllPratner(val)),
    currentUser: (val) => dispatch(partnerDetails(val)),
    getAllPratnerCandidate: (val) => dispatch(getAllPratnerCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
