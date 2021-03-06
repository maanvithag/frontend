import React from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
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
import Slide from "@material-ui/core/Slide";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import { useState, useEffect } from 'react';

import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({});
    const [address, setAddress] = useState([]);

    // Profile pictures
    const MassimoRossi = require('../../assets/img/profilepic-02.png');
    const SamanthaJoson = require('../../assets/img/profilepic-06.png');
    const PrestonLannister = require('../../assets/img/profilepic-05.png');
    const JaimeMoore = require('../../assets/img/profilepic-03.png');
    const VivekBandaru = require('../../assets/img/profilepic-17.png');
    const KristenNash = require('../../assets/img/profilepic-01.png');

    const profiles = {
    'Massimo Rossi': MassimoRossi,
    'Samantha Joson': SamanthaJoson,
    'Preston Lannister': PrestonLannister,
    'Jaime Moore': JaimeMoore,
    'Vivek Bandaru': VivekBandaru,
    'Kristen Nash': KristenNash
    }

    const doctorusername = window.location.href.split('/')[5]

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + "patient" + '/doctor/' + doctorusername, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setProfile(data)

            })
    };
    useEffect(() => {handleLoad()}, {});

    const style = {
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
        space:{
            marginTop:'0px'
        },
        img:{
            marginLeft:'65px',
            marginTop: '20px'
        },
        title:{
            fontSize: '35px',
            fontWeight: '400',
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
                    <div className={classes.container}> <br/>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={7} align="center">
                                <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                                    <Button color="primary" style={style.btn}><b>My Dashboard</b></Button>
                                </Link>
                            </GridItem>
                            <GridItem>
                                <br/>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}> 
                                <Card>
                                    <CardHeader color="primary">
                                        <h2 className={classes.cardTitleWhite} style={style.title}>{profile.name}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>Education</InputLabel>
                                                    <CustomInput
                                                        id="education"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            multiline:true
                                                        }}
                                                        inputProps={{
                                                            disabled: true,
                                                            placeholder: profile.education,
                                                            multiline:true
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>Hospital</InputLabel>
                                                    <CustomInput
                                                        id="hospital"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            multiline:true
                                                        }}
                                                        inputProps={{
                                                            disabled: true,
                                                            placeholder: profile.hospital,
                                                            multiline:true
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <img align="left" width="170" height="170" resizeMode="contain" src={profiles[profile.name]} alt="Profile1" style={style.img}/>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>




                                                <GridItem xs={12} sm={12} md={12} style={style.space}> &nbsp; </GridItem>


                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>Specialization</InputLabel>
                                                    <CustomInput
                                                        id="specialization"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            disabled: true,
                                                            placeholder: profile.specialization
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>Address</InputLabel>
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
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>Contact Number</InputLabel>
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
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <InputLabel style={style.label}>About Me</InputLabel>
                                                    <CustomInput
                                                        id="doctor-bio"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            multiline: true,
                                                            rows: 5,
                                                            disabled: true,
                                                            placeholder: profile.biosummary
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            {/* <GridItem xs={5} sm={5} md={5}>
                                <Map/>
                                <br/><br/>
                            </GridItem> */}
                        </GridContainer>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}

