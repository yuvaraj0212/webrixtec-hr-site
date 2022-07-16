import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import {
  // Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import Register2 from "./admin/candidates/Register2";
import Success from "./admin/candidates/success";

// admin
const Dashboard = lazy(() => import("./admin/dashboard/index"));
const Candidate = lazy(() => import("./admin/candidates/candidate"));
const Offers = lazy(() => import("./admin/offers"));
const Duplication = lazy(() => import("./admin/duplication"));
const Processing = lazy(() => import("./admin/processing"));
const Rejected = lazy(() => import("./admin/rejected"));
const Tracker = lazy(() => import("./admin/trcker"));
const YetToStart = lazy(() => import("./admin/yetToStart"));

const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));

//  partners

const partnersCandidate = lazy(() => import("./partners/pages/candidate"));
const partnersOffers = lazy(() => import("./partners/pages/offer"));
const partnersDuplication = lazy(() => import("./partners/pages/duplication"));
const partnersProcessing = lazy(() => import("./partners/pages/processing"));
const partnersRejected = lazy(() => import("./partners/pages/rejected"));
const Partner = lazy(() => import("./partners"));

class AppRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <Suspense fallback={<Spinner />}>
        {/* <Switch> */}

        <Redirect to={"/user-pages/login-1"} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin/candidates" component={Candidate} />
        <Route path="/admin/offers" component={Offers} />
        <Route path="/admin/duplication" component={Duplication} />
        <Route path="/admin/processing" component={Processing} />
        <Route path="/admin/rejected" component={Rejected} />
        <Route path="/admin/tracker" component={Tracker} />
        <Route path="/admin/yetToStart" component={YetToStart} />

        <Route path="/user-pages/login-1" component={Login} />
        <Route path="/user-pages/register-1" component={Register1} />
        <Route path="/admin/candidate/register-2" component={Register2} />
        <Route path="/admin/candidate/success" component={Success} />
        <Route path="/error-pages/error-404" component={Error404} />
        <Route path="/error-pages/error-500" component={Error500} />
        {/* partners */}
        <Route path="/partners/dashboard/:partner" component={Partner} />
        <Route path="/partners/candidates" component={partnersCandidate} />
        <Route path="/partners/offers" component={partnersOffers} />
        <Route path="/partners/duplication" component={partnersDuplication} />
        <Route path="/partners/processing" component={partnersProcessing} />
        <Route path="/partners/rejected" component={partnersRejected} />

        {/* <Route path="*" component={Error404} /> */}
        {/* </Switch> */}
        <Route path="/basic-ui/buttons" component={Buttons} />
        <Route path="/basic-ui/dropdowns" component={Dropdowns} />
        <Route path="/basic-ui/typography" component={Typography} />

        <Route path="/form-Elements/basic-elements" component={BasicElements} />

        <Route path="/tables/basic-table" component={BasicTable} />

        <Route path="/icons/mdi" component={Mdi} />

        <Route path="/charts/chart-js" component={ChartJs} />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Autenticate: state.auth,
    partner: state.company,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
