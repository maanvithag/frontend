import React from "react";
import Axios from "axios";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter";
import loginStyles from "assets/jss/material-kit-react/views/loginPage.js";
import {Link} from "react-router-dom";

export default class SignupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      userType: "doctor",
      specialization: "",
      successful: "",
      isOtpSent: "",
      isNewUser: true,
      cardAnimaton: "cardHidden"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSpecializationChange = event => {
    this.setState({ specialization: event.target.value });
  };

  handleSubmit = event => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      isOtpSent: "",
      isNewUser:"",
      userType: this.state.userType
    };
    console.log(user);

    var targetUrl = 'http://localhost:8080/signup/doctor';
    var queryString = "?username=" + this.state.username + "&password=" + this.state.password;

    fetch(targetUrl + queryString, {
            method: 'POST',
            credentials: "same-origin", 
            headers: {Accept: 'application/json', 'Content-Type': 'application/json',},
        })
    .then(res => {
      console.log(user)
      if(user.isOtpSent && user.isNewUser) {
        this.setState({successful: "new user"})
      }
      else if(res.isOtpSent) {
        this.setState({successful: "old user"})
      }
      else {
          this.setState({successful: "user not recognized"})
        }
    })
};
  
  render() {
    return (
      <form>
        <CardHeader color="primary">
          <h4>Doctor sign up</h4>
        </CardHeader>
        <CardBody>
          <CustomInput
            labelText="Username..."
            id="first"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              onChange: this.handleUsernameChange,
              endAdornment: (
                <InputAdornment position="end">
                  <People />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Email..."
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "email",
              onChange: this.handleEmailChange,
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Specialization..."
            id="specialization"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              onChange: this.handleSpecializationChange
            }}
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              onChange: this.handlePasswordChange,
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>lock_outline</Icon>
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
          <Link to="/doctor-authenticateOTP"> 
            <Button
              onClick={this.handleSubmit}
              style={{ minWidth: "70%" }}
              color="info"
            >
            Sign up
            </Button>
          </Link>
        {this.successful}
        </CardFooter>
      </form>
    );
  }
}
