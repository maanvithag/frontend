import React, {useState, useEffect} from 'react';
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
import {primaryColor} from "../../assets/jss/material-kit-react";
import {Link} from "react-router-dom";
import Success from 'components/Typography/Success';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({});

    const patientusername = window.location.href.split('/')[5]

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/patient/' + patientusername, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
        .then(data => {
            setProfile(data)
        })
    }
    useEffect(() => {handleLoad()}, {})
        
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
                            <Link to="/doctor/dashboard">
                            <Button color="primary">Return to my Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                    <h2 className={classes.cardTitleWhite}>{profile.name}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Address</InputLabel>
                                                <CustomInput
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.address
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Phone Number</InputLabel>
                                                <CustomInput
                                                    id="phone-number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.phonenumber
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Date of Birth</InputLabel>
                                                <CustomInput
                                                    id="dob"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.dob
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance Company</InputLabel>
                                                <CustomInput
                                                    id="insurance-company"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.insurancecompany
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance Plan</InputLabel>
                                                <CustomInput
                                                    id="insurance-plan"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.insuranceplan
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Emergency Contact Details</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="emergency-contact"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.emergencycontact
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '10px'}}>Medical History</InputLabel>
                                                <CustomInput
                                                    id="medical-info"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.medicalhistory,
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
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

