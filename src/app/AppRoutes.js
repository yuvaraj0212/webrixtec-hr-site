import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import Register2 from "./admin/candidates/Register2";
import Success from "./admin/candidates/success";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

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
const AbsoluteTech = lazy(() => import("./admin/partners/Absolute Tech"));
const DestinationToJapan = lazy(() =>
  import("./admin/partners/Destination To Japan")
);
const Nikita = lazy(() => import("./admin/partners/Nikita"));
const RedDot = lazy(() => import("./admin/partners/Red dot"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />

          <Route
            path="/form-Elements/basic-elements"
            component={BasicElements}
          />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />

          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />

          <Route path="/admin/candidate/register-2" component={Register2} />
          <Route path="/admin/candidate/success" component={Success} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          {/* partners */}
          <Route path="/admin/partners/AbsoluteTech" component={AbsoluteTech} />
          <Route path="/admin/partners/Nikita" component={Nikita} />
          <Route path="/admin/partners/RedDot" component={RedDot} />
          <Route
            path="/admin/partners/DestinationToJapan"
            component={DestinationToJapan}
          />

          <Redirect to="/admin/candidate/register-2" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
