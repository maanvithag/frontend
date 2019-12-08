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
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);
const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);

export default function ViewPlan(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [modal, setModal] = React.useState(false);
    const productClasses = useProductStyles();
    const modalClasses = useModalStyles();
    const [planInfo, setPlanInfo] = useState({})

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/insuranceplan/' + btoa(window.localStorage.getItem("insurancePlan")), {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                setPlanInfo(data)
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

    function description() {
        if (1===1){//(item.mLevel === "bronze") {
            return "The bronze plan is our most affordable plan that is designed to provide enough coverage for any unexpected hospital visits.";
        } else if(1===1){//(item.mLevel === "silver") {
            return "The silver plan is one of our affordable plans that is a good base plan for patients who are not expecting to make a lot of hospital visits, saving you money.";
        } else if(1===1){//(item.mLevel === "gold") {
        return "The gold plan is one of our premium plans that allows patients to make more frequent visits to the doctor while saving them money.";
        } else {
            return "The platinum plan is one of our premium plans that allows patients to make frequent visits to the doctor while saving them money. The higher premium allows us to cover more of their medical expenses.";
        }
    }

    const style = {
        chatBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            width: '190px',
            marginLeft: '130px'
        },
        selectBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            width: '150px',
            marginLeft: '35px'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        altTextColor:{
            color: '#904199',
            marginTop: '-10px'
        },
        suggestedPlan:{
            background: '#f9dbff',
            borderRadius: 5
        },
        bold:{
            fontWeight:'bolder'
        },
        para:{
            fontSize: "16px"

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
                {...rest} />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)} color={"info"}>
                <div style={style.bg}>
                    <div className={classes.container}>
                        <GridContainer justify="space-around" direction="row" color={"info"}>
                            <GridItem xs={8} sm={8} md={8} lg={8} color={"info"}>
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
                                        <GridContainer justify="center"><h2><b>{planInfo.mName}</b></h2></GridContainer>
                                        <GridContainer justify="center">
                                            <h3 style={style.altTextColor}>Provided by <b>{planInfo.mProvider}</b></h3>
                                        </GridContainer>
                                        <div>
                                            <br />
                                        <p style={style.para}> The {planInfo.mName} provided by {planInfo.mProvider} is {planInfo.mProvider}’s {planInfo.level} plan. {description()} </p>
                                        <p style={style.para}> Here are some statistics about our plan: </p>
                                            <List>
                                                <ListItem style={style.para}> <b>Monthly premium</b>: ${planInfo.premium}.00</ListItem>
                                                <ListItem style={style.para}> <b>Annual Deductible</b>: ${planInfo.deductible}.00</ListItem>
                                                <ListItem style={style.para}> <b>Co-Payments</b>: ${planInfo.coPayment} .00 per visit</ListItem>
                                                <ListItem style={style.para}> <b>Annual Out-of-Pocket Limit</b>: ${planInfo.annualOutOfPocketLimit}.00</ListItem>
                                            </List>
                                        <p style={style.para}> If you would like to hear more information about this plan, we recommend
                                            talking to one of our insurance providers using the button below. </p>
                                        </div>
                                        <br />
                                        <GridContainer justify="center">
                                        {Object.keys(planInfo).length === 0 && planInfo.constructor === Object ? (
                                            <GridItem xs={13} sm={12} md={6}>
                                                <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/thisneverexecutes"}>
                                                    <Button color="primary" style={style.chatBtn}> Chat with a Provider</Button>
                                                </Link>
                                            </GridItem>
                                        ) : (
                                                <GridItem xs={13} sm={12} md={6}>
                                                    <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + planInfo.firstNameOfCreator.toLowerCase() + planInfo.lastNameOfCreator.toLowerCase()}>
                                                        <Button color="primary" style={style.chatBtn}> Chat with a Provider</Button>
                                                    </Link>
                                                </GridItem>
                                            )}

                                            {/* <GridItem xs={13} sm={12} md={6}>
                                                <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + planInfo.firstNameOfCreator.toLowerCase() + planInfo.lastNameOfCreator.toLowerCase()}> {/* TODO - add insurance name }
                                                    <Button color="primary" style={style.chatBtn}> Chat with a Provider</Button>
                                                </Link>
                                            </GridItem> */}
                                            <GridItem xs={13} sm={12} md={6}>
                                                <Button color="primary" style={style.selectBtn} value={planInfo.mName} onClick={(event) => {setModal(true); handlePlanSelection(planInfo.mName);}}>
                                                    Select Plan
                                                </Button>
                                                <Dialog
                                                    modalClasses={{
                                                        root: modalClasses.center,
                                                        paper: modalClasses.modal}}
                                                    open={modal}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={() => setModal(false)}
                                                    aria-labelledby="modal-slide-title"
                                                    aria-describedby="modal-slide-description">
                                                    <DialogTitle
                                                        id="classic-modal-slide-title"
                                                        disableTypography
                                                        className={modalClasses.modalHeader}>
                                                        <IconButton
                                                            className={modalClasses.modalCloseButton}
                                                            key="close"
                                                            aria-label="Close"
                                                            color="inherit"
                                                            onClick={() => setModal(false)}>
                                                            <Close className={modalClasses.modalClose} />
                                                        </IconButton>
                                                        <h3 className={modalClasses.modalTitle}><b>Insurance Plan Selection Confirmation</b></h3>
                                                    </DialogTitle>
                                                    <DialogContent
                                                        id="modal-slide-description"
                                                        className={modalClasses.modalBody}>
                                                        <div className={productClasses.section} style={{padding: 0}}>
                                                            <span style={style.altTextColor}><b>Congratulations!</b></span> You have selected your new plan. Your profile has been updated with your new insurance information.
                                                        </div>
                                                        <br/>
                                                        <GridContainer justify="center">
                                                            <Link to="/patient/dashboard">
                                                                <Button color="primary">
                                                                    Okay
                                                                </Button>
                                                            </Link>
                                                        </GridContainer>
                                                    </DialogContent>
                                                </Dialog>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                                <br />
                            </GridItem>
                        </GridContainer>
                        <br/>
                    </div>
                </div>
            </div>
        </div >
    );
}
