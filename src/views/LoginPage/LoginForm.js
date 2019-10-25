import React from "react";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import TypeSelect from "views/Modals/TypeSelect.js";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      successful: "",
      userType: "",
      cardAnimaton: "cardHidden"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });

    var currentURLPath = window.location.pathname
    this.setState({userType: currentURLPath.substring(1, currentURLPath.indexOf("/signin"))});
    window.localStorage.setItem("userType", this.state.userType);
    window.localStorage.setItem("username", event.target.value);
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      isOtpSent: "",
      isCredentialsAccurate: "",
    };

    axios({
      method : 'post',
      url: 'https://infinity-care.herokuapp.com/login/' + window.localStorage.getItem("userType"),
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      data : {
        username : this.state.username,
        password : this.state.password
      }
    }).then(res => {
      if(user.isOtpSent && user.isCredentialsAccurate) {
        this.setState({successful: true})
      }
    })
  };
    
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
              <TypeSelect />
            </div>
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
              <Button color="primary" simple>
                Forgot password?
              </Button>
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
            {this.successful}
          </CardFooter>
        </form>
    );
  }
}

