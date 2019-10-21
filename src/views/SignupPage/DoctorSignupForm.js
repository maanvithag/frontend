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

export default class SignupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      userType: "doctor",
      specialization: "",
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
    event.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType,
      specialization: this.state.specialization
    };
    console.log(user);

    Axios.post("https://infinity-care.herokuapp.com/signup/insurance", { user })
      .then(res=> {
        console.log(res);
        console.log(res.data);
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
        <Button
          onClick={this.handleSubmit}
          style={{ minWidth: "70%" }}
          color="info"
        >
          Sign up
        </Button>
        </CardFooter>
      </form>
    );
  }
}
