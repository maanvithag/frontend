import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SignupSelect from "views/Modals/SignupSelect.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import FacebookLogin from 'react-facebook-login';
import loginStyles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

class LoginPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      props : props,
      loginClasses : "", //makeStyles(loginStyles),
      cardAnimaton : "", //React.useState("cardHidden"),
      setCardAnimation : "" //React.useState("cardHidden")
    }
    // setTimeout(function() {
    //   this.setCardAnimation("");
    // }, 700);
    //const { ...rest } = props;
  }

  responseFromFacebook(response){
    console.log(response);
  };

  render() {
    //const [a, b] = React.useState("cardHidden");
    // this.state.cardAnimaton = a;
    // this.state.setCardAnimation = b;
    this.state.loginClasses = makeStyles(loginStyles);
    return(
    <div>
      <Header
        absolute
        color="white"
        brand="InfinityCare"
        rightLinks={<HeaderLinks />}
        // {...rest}
      />
      <div
        className={this.state.loginClasses.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={this.state.loginClasses.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={this.state.loginClasses[this.state.cardAnimaton]}>
                <form className={this.state.loginClasses.form}>
                  <CardHeader color="primary" className={this.state.loginClasses.cardHeader}>
                    <h4>Log in with</h4>
                    <div className={this.state.loginClasses.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={this.state.loginClasses.socialIcons + " fab fa-facebook"}>
                          <FacebookLogin
                            appId="523513645103749"
                            autoLoad={false}
                            fields="name,email,picture"
                            textButton=""
                            icon = {this.state.loginClasses.socialIcons + " fa-facebook"}
                            callback={(response)=>this.responseFromFacebook(response)} />
                          </i>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={this.state.loginClasses.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={this.state.loginClasses.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomDropdown
                      noLiPadding
                      buttonText="Please Select"
                      buttonProps={{
                        className: this.state.loginClasses.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        <p>Patient</p>,
                        <p>Doctor</p>,
                        <p>Insurance</p>
                      ]}
                    />
                    <small style={{display: 'flex', justifyContent: 'center'}}>I agree to the Terms and Conditions &amp; Privacy Policy</small>
                  </CardBody>
                  <CardFooter className={this.state.loginClasses.cardFooter}>
                    <Button color="primary" size="lg">
                      Sign In
                    </Button>
                  </CardFooter>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                  <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>Don't have an account?</p><SignupSelect/>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
    );
  };
}

export default LoginPage;