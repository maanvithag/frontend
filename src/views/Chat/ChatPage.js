// import React from 'react';
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
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
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
                            <Link to="/insurance/dashboard">
                                <Button 
                                color="primary"
                                >Return to my Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardBody>           
                                        <p>Chat Page under Development!</p>
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
