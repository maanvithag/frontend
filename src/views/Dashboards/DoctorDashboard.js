import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/icons/List";
import Schedule from "@material-ui/icons/Schedule";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CancelAppointment from "views/BookAppointment/CancelAppointment.js";
import SignedInHeaders from "views/SignedInHeader.js";


const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [appointments, setAppointments] = useState([
    {"patient": "patient 1", "date": "date 1", "time": "time 1"},
    {"patient": "patient 2", "date": "date 2", "time": "time 2"}
  ]);
  const [pastAppointments, setPastAppointments] = useState([
    {"patient": "patient 1", "date": "date 1", "time": "time 1"},
    {"patient": "patient 2", "date": "date 2", "time": "time 2"}
  ]);

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/getappointments', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setAppointments(data.CurrentAppointments)
      setPastAppointments(data.PastAppointments)
    })
  }
  useEffect(() => {handleLoad()},[])
  
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
                          { pastAppointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                            <CardBody>
                            <h4 className={classes.cardTitle}>{item.mDoctorUsername}</h4>
                            <p>Date: {item.mDisplayDate}</p>
                            <p>Time: {item.mDisplayTime}</p>
                              <Link to= {"/doctor/patient/" + item.mEncodedPatientName}>
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
