import InputLabel from "@material-ui/core/InputLabel";
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
import Map from "views/Map/Map.js";
import SignedInHeaders from "views/SignedInHeader.js";
import { primaryColor } from "../../assets/jss/material-kit-react";
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({})
    const [address, setAddress] = useState([]);

    // Profile pictures
    const KaylaRamsey = require('../../assets/img/profilepic-11.png');
    const SoniaPratt = require('../../assets/img/profilepic-08.png');
    const TyeAlbarn = require('../../assets/img/profilepic-07.png');
    const VivekShresta = require('../../assets/img/profilepic-09.png');
    const DouglasRiley = require('../../assets/img/profilepic-13.png');
    const IshaqDunkley = require('../../assets/img/profilepic-10.png');
    const JenniferRoland = require('../../assets/img/profilepic-15.png');
    const ZackGainsbourg = require('../../assets/img/profilepic-14.png');

    const profiles = {
    'Kayla Ramsey': KaylaRamsey,
    'Sonia Pratt': SoniaPratt,
    'Tye Albarn': TyeAlbarn,
    'Vivek Shresta': VivekShresta,
    'Douglas Riley': DouglasRiley,
    'Ishaq Dunkley': IshaqDunkley,
    'Jennifer Roland': JenniferRoland,
    'Zack Gainsbourg': ZackGainsbourg
    }

    const ipusername = window.location.href.split('/')[5]

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + "patient" + '/insurance/' + ipusername, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                address.push(data.address)
                setAddress(address)
                setProfile(data)
            })
    }
    useEffect(() => { handleLoad() }, {})

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
                            <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                                <Button color="primary">My Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={5} sm={5} md={8}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h2 className={classes.cardTitleWhite}>{profile.name}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <img align="left" width="170" height="170" resizeMode="contain" src={profiles[profile.name]} alt="Profile1" />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Insurance Company</InputLabel>
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
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Office Contact Number</InputLabel>
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
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Office Address</InputLabel>
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
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={5} sm={5} md={5}>
                                {address.length > 0 ? (
                                    <Map locations={address} zoom={4}/>
                                ) : (
                                        <p />
                                    )}
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
