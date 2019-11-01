import React from "react";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";

export default class SignupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      hospital: "",
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
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleHospitalChange = this.handleHospitalChange.bind(this);
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

  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handleHospitalChange = event => {
    this.setState({ hospital: event.target.value });
  };

  handleSubmit = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      hospital: this.state.hospital,
      specialization: this.state.specialization,
      isOtpSent: "",
      isNewUser:"",
      userType: this.state.userType
    };

    var targetUrl = window.localStorage.getItem("baseURL") + 'doctor/signup';

    fetch(targetUrl, {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json'},
      body : JSON.stringify({
        username : this.state.username,
        password : this.state.password,
        email : this.state.email,
      })
    }).then(res => {
      if(user.isOtpSent && user.isNewUser) {
        this.setState({successful: "new user"})
      } else if(res.isOtpSent) {
         this.setState({successful: "old user"})
      } else {
         this.setState({successful: "user not recognized"})
      }
    })
  };
  
  render() {
    return (
      <form>
        <CardHeader color="primary">
          <h4>Doctor Sign Up</h4>
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
              labelText="Hospital"
              id="hospital"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
                onChange: this.handleHospitalChange
              }}
          />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                  labelText="Specialization"
                  id="specialization"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    onChange: this.handleSpecializationChange
                  }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Hospital Address"
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
          <Link to="/doctor/mfa"> 
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
