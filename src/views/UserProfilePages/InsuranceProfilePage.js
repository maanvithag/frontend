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
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import InputLabel from "@material-ui/core/InputLabel";
import CardFooter from 'components/Card/CardFooter';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const [editEmail, setEditEmail] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editPhone, setEditPhone] = useState(true);
    const { ...rest } = props;
    const [profile, setProfile] = useState({});
    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        }
    };

    const [emailaddress, setEmailAddress] = useState(true)
    const [phonenumber, setPhoneNumber] = useState(true)
    const [address, setAddress] = useState(true)

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setProfile(data)
                setEmailAddress("")
                setPhoneNumber("")
                setAddress("")
            })
    }
    useEffect(() => {handleLoad()},[])

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value)
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    const saveUserInfoOnServer = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile/update', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                emailaddress: emailaddress,
                address: address,
                phonenumber: phonenumber
            })
          }).then(response => response.json())
    }

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
                            <Link to="/insurance/dashboard">
                                <Button 
                                onClick={saveUserInfoOnServer}
                                color="primary"
                                >Return to my Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
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
                                                    id="email-address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleEmailAddressChange,
                                                        placeholder: profile.email,
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
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Company</InputLabel>
                                                <CustomInput
                                                    id="company"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.company
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Office Contact Number</InputLabel>
                                                <CustomInput
                                                    id="phone-number"
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
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Office Address</InputLabel>
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


