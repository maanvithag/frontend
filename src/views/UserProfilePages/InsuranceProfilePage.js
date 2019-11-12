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
import SignedInHeaders from "views/SignedInHeader.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const [editEmail, setEditEmail] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editPhone, setEditPhone] = useState(true);
    const { ...rest } = props;
    const [profile, setProfile] = useState({});

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
                            <Link to="/insurance/dashboard">
                                <Button color="primary">Return to my Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Personal Information
                                           </h4>
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
                                                    labelText={profile.email}
                                                    id="email-address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.email,
                                                        disabled: editEmail,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <i onClick={() => setEditEmail(false)}
                                                                    className={"fas fa-edit"}
                                                                />
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
                                                    labelText={profile.lastname}
                                                    id="last-name"
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
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                                <br></br>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Company Information</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.company}
                                                    id="company"
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
                                                    id="phone-number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.phonenumber,
                                                        disabled: editPhone,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <i onClick={() => setEditPhone(false)}
                                                                    className={"fas fa-edit"}
                                                                />
                                                                {editPhone ? "" : <i onClick={() => setEditPhone(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
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
                                                                <i onClick={() => setEditAddress(false)}
                                                                    className={"fas fa-edit"}
                                                                />
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

