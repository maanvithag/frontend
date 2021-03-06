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
import Logo2 from "../../assets/img/logo2.png";

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
    const [editPremium, setEditPremium] = useState(true);
    const [editCopayment, setEditCopayment] = useState(true);
    const [editOutOfPocketLimit, setEditOutOfPocketLimit] = useState(true);


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
                console.log(data)
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
            color: 'white',
            marginTop: '-10px',
            fontSize: '18px',
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        label:{
            fontSize: '18px',
            fontWeight: '425',
            marginTop: '30px',
            marginBottom: '-15px',
            color: '#904199'
        },
        title:{
            fontSize: '35px',
            fontWeight: '400',
        },
        altTitle:{
            fontSize: '30px',
            fontWeight: '400',
        },
        subtitle:{
            marginTop: '-10px',
            fontSize: '20px',
            color:'white'
        }
    };

    return (
        <div>
            <Header
                color="white"
                brand={ <img width="240" height="40" resizeMode="contain" src={Logo2} alt="Logo2" />}
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
                            <GridItem xs={12} sm={12} md={7} align="center">
                            <Link to={"/patient/dashboard"}>
                                <Button 
                                onClick = {saveUserInfoOnServer}
                                color="primary" 
                                style={style.btn}
                                ><b>My Dashboard</b></Button>
                            </Link>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h2 className={classes.cardTitleWhite} style={style.title}>{profile.firstname} {profile.lastname}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Username</InputLabel>
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
                                                <InputLabel style={style.label}>Email Address</InputLabel>
                                                <CustomInput
                                                    id="emailaddress"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleEmailAddressChange,
                                                        placeholder: profile.email, // For now, it's just the same as username
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
                                                <InputLabel style={style.label}>First Name</InputLabel>
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
                                                <InputLabel style={style.label}>Last Name</InputLabel>
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
                                                <InputLabel style={style.label}>Address</InputLabel>
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
                                                <InputLabel style={style.label}>Contact Number</InputLabel>
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
                                                <InputLabel style={style.label}>Date of Birth</InputLabel>
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
                                        <h3 className={classes.cardTitleWhite} style={style.altTitle}>Insurance Plan Details </h3>
                                        <Link to= {"/patient/insurance/" + btoa(profile.insuranceprovider)}>
                                            <h7 style={style.link}> View Provider&nbsp;&nbsp;&nbsp;<i className={"fas fa-external-link-square-alt"}/> </h7>
                                        </Link>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Insurance Company</InputLabel>
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
                                                <InputLabel style={style.label}>Insurance Provider</InputLabel>
                                                <CustomInput
                                                    id="insuranceprovider"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editIPContact,
                                                        placeholder: profile.insuranceprovidername
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
                                                <InputLabel style={style.label}>Insurance Plan</InputLabel>
                                                <CustomInput
                                                    id="insuranceplan"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editIPlan,
                                                        placeholder: profile.insuranceplan
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Monthly Premium</InputLabel>
                                                <CustomInput
                                                    // FIXME: Remove the above mentioned labelText when emitting values.
                                                    id="premium"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editPremium,
                                                        placeholder: "$" + profile.premium + ".00"
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Deductible</InputLabel>
                                                <CustomInput
                                                    id="deductible"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editDeductible,
                                                        placeholder: "$" + profile.deductible  + ".00",
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Co-Payments</InputLabel>
                                                <CustomInput
                                                    id="copayment"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editCopayment,
                                                        placeholder: "$" + profile.copayment + ".00",
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Out-of-Pocket Limit</InputLabel>
                                                <CustomInput
                                                    id="outofpocketlimit"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: editOutOfPocketLimit,
                                                        placeholder: "$" + profile.outofpocketlimit + ".00",
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



