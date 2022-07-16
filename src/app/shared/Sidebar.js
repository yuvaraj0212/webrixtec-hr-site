import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// import { Collapse, Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";

import { connect } from "react-redux";
import { compose } from "redux";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partner: false,
    };
  }

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    if (
      this.props.location.pathname.startsWith("/partners") &&
      this.props.company.name
    ) {
      console.log(this.props);
      return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <Link className="sidebar-brand brand-logo" to={"/dashboard"}>
              {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
              <h2
                style={{
                  color: "white",
                  // fontFamily: "Poppins",
                  // letterSpacing: "2px",
                }}
              >
                {this.props.company.name}{" "}
                <span style={{ color: "#fdc134" }}>.</span>
              </h2>
            </Link>
            <Link className="sidebar-brand brand-logo-mini" to={"/dashboard"}>
              <h1 style={{ color: "white" }}>W</h1>
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>Navigation</Trans>
              </span>
            </li>

            <li
              className={
                this.isPathActive(
                  `/partners/dashboard/:${this.props.company.name}`
                )
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link
                className="nav-link"
                to={`/partners/dashboard/:${this.props.company.name}`}
              >
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Dashboard</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/partners/candidates")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/partners/candidates">
                <span className="menu-icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span className="menu-title">
                  <Trans>Candidates</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/partners/processing")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/partners/processing">
                <span className="menu-icon">
                  <i className="mdi mdi-cached"></i>
                </span>
                <span className="menu-title">
                  <Trans>Processing</Trans>
                </span>
              </Link>
            </li>

            {this.props.company.role ? (
              ""
            ) : (
              <li
                className={
                  this.isPathActive("/partners/duplication")
                    ? "nav-item menu-items active"
                    : "nav-item menu-items"
                }
              >
                <Link className="nav-link" to="/partners/duplication">
                  <span className="menu-icon">
                    <i className="mdi mdi-block-helper"></i>
                  </span>
                  <span className="menu-title">
                    <Trans>Duplication</Trans>
                  </span>
                </Link>
              </li>
            )}

            <li
              className={
                this.isPathActive("/partners/offers")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/partners/offers">
                <span className="menu-icon">
                  <i className="mdi mdi-wallet-travel"></i>
                </span>
                <span className="menu-title">
                  <Trans>Offers</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/partners/rejected")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/partners/rejected">
                <span className="menu-icon">
                  <i className="mdi mdi-close"></i>
                </span>
                <span className="menu-title">
                  <Trans>Rejected</Trans>
                </span>
              </Link>
            </li>

            <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>Details</Trans>
              </span>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Contract Details</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Invoice Details</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Address</Trans>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <Link className="sidebar-brand brand-logo" to={"/dashboard"}>
              {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
              <h2
                style={{
                  color: "white",
                  // fontFamily: "Poppins",
                  // letterSpacing: "2px",
                }}
              >
                WEBRIXTEC
                <span style={{ color: "#fdc134" }}>.</span>
              </h2>
            </Link>
            <Link className="sidebar-brand brand-logo-mini" to={"/dashboard"}>
              <h1 style={{ color: "white" }}>W</h1>
            </Link>
          </div>
          <ul className="nav">
            <>
              {/* <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <img
                      className="img-xs rounded-circle "
                      src={require("../../assets/images/faces/face15.jpg")}
                      alt="profile"
                    />
                    <span className="count bg-success"></span>
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">
                      <Trans className="text-white">WEBRIXTEC</Trans>
                    </h5>
                    <span>
                      <Trans>ADMIN</Trans>
                    </span>
                  </div>
                </div>
  
                <Dropdown alignRight>
                  //<Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                    //<i className="mdi mdi-dots-vertical"></i>
               //   </Dropdown.Toggle>
                  <Dropdown.Menu className="sidebar-dropdown preview-list">
                    <a
                      href="!#"
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-settings text-primary"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          <Trans>Account settings</Trans>
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      href="!#"
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-onepassword  text-info"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          <Trans>Change Password</Trans>
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      href="!#"
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-calendar-today text-success"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          <Trans>To-do list</Trans>
                        </p>
                      </div>
                    </a>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li> */}

              {/* <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>Navigation</Trans>
              </span>
            </li> */}
            </>
            <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>Navigation</Trans>
              </span>
            </li>

            <li
              className={
                this.isPathActive("/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Dashboard</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/candidates")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/candidates">
                <span className="menu-icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span className="menu-title">
                  <Trans>Candidates</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/tracker")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/tracker">
                <span className="menu-icon">
                  <i className="mdi mdi-cached"></i>
                </span>
                <span className="menu-title">
                  <Trans>Tracker</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/yetToStart")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/yetToStart">
                <span className="menu-icon">
                  <i className="mdi mdi-cached"></i>
                </span>
                <span className="menu-title">
                  <Trans>Yet To Start</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/processing")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/processing">
                <span className="menu-icon">
                  <i className="mdi mdi-cached"></i>
                </span>
                <span className="menu-title">
                  <Trans>Processing</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/duplication")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/duplication">
                <span className="menu-icon">
                  <i className="mdi mdi-block-helper"></i>
                </span>
                <span className="menu-title">
                  <Trans>Duplication</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/offers")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/offers">
                <span className="menu-icon">
                  <i className="mdi mdi-wallet-travel"></i>
                </span>
                <span className="menu-title">
                  <Trans>Offers</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/rejected")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/rejected">
                <span className="menu-icon">
                  <i className="mdi mdi-close"></i>
                </span>
                <span className="menu-title">
                  <Trans>Rejected</Trans>
                </span>
              </Link>
            </li>

            <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>Details</Trans>
              </span>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Contract Details</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Invoice Details</Trans>
                </span>
              </Link>
            </li>

            <li
              className={
                this.isPathActive("/admin/dashboard")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <Link className="nav-link" to="/admin/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">
                  <Trans>Address</Trans>
                </span>
              </Link>
            </li>

            {/* commented sidebar keys */}
            <>
              {/* <li 
              className={
                this.isPathActive("/basic-ui")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.basicUiMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("basicUiMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-laptop"></i>
                </span>
                <span className="menu-title">
                  <Trans>Company Partners</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.basicUiMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/partners/AbsoluteTech")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/admin/partners/AbsoluteTech"
                      >
                        <Trans>Absolute Tech</Trans>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/partners/RedDot")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/admin/partners/RedDot"
                      >
                        <Trans>Red Not</Trans>
                      </Link>
                    </li>
  
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/partners/Nikita")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/admin/partners/Nikita"
                      >
                        <Trans>Nikita</Trans>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/partners/DestinationToJapan")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/admin/partners/DestinationToJapan"
                      >
                        <Trans>Destination To Japan</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>*/}
              <>
                {/* <li
              className={
                this.isPathActive("/form-elements")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.formElementsMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("formElementsMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-playlist-play"></i>
                </span>
                <span className="menu-title">
                  <Trans>Form Elements</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.formElementsMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/form-elements/basic-elements")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/form-elements/basic-elements"
                      >
                        <Trans>Basic Elements</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className={
                this.isPathActive("/tables")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.tablesMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("tablesMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-table-large"></i>
                </span>
                <span className="menu-title">
                  <Trans>Tables</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.tablesMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/tables/basic-table")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/tables/basic-table"
                      >
                        <Trans>Basic Table</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className={
                this.isPathActive("/charts")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.chartsMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("chartsMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-chart-bar"></i>
                </span>
                <span className="menu-title">
                  <Trans>Charts</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.chartsMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/charts/chart-js")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/charts/chart-js"
                      >
                        <Trans>Chart Js</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className={
                this.isPathActive("/icons")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
                }
                onClick={() => this.toggleMenuState("iconsMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-contacts"></i>
                </span>
                <span className="menu-title">
                  <Trans>Icons</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.iconsMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/icons/mdi")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/icons/mdi"
                      >
                        <Trans>Material</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li> */}
              </>

              {/* <li
              className={
                this.isPathActive("/user-pages")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.userPagesMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("userPagesMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-security"></i>
                </span>
                <span className="menu-title">
                  <Trans>User Pages</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
  
              <Collapse in={this.state.userPagesMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/user-pages/login-1")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/user-pages/login-1"
                      >
                        <Trans>Login</Trans>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/user-pages/register-1")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/user-pages/register-1"
                      >
                        <Trans>Register</Trans>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/candidate/register-2")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/admin/candidate/register-2"
                      >
                        <Trans>Resume Update</Trans>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li> */}

              {/* <li className="nav-item nav-category">
              <span className="nav-link">
                <Trans>More</Trans>
              </span>
            </li>
            <li
              className={
                this.isPathActive("/error-pages")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.errorPagesMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("errorPagesMenuOpen")}
                data-toggle="collapse"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-lock"></i>
                </span>
                <span className="menu-title">
                  <Trans>Error Pages</Trans>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.errorPagesMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/error-pages/error-404")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/error-pages/error-404"
                      >
                        404
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/error-pages/error-500")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/error-pages/error-500"
                      >
                        500
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li className="nav-item menu-items">
              <a
                className="nav-link"
                href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="menu-icon">
                  <i className="mdi mdi-file-document-box"></i>
                </span>
                <span className="menu-title">
                  <Trans>Documentation</Trans>
                </span>
              </a>
            </li> */}
            </>
          </ul>
        </nav>
      );
    }
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

// export default connect(withRouter)(Sidebar);
export default compose(withRouter, connect(mapStateToProps))(Sidebar);
