import React from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import InputLabel from "@material-ui/core/InputLabel";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import { useState, useEffect } from 'react';
import AddDoctorReview from "views/Dashboards/AddDoctorReview.js";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState([]);

    const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/doctor' + '/bWFhbmkuaGFycnlAZ21haWwuY29t', {
        method : 'post',
        credentials: 'include',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
        setProfile(data)
        setReviews(data.reviews)
        setRating(Math.round(data.totalrating * 10) / 10)
    })
    }
    useEffect(() => {handleLoad()}, {})

    console.log(profile);

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
                        <br></br>
                        <GridContainer justify="center">
                            <Link to="/patient/dashboard">
                            <Button color="primary">Return to Dashboard</Button>
                            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/patient/bookappointment">
                                <Button color="primary">
                                Book Appointment
                                </Button>
                            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <AddDoctorReview/>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>{profile.name}</h4>
                                    </CardHeader>
                                    <CardBody>
                                    <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Personal Information</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.name}
                                                    id="first-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.education}
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Hospital</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.hospital}
                                                    id="hospital"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.specialization}
                                                    id="specialization"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={profile.address}
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={profile.phonenumber}
                                                    id="phone-number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>About Me</InputLabel>
                                                <CustomInput
                                                    labelText={profile.biosummary}
                                                    id="doctor-bio"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <CardHeader color="primary">
                                                <h4 className={classes.cardTitleWhite}>Average Rating: {rating}</h4>
                                            </CardHeader>
                                            <CardBody>
                                            {reviews.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                                                <CardBody>
                                                    <p>Rating: {item.rating}</p> 
                                                    <p>Review: {item.review}</p>
                                                </CardBody>
                                                </Card>))}
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}

