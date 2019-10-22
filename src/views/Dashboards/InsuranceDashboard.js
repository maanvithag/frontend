import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import NavPills from "components/NavPills/NavPills.js";
import RenderUser from "views/ProfilePage/RenderUser.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import pillStyles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const usePillStyles = makeStyles(pillStyles);
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const pillClasses = usePillStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        brand="InfinityCare"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 0,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <h2>Insurance dashboard</h2>
                <RenderUser />
              </GridItem>
              <GridItem xs={12} sm={12} md={8} lg={6}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Dashboard",
                    tabIcon: Dashboard,
                    tabContent: (
                      <span>
                        <p>
                          Dashboard for insurance companies and includes things tailored for the insurance userType
                        </p>
                        <br />
                      </span>
                    )
                  },
                  {
                    tabButton: "Network",
                    tabIcon: Schedule,
                    tabContent: (
                      <span>
                        <p>
                          View each network of doctors and patients associated with the insurance.
                        </p>
                        <br />
                      </span>
                    )
                  },
                  {
                    tabButton: "Plans",
                    tabIcon: List,
                    tabContent: (
                      <span>
                        <p>
                          Create and manage already insurance plans
                        </p>
                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
