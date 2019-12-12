import React, { useEffect, useState } from 'react';
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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { Link } from "react-router-dom";
import Logo2 from "../../assets/img/logo2.png";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(styles);

export default function SurveyResults(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [approvedBills, setApprovedBills] = useState([]);
    const [inProgressBills, setInProgressBills] = useState([]);
    const [deniedBills, setDeniedBills] = useState([]);

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

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + 'patient/claims', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                setApprovedBills(data.approvedClaims);
                setDeniedBills(data.deniedClaims);
                setInProgressBills(data.inProcessClaims);
            })
    }
    useEffect(() => { handleLoad() }, {})

    const style = {
        chatBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            marginLeft: '-40px',
            width: '220px'
        },
        subtitle:{
            marginTop: '0px',
            marginBottom: '30px',
            fontSize: '18px'
        },
        viewBtn: {
            marginTop: '20px',
            marginLeft: '-80px'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        altTextColor: {
            color: '#904199',
            marginTop: '-5px',
            marginBottom: '15px',
            fontWeight: '500'
        },
        suggestedPlan: {
            background: '#f9dbff',
            borderRadius: 5
        },
        bold: {
            fontWeight: 'bolder'
        },
        name:{
            fontWeight: 'bolder',
            fontSize: '25px'
        },
        card:{
            marginBottom: '-5px',
        },
        img:{
            marginRight: '0px',
            marginTop: '10px'
        }
    };

    return (
        <div>
            <Header
                color="white"
                brand={<img width="240" height="40" resizeMode="contain" src={Logo2} alt="Logo2" />}
                rightLinks={<SignedInHeaders />}
                fixed
                changeColorOnScroll={{
                    height: 0,
                    color: "white"
                }}
                {...rest} />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)} color={"info"}>
                <div style={style.bg}>
                    <div className={classes.container}>
                        <GridContainer justify="space-around" direction="row" color={"info"}>
                            <GridItem xs={10} sm={10} md={10} lg={10} color={"info"}>
                                <GridContainer color={"info"} justify="center">
                                    <GridItem xs={15} sm={15} md={15}>
                                        <br />
                                        <GridContainer justify="center">
                                            <Link to="/patient/dashboard">
                                                <Button
                                                    color="primary"
                                                >My Dashboard</Button>
                                            </Link>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem align="center">
                                                <h1><b>Distribution of Claims</b></h1>
                                            </GridItem>
                                            <GridItem align="center">
                                                <h3 style={style.subtitle}>Number of Claims Approved: <b>{approvedBills.length}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number of Claims In Progress: <b>{inProgressBills.length}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number of Claims Denied: <b>{deniedBills.length}</b></h3>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer color={"info"} justify="center">
                                    <GridItem xs={20} sm={20} md={20}>
                                        <GridContainer>
                                            <CustomTabs
                                                headerColor="primary"
                                                tabs={[
                                                    {
                                                        tabName: "Approved",
                                                        tabIcon: CheckIcon,
                                                        tabContent: (
                                                            <GridContainer>
                                                                <GridContainer justify="center">
                                                                    {approvedBills.map((item, index) => (
                                                                        <GridContainer justify="center">
                                                                            <GridContainer justify="center">
                                                                                <Card style={{ background: "#F8F8F8", width: "47rem", borderColor: "primary" }}>
                                                                                    <div style={{ width: "50rem", borderColor: "primary" }}>
                                                                                        <CardBody>
                                                                                            <GridContainer>
                                                                                                <GridItem xs={12} sm={12} md={10}>
                                                                                                    <h3 className={classes.cardTitle} style={style.name}><b>Appointment with {item.doctorName}</b></h3>
                                                                                                    <h5> <span style={style.altTextColor}>Date: </span>{item.displayDate}</h5>
                                                                                                    <h5> <span style={style.altTextColor}>Reason: </span>{item.reason}</h5>
                                                                                                    <h5> <span style={style.altTextColor}>Claim Amount: </span>{item.amountToBePaid}</h5>
                                                                                                    <h5> <span style={style.altTextColor}>Claim Status: </span><b>Approved</b></h5>
                                                                                                </GridItem>
                                                                                                <GridItem xs={12} sm={12} md={2}>
                                                                                                    <img align="right" width="170" height="170" resizeMode="contain" src={profiles[item.doctorName]} alt="Profile1" style={style.img}/>
                                                                                                    <Link to= {"/patient/doctor/" + btoa(item.doctorUsername)}>
                                                                                                        <Button color="primary" style={style.viewBtn}>
                                                                                                            View Doctor Profile
                                                                                                        </Button>
                                                                                                    </Link>
                                                                                                </GridItem>
                                                                                            </GridContainer>
                                                                                        </CardBody>
                                                                                    </div>
                                                                                </Card>
                                                                            </GridContainer>
                                                                        </GridContainer>
                                                                    ))}
                                                                    <GridItem>&nbsp;</GridItem>
                                                                </GridContainer>
                                                            </GridContainer>
                                                        )},
                                                    {
                                                        tabName: "In Progress",
                                                        tabIcon: MoreHorizIcon,
                                                        tabContent: (
                                                            <GridContainer justify="center">
                                                                {inProgressBills.map((item, index) => (
                                                                    <GridContainer justify="center">
                                                                        <GridContainer justify="center">
                                                                            <Card style={style.card}>
                                                                                <div style={{ width: "50rem", borderColor: "primary" }}>
                                                                                    <CardBody>
                                                                                        <GridContainer>
                                                                                            <GridItem xs={12} sm={12} md={10}>
                                                                                                <h3 className={classes.cardTitle} style={style.name}><b>Appointment with {item.doctorName}</b></h3>
                                                                                                <h5> <span style={style.altTextColor}>Date: </span>{item.displayDate}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Reason: </span>{item.reason}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Claim Amount: </span>{item.amountToBePaid}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Claim Status: </span><b>In Progress</b></h5>
                                                                                            </GridItem>

                                                                                            <GridItem xs={12} sm={12} md={2}>
                                                                                                <img align="right" width="170" height="170" resizeMode="contain" src={profiles[item.doctorName]} alt="Profile1" style={style.img}/>
                                                                                                <Link to= {"/patient/doctor/" + btoa(item.doctorUsername)}>
                                                                                                    <Button color="primary" style={style.viewBtn}>
                                                                                                        View Doctor Profile
                                                                                                    </Button>
                                                                                                </Link>
                                                                                            </GridItem>
                                                                                        </GridContainer>
                                                                                    </CardBody>
                                                                                </div>
                                                                            </Card>
                                                                        </GridContainer>
                                                                    </GridContainer>
                                                                ))}
                                                                <GridItem>&nbsp;</GridItem>
                                                            </GridContainer>
                                                        )},
                                                    {
                                                        tabName: "Denied",
                                                        tabIcon: CloseIcon,
                                                        tabContent: (
                                                            <GridContainer justify="center">
                                                                {deniedBills.map((item, index) => (
                                                                    <GridContainer justify="center">
                                                                        <GridContainer justify="center">
                                                                            <Card style={style.card}>
                                                                                <div style={{ width: "50rem", borderColor: "primary" }}>
                                                                                    <CardBody>
                                                                                        <GridContainer>
                                                                                            <GridItem xs={12} sm={12} md={10}>
                                                                                                <h3 className={classes.cardTitle} style={style.name}><b>Appointment with {item.doctorName}</b></h3>
                                                                                                <h5> <span style={style.altTextColor}>Date: </span>{item.displayDate}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Reason: </span>{item.reason}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Claim Amount: </span>{item.amountToBePaid}</h5>
                                                                                                <h5> <span style={style.altTextColor}>Claim Status: </span><b>Denied</b></h5>
                                                                                            </GridItem>
                                                                                            <GridItem xs={12} sm={12} md={2}>
                                                                                                <img align="right" width="170" height="170" resizeMode="contain" src={profiles[item.doctorName]} alt="Profile1" style={style.img}/>
                                                                                                <Link to= {"/insurance/patient/" + btoa(item.mDoctorUsername)}>
                                                                                                    <Button color="primary" style={style.viewBtn}>
                                                                                                        View Doctor Profile
                                                                                                    </Button>
                                                                                                </Link>
                                                                                            </GridItem>
                                                                                        </GridContainer>
                                                                                    </CardBody>
                                                                                </div>
                                                                            </Card>
                                                                        </GridContainer>
                                                                    </GridContainer>
                                                                ))}
                                                                <GridItem>&nbsp;</GridItem>
                                                            </GridContainer>
                                                        )},
                                                ]}/>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <br />
                    </div>
                </div>
            </div>
        </div >
    );
}
