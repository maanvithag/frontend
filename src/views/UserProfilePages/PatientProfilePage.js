import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/core components
// @material-ui/icons
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import CardFooter from 'components/Card/CardFooter';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [editEmail, setEditEmail] = useState(true);
    const [editPhone, setEditPhone] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editIPCompany, setEditIPCompany] = useState(true);
    const [editIPContact, setEditIPContact] = useState(true);
    const [editMembershipID, setEditMembershipID] = useState(true);
    const [editIPlan, setEditIPlan] = useState(true);
    const [editDeductible, setEditDeductible] = useState(true);

    const [profile, setProfile] = useState({})

    const [emailaddress, setEmailAddress] = useState({})
    const [phonenumber, setPhoneNumber] = useState({})
    const [address, setAddress] = useState({})

    const [emergencycontactnumber, setEmergencyContactNumber] = useState({})
    const [emergencycontactname, setEmergencyContactName] = useState({})
    const [medicalhistory, setMedicalHistory] = useState({})

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setProfile(data)
                setEmailAddress("")
                setAddress("")
                setPhoneNumber("")
                setEmergencyContactName("")
                setEmergencyContactNumber("")
                setMedicalHistory("")
            })
    };
    useEffect(() => {handleLoad()},[])

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value)
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    };

    const saveUserInfoOnServer = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile/update', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                emailaddress: emailaddress,
                address: address,
                phonenumber: phonenumber,
                emergencycontactname: emergencycontactname,
                emergencycontactnumber: emergencycontactnumber,
                medicalhistory: medicalhistory
            })
        }).then(response => response.json())
    }

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
                                <Button
                                    onClick = {saveUserInfoOnServer}
                                    color="primary"
                                >Return to my Dashboard</Button>
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
                                        <h2 className={classes.cardTitleWhite}>{profile.firstname} {profile.lastname}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Username</InputLabel>
                                                <CustomInput
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.username
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Email Address</InputLabel>
                                                <CustomInput
                                                    labelText="Email Address"
                                                    id="float"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleEmailAddressChange,
                                                        placeholder: profile.username, // For now, it's just the same as username
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
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>First Name</InputLabel>
                                                <CustomInput
                                                    id="firstname"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.firstname
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Last Name</InputLabel>
                                                <CustomInput
                                                    id="lastname"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.lastname
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Address</InputLabel>
                                                <CustomInput
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleAddressChange,
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
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Contact Number</InputLabel>
                                                <CustomInput
                                                    id="phonenumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handlePhoneNumberChange,
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
                                    </CardBody>
                                    <CardFooter><br/></CardFooter>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Insurance Details </h4>
                                        <Link to= {"/patient/insurance/" + btoa(profile.insuranceprovider)}>
                                            <h7 style={style.link}> View Provider&nbsp;&nbsp;&nbsp;<i className={"fas fa-external-link-square-alt"}/> </h7>
                                        </Link>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance Company</InputLabel>
                                                <CustomInput
                                                    id="insurancecompany"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editIPCompany,
                                                        placeholder: profile.insurancecompany
                                                        // endAdornment: (
                                                        //     <InputAdornment position="end">
                                                        //         {editIPCompany && (<i onClick={() => setEditIPCompany(false)} className={"fas fa-edit"}/>)}
                                                        //         {editIPCompany ? "" : <i onClick={() => setEditIPCompany(true)} className="fas fa-save"></i>}
                                                        //     </InputAdornment>
                                                        // )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance Provider</InputLabel>
                                                <CustomInput
                                                    id="insuranceprovider"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editIPContact,
                                                        placeholder: profile.insuranceprovider
                                                        // endAdornment: (
                                                        //     <InputAdornment position="end">
                                                        //         {editIPContact && (<i onClick={() => setEditIPContact(false)} className={"fas fa-edit"}/>)}
                                                        //         {editIPContact ? "" : <i onClick={() => setEditIPContact(true)} className="fas fa-save"></i>}
                                                        //     </InputAdornment>
                                                        // )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance Plan</InputLabel>
                                                <CustomInput
                                                    id="insuranceplan"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editIPlan,
                                                        placeholder: profile.insuranceplan
                                                        // endAdornment: (
                                                        //     <InputAdornment position="end">
                                                        //         {editIPlan && (<i onClick={() => setEditIPlan(false)} className={"fas fa-edit"}/>)}
                                                        //         {editIPlan ? "" : <i onClick={() => setEditIPlan(true)} className="fas fa-save"></i>}
                                                        //     </InputAdornment>
                                                        // )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Membership ID</InputLabel>
                                                <CustomInput
                                                    labelText="Membership ID"
                                                    id="membershipid"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editMembershipID,
                                                        placeholder: profile.membershipID
                                                        // endAdornment: (
                                                        //     <InputAdornment position="end">
                                                        //         {editMembershipID && (<i onClick={() => setEditMembershipID(false)} className={"fas fa-edit"}/>)}
                                                        //         {editMembershipID ? "" : <i onClick={() => setEditMembershipID(true)} className="fas fa-save"></i>}
                                                        //     </InputAdornment>
                                                        // )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Deductible</InputLabel>
                                                <CustomInput
                                                    labelText="Deductible"
                                                    id="deductible"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editDeductible,
                                                        placeholder: profile.deductible,
                                                        // endAdornment: (
                                                        //     <InputAdornment position="end">
                                                        //         {editDeductible && (<i onClick={() => setEditDeductible(false)} className={"fas fa-edit"}/>)}
                                                        //         {editDeductible ? "" : <i onClick={() => setEditDeductible(true)} className="fas fa-save"></i>}
                                                        //     </InputAdornment>
                                                        // )
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



