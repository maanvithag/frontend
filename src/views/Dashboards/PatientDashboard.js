import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import LocalOffer from "@material-ui/icons/LocalOffer";

// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import NavPills from "components/NavPills/NavPills.js";
import RenderUser from "views/ProfilePage/RenderUser.js";
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
import Map from "views/Map/Map.js"

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const tabClasses = useTabStyles();
  const { ...rest } = props;
  const [appointments, setAppointments] = useState([
    {"doctor": "doctor1", "date": "date1", "time": "time1"},
    {"doctor": "doctor2", "date": "date2", "time": "time2"}
  ]);
  const [pastAppointments, setPastAppointments] = useState([
    {"doctor": "doctor1", "date": "date1", "time": "time1"},
    {"doctor": "doctor2", "date": "date2", "time": "time2"}
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
            <GridContainer justify="space-around">
              <GridItem xs={5} sm={5} md={5} lg={5}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Upcoming appointments",
                    tabIcon: Dashboard,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                        { appointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h3 className={classes.cardTitle}>{item.doctor}</h3>
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
                            <h4 className={classes.cardTitle}>{item.doctor}</h4>
                            <p>{item.time} at {item.date}</p>
                            <Link to= {"/patient/doctor/:doctorID"}>
                              <Button color="primary">
                                View Doctor
                              </Button>
                            </Link>
                          </CardBody>
                        </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Payments",
                    tabIcon: Schedule,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="primary">
                              <h4 className={classes.cardTitleWhite}>Bills</h4>
                            </CardHeader>
                            <CardBody>
                              <Table
                                tableHeaderColor="primary"
                                tableHead={["Doctor", "Date", "Amount"]}
                                tableData={[
                                  ["Dakota Rice", "10/22/2018", "$300"],
                                  ["Minerva Hooper", "11/13/2018", "0"],
                                ]}
                              />
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    )
                  },
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
