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
import InputAdornment from '@material-ui/core/InputAdornment';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [editEmergencyName, setEditEmergencyName] = useState(true);
    const [editEmergencyNum, setEditEmergencyNum] = useState(true);
    const [editHistory, setEditHistory] = useState(true);
    const [editEmail, setEditEmail] = useState(true);
    const [editPhone, setEditPhone] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editIPCompany, setEditIPCompany] = useState(true);
    const [editIPContact, setEditIPContact] = useState(true);
    const [editMembershipID, setEditMembershipID] = useState(true);
    const [editIPlan, setEditIPlan] = useState(true);
    const [editDeductible, setEditDeductible] = useState(true);

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
    };
    useEffect(() => {handleLoad()},[])

    const style = {
        link: {
            color: 'white'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        }
    };


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
                <div style={style.bg}>
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
                                        <h4 className={classes.cardTitleWhite}>General Information</h4>
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
                                                    id="emailaddress"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.emailaddress,
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
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.address,
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
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.phonenumber}
                                                    id="phonenumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.phonenumber,
                                                        disabled: editPhone,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editPhone && (<i onClick={() => setEditPhone(false)} className={"fas fa-edit"}/>)}
                                                                {editPhone ? "" : <i onClick={() => setEditPhone(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
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
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Insurance Details </h4>
                                        <Link to= {"/patient/insurance/" + btoa(profile.insuranceprovider)}>
                                            <h7 style={style.link}> View Provider&nbsp;&nbsp;&nbsp;<i className={"fas fa-external-link-square-alt"}/> </h7>
                                        </Link>
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
                                                        disabled: editIPCompany,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editIPCompany && (<i onClick={() => setEditIPCompany(false)} className={"fas fa-edit"}/>)}
                                                                {editIPCompany ? "" : <i onClick={() => setEditIPCompany(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
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
                                                        disabled: editIPContact,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editIPContact && (<i onClick={() => setEditIPContact(false)} className={"fas fa-edit"}/>)}
                                                                {editIPContact ? "" : <i onClick={() => setEditIPContact(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
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
                                                        disabled: editIPlan,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editIPlan && (<i onClick={() => setEditIPlan(false)} className={"fas fa-edit"}/>)}
                                                                {editIPlan ? "" : <i onClick={() => setEditIPlan(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.membershipid}
                                                    id="membershipid"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editMembershipID,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editMembershipID && (<i onClick={() => setEditMembershipID(false)} className={"fas fa-edit"}/>)}
                                                                {editMembershipID ? "" : <i onClick={() => setEditMembershipID(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={profile.deductible}
                                                    id="deductible"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editDeductible,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editDeductible && (<i onClick={() => setEditDeductible(false)} className={"fas fa-edit"}/>)}
                                                                {editDeductible ? "" : <i onClick={() => setEditDeductible(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Emergency Contact</h4>
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
                                                        placeholder: profile.emergencycontactname,
                                                        disabled: editEmergencyName,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmergencyName && (<i onClick={() => setEditEmergencyName(false)} className={"fas fa-edit"}/>)}
                                                                {editEmergencyName ? "" : <i onClick={() => setEditEmergencyName(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
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
                                                        placeholder: profile.emergencycontactnumber,
                                                        disabled: editEmergencyNum,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmergencyNum && (<i onClick={() => setEditEmergencyNum(false)} className={"fas fa-edit"}/>)}
                                                                {editEmergencyNum ? "" : <i onClick={() => setEditEmergencyNum(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Medical Details</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <CustomInput
                                                id="medicalinfo"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    placeholder: profile.medicalhistory,
                                                    multiline: true,
                                                    rows: 5,
                                                    disabled: editHistory,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {editHistory && (<i onClick={() => setEditHistory(false)} className={"fas fa-edit"}/>)}
                                                            {editHistory ? "" : <i onClick={() => setEditHistory(true)} className="fas fa-save"></i>}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
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


