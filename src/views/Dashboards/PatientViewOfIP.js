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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";

import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);
const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({})
    const [address, setAddress] = useState([]);
    const [modal, setModal] = React.useState(false);
    const productClasses = useProductStyles();
    const modalClasses = useModalStyles();
    const [insurancePlans, setInsurancePlans] = useState([]);

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
                setInsurancePlans(data.insurancePlans)
            })
    }
    useEffect(() => { handleLoad() }, {})

    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        plansBg: {
            background: 'linear-gradient(0deg, #fcecff 30%, #f5f5f5 90%)',
            borderRadius: 5
        },
        chatBtn: {
            color: 'white',
            textTransform: 'initial',
            fontSize: 'small',
            marginTop: '20px',
            marginLeft: '-60px',
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
            marginLeft: '-45px',
            width: '190px'
        }
    };

    function handlePlanSelection(plan) {
        console.log(JSON.stringify(profile))
        fetch(window.localStorage.getItem("baseURL") + 'patient/insuranceplan', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                insuranceProviderUserName: profile.insuranceProviderUserName,
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
                                        <h2 className={classes.cardTitleWhite}>{profile.firstName + " " + profile.lastName}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <img align="left" width="170" height="170" resizeMode="contain" src={profiles[profile.name]} alt="Profile1" />
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={56}>
                                                {address.length > 0 ? (
                                                    <Map locations={address} zoom={4}/>
                                                ) : (
                                                    <p />
                                                )}
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
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
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <div style={style.plansBg}>
                                        <CardHeader color="primary">
                                            <h2 className={classes.cardTitleWhite}>Plans Provided</h2>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer justify="center">
                                                {insurancePlans.map((item, index) => (
                                                <Card style={{ width: "50rem", borderColor: "primary" }}>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <h3 className={classes.cardTitle}><b>{item.mName}</b></h3>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <h5 style={style.altTextColor}><span style={style.bold}>Provided by </span><b>{item.mProvider}</b></h5>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> <b>Monthly Premium: </b>${item.premium}.00 </p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> <b>Deductible:</b> ${item.deductible}.00 </p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> <b>Co-Payments: </b>${item.coPayment}.00</p>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={6}>
                                                                <p> <b>Out-of-Pocket Limit: </b>${item.annualOutOfPocketLimit}.00 </p>
                                                            </GridItem>
                                                        </GridContainer>
                                                        <GridContainer justify="center">
                                                                <GridItem xs={13} sm={12} md={4}>
                                                                    <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + profile.firstName.toLowerCase() + profile.lastName.toLowerCase()}>
                                                                        <Button color="primary" style={style.chatBtn}> Chat with Me</Button>
                                                                    </Link>
                                                                </GridItem>
                                                            <GridItem xs={13} sm={12} md={3}>
                                                                <Link to={"/patient/survey/results/viewplan"}>
                                                                    <Button color="primary" style={style.viewBtn}>View this Plan</Button>{/*<Button color="primary" style={style.viewBtn} value={item.mName} onClick={() => setPlanName(item.mName)}>View this Plan</Button>*/}
                                                                </Link>
                                                            </GridItem>
                                                            <GridItem xs={13} sm={12} md={3}>
                                                                {/* <Button color="primary" style={style.selectBtn}> */}
                                                                <Button color="primary" style={style.selectBtn} value={item.mName} onClick={() => { setModal(true); handlePlanSelection(item.mName); }}>
                                                                    Select Plan
                                                                </Button>
                                                                <Dialog
                                                                    modalClasses={{
                                                                        root: modalClasses.center,
                                                                        paper: modalClasses.modal
                                                                    }}
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
                                                                        <div className={productClasses.section} style={{ padding: 0 }}>
                                                                            <span style={style.altTextColor}><b>Congratulations!</b></span> You have selected your new plan. Your profile has been updated with your new insurance information.
                                                                        </div>
                                                                        <br />
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
                                                </Card>))}
                                            </GridContainer>
                                        </CardBody>
                                    </div>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

