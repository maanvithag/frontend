import React from "react";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

export default class SignupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      userType: "insurance",
      company: "",
      successful: "",
      cardAnimaton: "cardHidden"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
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

  handleCompanyChange = event => {
    this.setState({ company: event.target.value });
  };

  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handlePhoneNumberChange = event => {
    this.setState({ phoneNumber: event.target.value });
  };



  handleSubmit = () => {
    var targetUrl = window.localStorage.getItem("baseURL") + 'insurance/signup';
    window.localStorage.setItem("encryptedUserName", btoa(this.state.username));

    fetch(targetUrl, {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body : JSON.stringify({
        username : this.state.username,
        password : this.state.password,
        email : this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        company: this.state.company
      })
    }).then(response => response.json())
    .then(data => {
      if(data.isNewUser) {
        this.props.history.push("mfa");
      } else {
         alert("Existing user or improper data submitted")
      }
    })
  };

  render() {
    return (
      <form>
        <CardHeader color="primary">
          <h4>Insurance Sign Up</h4>
        </CardHeader>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>

            <CustomInput
                labelText="First Name"
                id="firstName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handleFirstNameChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Last Name"
                id="lastName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handleLastNameChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Username"
                id="first"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handleUsernameChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "email",
                  onChange: this.handleEmailChange
                }}
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Company"
                id="company"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handleCompanyChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Phone Number"
                id="phoneNumber"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handlePhoneNumberChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Company Address"
                id="address"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  onChange: this.handleAddressChange
                }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
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
          </GridItem>
        </GridContainer>
          <ReCAPTCHA
                sitekey="6LeqvL4UAAAAAGSZCz_PjOT8nMVh2CDpx_GUGyXj"
                onChange={this.onChange}
            />
        </CardBody>
        <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
          <Link to="/insurance/mfa">
            <Button
             onClick={this.handleSubmit}
             style={{ minWidth: "70%" }}
             color="info"
            >
            Sign up
            {this.successful}
            </Button>
          </Link>
        </CardFooter>
      </form>
    );
  }
}
