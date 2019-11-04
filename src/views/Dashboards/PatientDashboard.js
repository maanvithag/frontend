import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/List";
import Schedule from "@material-ui/icons/Schedule";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Table from "components/Table/Table.js";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CancelAppointment from "views/BookAppointment/CancelAppointment.js";
import SignedInHeaders from "views/SignedInHeader.js";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const tabClasses = useTabStyles();
  const { ...rest } = props;
  const [appointments, setAppointments] = useState([]);

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/getappointments', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setAppointments(data)
    })
  }
  useEffect(() => {handleLoad()},[])

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
                            <h4 className={classes.cardTitle}>{item.mDoctorUsername}</h4>
                            <p>Date: {item.mDisplayDate}</p>
                            <p>Time: {item.mDisplayTime}</p>
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
                            <h4 className={classes.cardTitle}>{item.mDoctorUsername}</h4>
                            <p>Date: {item.mDisplayDate}</p>
                            <p>Time: {item.mDisplayTime}</p>
                            <Link to= {"/patient/doctor/" + item.mEncodedDoctorUserName}>
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
