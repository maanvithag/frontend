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

const useStyles = makeStyles(styles);

export default function SurveyResults(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [insurancePlans, setInsurancePlans] = useState([
        {name: "patient 1", reason: "reason 1", amount: "amount 1", status: "some status 1"},
        {name: "patient 2", reason: "reason 2", amount: "amount 2", status: "some status 2"},
        {name: "patient 3", reason: "reason 3", amount: "amount 3", status: "some status 3"},
        {name: "patient 4", reason: "reason 4", amount: "amount 4", status: "some status 4"},
        {name: "patient 5", reason: "reason 5", amount: "amount 5", status: "some status 5"}
    ]);

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + 'insurance/claims', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                // setInsurancePlans(data)
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
        selectBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            width: '190px'
        },
        viewBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            marginLeft: '-38px',
            width: '190px'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        altTextColor: {
            color: '#904199',
            marginTop: '-5px',
            marginBottom: '15px'
        },
        suggestedPlan: {
            background: '#f9dbff',
            borderRadius: 5
        },
        bold: {
            fontWeight: 'bolder'
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
                                            <Link to="/insurance/dashboard">
                                                <Button
                                                    color="primary"
                                                >My Dashboard</Button>
                                            </Link>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                        <h2><b>Distribution of Claims</b></h2><br/>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                        <h3>Approved: In Progress: Denied:</h3>
                                        {insurancePlans.map((item, index) => (
                                        <Card style={{ width: "40rem", borderColor: "primary" }}>
                                            <CardBody>
                                                <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                <h3 className={classes.cardTitle}><b>{item.name}</b></h3>
                                                </GridItem>
                                                <GridItem align="right" xs={5} sm={5} md={1}>
                                                {/* <Link to= {"/insurance/patient/" + btoa(item.username)}>  */}
                                                    <Button color="primary" align="right">
                                                        View Patient
                                                    </Button>
                                                {/* </Link> */}
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6} align="left">
                                                    <h5 style={style.altTextColor}>Reason: {item.reason}</h5>
                                                    <h5 style={style.altTextColor}>Claim amount: {item.amount}</h5>
                                                    <h5 style={style.altTextColor}>Claim Status: {item.status}</h5>
                                                </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                        </Card>))}
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
