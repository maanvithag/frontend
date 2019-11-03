import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Icon from "@material-ui/core/Icon";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";
import LocalOffer from "@material-ui/icons/LocalOffer";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import NavPills from "components/NavPills/NavPills.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import InputLabel from "@material-ui/core/InputLabel";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SignedInHeaders from "views/SignedInHeader.js";
import CancelAppointment from "views/BookAppointment/CancelAppointment.js";

import {primaryColor} from "../../assets/jss/material-kit-react";
import {Link} from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const tabClasses = useTabStyles();
  const { ...rest } = props;
  const [appointments, setAppointments] = useState([
    {"patient": "patient 1", "date": "date 1", "time": "time 1"},
    {"patient": "patient 2", "date": "date 2", "time": "time 2"}
  ]);
  const [pastAppointments, setPastAppointments] = useState([
    {"patient": "patient 1", "date": "date 1", "time": "time 1"},
    {"patient": "patient 2", "date": "date 2", "time": "time 2"}
  ]);
  return (
    <div>
      <Header
        color="white"
        brand="InfinityCare"
        rightLinks={<SignedInHeaders />}
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
              <GridItem xs={12} sm={12} md={8} lg={6}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Upcoming appointments",
                    tabIcon: Schedule,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { appointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                            <CardBody>
                              <h3 className={classes.cardTitle}>{item.patient}</h3>
                              <p>{item.time} at {item.date}</p>
                              <CancelAppointment/>
                            </CardBody>
                          </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Past appointments",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { appointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                            <CardBody>
                              <h3 className={classes.cardTitle}>{item.patient}</h3>
                              <p>{item.time} at {item.date}</p>
                              <Link to= {"/doctor/patient/:patientID"}>
                              <Button color="primary">
                                View Patient
                              </Button>
                              </Link>
                            </CardBody>
                          </Card>))}
                        </GridItem>
                      </GridContainer>
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
