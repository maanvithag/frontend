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
import Close from "@material-ui/icons/Close";


import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";

import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Slide from "@material-ui/core/Slide";
import Logo2 from "../../assets/img/logo2.png";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);
const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);

export default function SurveyResults(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [modal, setModal] = React.useState(false);
    const productClasses = useProductStyles();
    const modalClasses = useModalStyles();
    const [insurancePlans, setInsurancePlans] = useState([]);

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + 'patient/survey/results', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({

            })
        }).then(response => response.json())
            .then(data => {
                setInsurancePlans(data)
            })
    }
    useEffect(() => { handleLoad() }, {})

    function handlePlanSelection(plan) {
        fetch(window.localStorage.getItem("baseURL") + 'patient/insuranceplan', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                planName: plan
            })
        }).then(response => response.json())
            .then(data => {
                //
            })
    };

    function setPlanName(plan) {
        window.localStorage.setItem("insurancePlan", plan)
    }

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
                                            <Link to="/patient/dashboard">
                                                <Button
                                                    color="primary"
                                                >My Dashboard</Button>
                                            </Link>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                        <h2><b>Total of claims that were approved:</b></h2>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                        <Card style={{ width: "40rem", borderColor: "primary" }}>
                                            <CardBody>
                                                <h3 className={classes.cardTitle}><b>Patient Name</b></h3>
                                                <h5 style={style.altTextColor}>Reason</h5>
                                                <h5 style={style.altTextColor}>Claim amount</h5>
                                            </CardBody>
                                        </Card>
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
