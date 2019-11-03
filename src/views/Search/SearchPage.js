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

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function SearchPage(props) {
  const classes = useStyles();
  const tabClasses = useTabStyles();
  const { ...rest } = props;
  const [searchResults, setAppointments] = useState(
    [
      {username: "doctor1@gmail.com", name: "firstname1 + lastname1", specialization: "specialization 1", hospital: "hospital 1", address: "address 1"},
      {username: "doctor2@gmail.com", name: "firstname2 + lastname2", specialization: "specialization 2", hospital: "hospital 2", address: "address 2"},
      {username: "doctor3@gmail.com", name: "firstname3 + lastname3", specialization: "specialization 3", hospital: "hospital 3", address: "address 3"},
      {username: "doctor4@gmail.com", name: "firstname4 + lastname5", specialization: "specialization 4", hospital: "hospital 4", address: "address 4"},
      {username: "doctor5@gmail.com", name: "firstname4 + lastname5", specialization: "specialization 5", hospital: "hospital 5", address: "address 5"}
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
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    { searchResults.map((item, index) => (<Link to= {"/"}><Card style={{width: "25rem", borderColor: "primary"}}>
                        <CardBody>
                        <h3 className={classes.cardTitle}>{item.name}</h3>
                        <h4>{item.specialization}</h4>
                        <p>{item.hospital}</p>
                        <p>{item.address}</p>
                        <Link to= {"/patient/bookappointment"}>
                          <Button color="primary">
                            Book Appointment
                          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Link>
                        <Link to= {"/patient/doctor/:doctorID"}>
                          <Button color="primary">
                            View Profile
                          </Button>
                        </Link>
                        </CardBody>
                        </Card></Link>))}
                    </GridItem>
                </GridContainer>
                </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
