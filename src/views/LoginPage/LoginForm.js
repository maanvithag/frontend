import Icon from "@material-ui/core/Icon";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader.js";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      successful: "",
      cardAnimaton: "cardHidden",
      jsonResponse: "",
    };
    let currentURLPath = window.location.pathname;
    window.localStorage.setItem("userType", currentURLPath.substring(1, currentURLPath.indexOf("/signin")));

    //window.localStorage.setItem("baseURL", "http://localhost:8080/");
    window.localStorage.setItem("baseURL", "https://infinity-care.herokuapp.com/");
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
    window.localStorage.setItem("username", event.target.value);
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      isOtpSent: "",
      isCredentialsAccurate: "",
    };

    this.fireAndGetResponseInJSON();
    //console.log(this.state.getItem('jsonResponse'))
    //this.props.history.push('/abc')
  };
    
  fireAndGetResponseInJSON() {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    //})
    }).then(response => response.json())
    .then(data => console.log(data.isOtpSent))
  }

  render() {
    return (
        <form>
          <CardHeader color="primary">
            <h4>Log in with</h4>
            <div>
              <FacebookLogin
                  appId="523513645103749"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  render={renderProps => (
                      <Button
                          justIcon
                          target="_blank"
                          color="transparent"
                          onClick={renderProps.onClick}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                  )}
              />
            </div>
          </CardHeader>
          <CardBody>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>Don't have an account?</p>
              <Link to= {"signup"}>
                <Button color="primary" simple>
                  Sign Up
                </Button>
              </Link>
            </div>
            <CustomInput
                labelText="Username..."
                id="username"
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
                labelText="Password..."
                id="password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "password",
                  onChange: this.handlePasswordChange,
                  endAdornment: (
                      <InputAdornment position="end">
                        <Icon>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
            />
            <div style={{display: 'flex', alignSelf: 'right'}}>
              <Link to= {"forgotpassword/email"}>
              {/* </Link><Link to= {"validateuser"}> */}
                <Button color="primary" simple>
                  Forgot password?
                </Button>
              </Link>
            </div>
            <small style={{display: 'flex', justifyContent: 'center'}}>I agree to the Terms and Conditions &amp; Privacy Policy</small>
            <ReCAPTCHA
                sitekey="6LeqvL4UAAAAAGSZCz_PjOT8nMVh2CDpx_GUGyXj"
                onChange={this.onChange}
            />
          </CardBody>
          <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
            <Link to= {"mfa"}>
              <Button
                  onClick={this.handleSubmit}
                  style={{ minWidth: "70%" }}
                  color="info">
                Sign In
              </Button>
            </Link>
          </CardFooter>
        </form>
    );
  }
}

