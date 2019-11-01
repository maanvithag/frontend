import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import Login from "views/LoginPage/LoginPage.js";
import DoctorSignup from "views/SignupPage/DoctorSignupPage.js";
import InsuranceSignup from "views/SignupPage/InsuranceSignupPage.js";
import PatientSignup from "views/SignupPage/PatientSignupPage.js";
import DoctorDashboard from "views/Dashboards/DoctorDashboard";
import InsuranceDashboard from "views/Dashboards/InsuranceDashboard";
import PatientDashboard from "views/Dashboards/PatientDashboard";
import MFAPage from "./views/MFAPage/MFAPage";
import EnterEmail from "./views/ForgotPassword/EnterEmailPage";
import ForgotPassword from "./views/ForgotPassword/ForgotPasswordPage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/components" component={Components} />

      <Route path="/:userType/forgotpassword" exact component={ForgotPassword}/>
      <Route path="/:userType/forgotpassword/email" exact component={EnterEmail}/>
      
      <Route path="/doctor/signup" component={DoctorSignup}/>
      <Route path="/insurance/signup" exact component={InsuranceSignup}/>
      <Route path="/patient/signup" exact component={PatientSignup}/>

      <Route path="/:userType/mfa" exact component={MFAPage}/>

      <Route path="/doctor/signin" exact component={Login}/>
      <Route path="/patient/signin" exact component={Login}/>
      <Route path="/insurance/signin" exact component={Login}/>

      <Route path="/insurance/:insuranceID" exact component={InsuranceDashboard} />
      <Route path="/patient/:patientID" exact component={PatientDashboard} />
      <Route path="/doctor/:doctorID" exact component={DoctorDashboard} />

      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
