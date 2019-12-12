import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png"
import Logo2 from "../../assets/img/logo2.png"

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js"
import TypeSelect from "views/Modals/TypeSelect.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="white"
        routes={dashboardRoutes}
        brand={ <img width="240" height="40" resizeMode="contain" src={Logo2} alt="Logo2" />}
        rightLinks={<HeaderLinks />}
        fixed
        /*changeColorOnScroll={{
          height: 50,
          color: "white"
        }}*/
        {...rest}
      />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Health care at your fingertips</h1>
              <h4>
                 Connect with your doctors and insurance providers, hassle-free.
              </h4>
              <br />
              <TypeSelect />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <img width="300" height="300" resizeMode="contain" src={Logo} alt="Logo" />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
        </div>
      </div>
    </div>
  );
}
