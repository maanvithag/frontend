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
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SignedInHeaders from "views/SignedInHeader.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [editGeneral, setEditGeneral] = useState(true);
    const [editInsurance, setEditInsurance] = useState(true);
    const [editEmergency, setEditEmergency] = useState(true);
    const [editMedical, setEditMedical] = useState(true);
    const [profile, setProfile] = useState({})

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
          method : 'post',
          credentials: 'include',
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
        .then(data => {
          setProfile(data)
        })
      }
    useEffect(() => {handleLoad()},[])
      
    console.log(profile)

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
                                        <h4 className={classes.cardTitleWhite}>General Information<Button color="#ffffff" simple sm style={{ margin: '0px'}} onClick={() => setEditGeneral(false)}>
                                            <i
                                                className={"fas fa-edit"}
                                            />
                                        </Button></h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.username}
                                                    id="username"
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
                                                    labelText={profile.emailaddress}
                                                    id="emailaddress"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editGeneral
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.firstname}
                                                    id="firstname"
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
                                                    labelText={profile.lastname}
                                                    id="lastname"
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
                                                        disabled: editGeneral
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.phonenumber}
                                                    id="phonenumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editGeneral
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.dob}
                                                    id="dob"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editGeneral
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" onClick={() => setEditGeneral(true)}>Save</Button>
                                    </CardFooter>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Insurance Details<Button color="#ffffff" simple sm style={{ margin: '0px'}} onClick={() => setEditInsurance(false)}>
                                            <i
                                                className={"fas fa-edit"}
                                            />
                                        </Button></h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.insurancecompany}
                                                    id="insurancecompany"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editInsurance
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.insuranceprovider}
                                                    id="insuranceprovider"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editInsurance
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.insuranceplan}
                                                    id="insuranceplan"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editInsurance
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem>
                                            <Link to= {"/patient/insurance/" + btoa(profile.insuranceprovider)}>
                                                <Button color="primary">View Insurance Provider Profile</Button>
                                            </Link>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" onClick={() => setEditInsurance(true)}>Save</Button>
                                    </CardFooter>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Emergency Contact<Button color="#ffffff" simple sm style={{ margin: '0px'}} onClick={() => setEditEmergency(false)}>
                                            <i
                                                className={"fas fa-edit"}
                                            />
                                        </Button></h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.emergencycontactname}
                                                    id="emergencyname"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editEmergency
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.emergencycontactnumber}
                                                    id="emergencyphone"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editEmergency
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" onClick={() => setEditEmergency(true)}>Save</Button>
                                    </CardFooter>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Medical Details<Button color="#ffffff" simple sm style={{ margin: '0px'}} onClick={() => setEditMedical(false)}>
                                            <i
                                                className={"fas fa-edit"}
                                            />
                                        </Button></h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <CustomInput
                                                labelText={profile.medicalhistory}
                                                id="medicalinfo"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 5,
                                                    disabled: editMedical
                                                }}
                                            />
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" onClick={() => setEditMedical(true)}>Save</Button>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

