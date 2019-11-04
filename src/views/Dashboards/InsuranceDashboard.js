import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/List";
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
import AddIpPlan from "views/Dashboards/AddIpPlan.js";
import DeleteIpPlan from "views/Dashboards/DeleteIpPlan.js";
import SignedInHeaders from "views/SignedInHeader.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [iplans, setIplans] = useState([]);
  const [patients, setPatients] = useState([
    {"patient": "patient 1", "date": "date 1", "time": "time 1"},
    {"patient": "patient 2", "date": "date 2", "time": "time 2"}
  ]);

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/iplans', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setIplans(data.IPlans)
      setPatients(data.Patients)
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
                    tabButton: "IP plans",
                    tabIcon: Dashboard,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <AddIpPlan/>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { iplans.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.mProvider}</h4>
                            <p>Price: {item.price}</p>
                            <p>Details: {item.mDetails}</p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <DeleteIpPlan/>
                          </CardBody> 
                        </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Patients",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { patients.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.patient}</h4> 
                            <Link to= {"/insurance/patient/:patientID"}>
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
