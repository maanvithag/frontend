import React, { useState } from 'react';
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
import InputAdornment from '@material-ui/core/InputAdornment';

import {primaryColor} from "../../assets/jss/material-kit-react";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const tabClasses = useTabStyles();
    const { ...rest } = props;
    const [editHospital, setEditHospital] = useState(true);
    const [editBio, setEditBio] = useState(true);
    const [editEducation, setEditEducation] = useState(true);
    const [editEmail, setEditEmail] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editSpecialization, setEditSpecialization] = useState(true);

    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        }
    };

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
                <div style={style.bg}>
                    <div className={classes.container}>
                        <br></br>
                        <GridContainer justify="center">
                            <Link to="/doctor/dashboard">
                                <Button color="primary">Return to my Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Doctor: First Name Last Name</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <h5 style={{color:"#A126AC", mragin:'0px'}}>General information</h5>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Username",
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="email-address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Email Address",
                                                        disabled: editEmail,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmail && (<i onClick={() => setEditEmail(false)} className={"fas fa-edit"}/>)}
                                                                {editEmail ? "" : <i onClick={() => setEditEmail(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Education",
                                                        disabled: editEducation,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEducation && (<i onClick={() => setEditEducation(false)} className={"fas fa-edit"}/>)}
                                                                {editEducation ? "" : <i onClick={() => setEditEducation(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardBody>
                                    <h5 style={{color:"#A126AC", mragin:'0px'}}>Hospital</h5>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="hospital"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Hospital",
                                                        disabled: editHospital,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editHospital && (<i onClick={() => setEditHospital(false)} className={"fas fa-edit"}/>)}
                                                                {editHospital ? "" : <i onClick={() => setEditHospital(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />{console.log(editHospital)}
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    id="specialization"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Specialization",
                                                        disabled: editSpecialization,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editSpecialization && (<i onClick={() => setEditSpecialization(false)} className={"fas fa-edit"}/>)}
                                                                {editSpecialization ? "" : <i onClick={() => setEditSpecialization(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: "Address",
                                                        disabled: editAddress,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editAddress && (<i onClick={() => setEditAddress(false)} className={"fas fa-edit"}/>)}
                                                                {editAddress ? "" : <i onClick={() => setEditAddress(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardBody>
                                    <h5 style={{color:"#A126AC", mragin:'0px'}}>About me</h5>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                id="doctor-bio"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    placeholder: "Bio summary",
                                                    multiline: true,
                                                    rows: 5,
                                                    disabled: editBio,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {editBio && (<i onClick={() => setEditBio(false)} className={"fas fa-edit"}/>)}
                                                            {editBio ? "" : <i onClick={() => setEditBio(true)} className="fas fa-save"></i>}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </GridItem>
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


