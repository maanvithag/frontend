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
        color="white"
        brand="InfinityCare"
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
                <h2>Patient dashboard</h2>
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
                          Dashboard for patient and includes things tailored for the patient userType
                        </p>
                        <br />
                      </span>
                    )
                  },
                  {
                    tabButton: "Schedule",
                    tabIcon: Schedule,
                    tabContent: (
                      <span>
                        <p>
                          Schedule for current and pass appointments of each patient.
                        </p>
                        <br />
                      </span>
                    )
                  },
                  {
                    tabButton: "Tasks",
                    tabIcon: List,
                    tabContent: (
                      <span>
                        <p>
                          Tasks such as confirm appointments, cancel appointments, etc..
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
