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
    const searchItem = window.localStorage.getItem("searchItem");
    const searchUserType = window.localStorage.getItem("searchUserType");
    const [searchResults, setSearchResults] = useState([]);
    const [cities, setCities] = useState([]);

    const handlePlanSelection = (event) => {
        fetch(window.localStorage.getItem("baseURL") + '/survey/results', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                // TODO-Not sure how to send data to back end
                //name: name,
                //premium: premium,
                //provider: provider,
                //outofpocketlimit: outofpocketlimit,
                //copayment: copayment,
                //deductible: deductible,
                //level: level
            })
        }).then(response => response.json())
            .then(data => {
                // note - I kept this from the book appointment handle function to try to figure out how to handle the data
                // setCreateAppointment(data.isAppointmentCreated)
            })
    };

    // Until and unless the searchItem parameter is changed, the useEffect will not be executed. If this is removed, the useEffect will be called
    // infinite number of times.
    useEffect(() => {
        //Fetching the user data
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("searchUserType") + '/search?query=' + localStorage.getItem("searchItem"), {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                setSearchResults(data)
            })

        //Fetching the locations
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("searchUserType") + '/search/locations?query=' + localStorage.getItem("searchItem"), {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                setCities(data)
            })

    }, [searchItem]);

    function condHiding() {
        if ((window.localStorage.getItem("searchUserType") === "doctor")
            && (window.localStorage.getItem("userType") === "patient")) {
            return true;
        } else {
            return false;
        }
    } //window.localStorage.getItem("userType")

    var caption;
    if (searchUserType === "doctor") {
        caption = "doctors";
    } else caption = "insurance providers";
    const style = {
        chatBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            width: '285px'
        },
        selectBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            width: '185px'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        altTextColor:{
            color: '#904199',
            marginTop: '-5px',
            marginBottom: '15px'
        },
        suggestedPlan:{
            background: '#f9dbff',
            borderRadius: 5
        },
        bold:{
            fontWeight:'bolder'
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
                                                >Return to my Dashboard</Button>
                                            </Link>
                                        </GridContainer>
                                        <h2><b> Here is our recommended plan for you! </b></h2>
                                        <h5>We've included other recommendations below it as well to provide you with a variety of options.</h5>
                                        <GridContainer justify="center">
                                        {searchResults.map((item, index) => (
                                            <Card style={{ width: "38rem", borderColor: "primary" }}>
                                                {index===0 && (<div style={style.suggestedPlan}>
                                                    <CardBody style={style.suggestedPlan}>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <h3 className={classes.cardTitle}><b>{item.mName}</b></h3>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <h5 style={style.altTextColor}><span style={style.bold}>Provided by </span><b>{item.mCompany}</b></h5>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> Monthly Premium: {item.mPremium}/month </p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> Deductible: {item.mDeductible} </p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> Co-Payments: {item.mCopayment} </p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> Out-of-Pocket Limit: {item.mOutOfPocket} </p>
                                                            </GridItem>
                                                        </GridContainer>
                                                        <GridContainer justify="center">
                                                            <GridItem xs={13} sm={12} md={7}>
                                                                <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mFirstName.toLowerCase() + item.mLastName.toLowerCase()}>
                                                                    <Button color="primary" style={style.chatBtn}> Chat with an Insurance Provider</Button>
                                                                </Link>
                                                            </GridItem>
                                                            <GridItem xs={13} sm={12} md={5}>
                                                                <Button color="primary" style={style.selectBtn} onClick={(event) => {setModal(true); handlePlanSelection();}}>
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
                                                    </CardBody>
                                                </div>)}

                                                    {index!==0 && (<div>
                                                        <CardBody>
                                                            <GridContainer>
                                                                <GridItem xs={12} sm={12} md={12}>
                                                                    <h3 className={classes.cardTitle}><b>{item.mName}</b></h3>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} md={12}>
                                                                    <h5 style={style.altTextColor}><span style={style.bold}>Provided by </span><b>{item.mCompany}</b></h5>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} md={6}>
                                                                    <p> Monthly Premium: {item.mPremium}/month </p>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} md={6}>
                                                                    <p> Deductible: {item.mDeductible} </p>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} md={6}>
                                                                    <p> Co-Payments: {item.mCopayment} </p>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} md={6}>
                                                                    <p> Out-of-Pocket Limit: {item.mOutOfPocket} </p>
                                                                </GridItem>
                                                            </GridContainer>
                                                            <GridContainer justify="center">
                                                                <GridItem xs={13} sm={12} md={7}>
                                                                    <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mFirstName.toLowerCase() + item.mLastName.toLowerCase()}>
                                                                        <Button color="primary" style={style.chatBtn}> Chat with an Insurance Provider</Button>
                                                                    </Link>
                                                                </GridItem>
                                                                <GridItem xs={13} sm={12} md={5}>
                                                                    <Button color="primary" style={style.selectBtn} onClick={(event) => {setModal(true); handlePlanSelection();}}>
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
                                                        </CardBody>
                                                </div>)}

                                            </Card>))}
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <br/>
                    </div>
                </div>
            </div>
        </div >
    );
}
