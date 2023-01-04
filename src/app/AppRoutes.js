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
const jobdescription = lazy(() => import("./admin/jobdescription"));
// user
const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));
const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));
const BasicElements = lazy(() => import("./form-elements/BasicElements"));
const BasicTable = lazy(() => import("./tables/BasicTable"));
const Mdi = lazy(() => import("./icons/Mdi"));
const ChartJs = lazy(() => import("./charts/ChartJs"));
const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));
//  partners
const partnersJobDesc = lazy(() => import("./partners/pages/jobdescription"));
const partnersCandidate = lazy(() => import("./partners/pages/candidate"));
const partnersOffers = lazy(() => import("./partners/pages/offer"));
const partnersDuplication = lazy(() => import("./partners/pages/duplication"));
const partnersProcessing = lazy(() => import("./partners/pages/processing"));
const partnersRejected = lazy(() => import("./partners/pages/rejected"));
const Partner = lazy(() => import("./partners"));
// hr
const hr = lazy(() => import("./tracker/hr/index"));
const hrAttendance = lazy(() => import("./tracker/hr/attendance/index"));
const hrBonuse = lazy(() => import("./tracker/hr/bonuse/index"));
const hrCurrentProject = lazy(() =>
  import("./tracker/hr/currentProject/index")
);
const hrleave = lazy(() => import("./tracker/hr/leave/index"));
const hrProject = lazy(() => import("./tracker/hr/project/index"));
const hrSalary = lazy(() => import("./tracker/hr/salary/index"));
const hrSkils = lazy(() => import("./tracker/hr/skils/index"));
// employe
const employe = lazy(() => import("./tracker/employe/index"));
const employeAttendance = lazy(() =>
  import("./tracker/employe/attendance/index")
);
const employeBonuse = lazy(() => import("./tracker/employe/bonuse/index"));
const employeCurrentProject = lazy(() =>
  import("./tracker/employe/currentProject/index")
);
const employeleave = lazy(() => import("./tracker/employe/leave/index"));
class AppRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Suspense fallback={<Spinner />}>
        {/* <Switch> */}
        <Route path="/spinner" component={Spinner} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin/candidates" component={Candidate} />
        <Route path="/admin/jobdescription" component={jobdescription} />
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

        <Route path="/partners/jobdescription" component={partnersJobDesc} />
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
        {/* hr */}
        <Route path="/hr/dashboard" component={hr} />
        <Route path="/hr/attendance/dashboard" component={hrAttendance} />
        <Route path="/hr/bonuse/dashboard" component={hrBonuse} />
        <Route
          path="/hr/current-project/dashboard"
          component={hrCurrentProject}
        />
        <Route path="/hr/leave/dashboard" component={hrleave} />
        <Route path="/hr/project/dashboard" component={hrProject} />
        <Route path="/hr/salary/dashboard" component={hrSalary} />
        <Route path="/hr/skils/dashboard" component={hrSkils} />
        {/* employe */}

        <Route path="/employe/dashboard" component={employe} />
        <Route
          path="/employe/attendance/dashboard"
          component={employeAttendance}
        />
        <Route path="/employe/bonuse/dashboard" component={employeBonuse} />
        <Route
          path="/employe/current-project/dashboard"
          component={employeCurrentProject}
        />
        <Route path="/employe/leave/dashboard" component={employeleave} />

        <Redirect to={"/user-pages/login-1"} />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.authenticated,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
