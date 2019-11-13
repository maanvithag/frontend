import React, { useState } from 'react';
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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import BookAppointment from "views/BookAppointment/AppointmentConfirmation.js";
import Calendar from 'react-calendar';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const [modal, setModal] = React.useState(false);
    const modalClasses = useModalStyles();
    const productClasses = useProductStyles();  
    const classes = useStyles();
    const { ...rest } = props;
    const [date, setDate] = useState(new Date());
    const [timeslots, setTimeslots] = useState([]);
    const [ts, setTs] = useState("");
    const [createAppointment, setCreateAppointment] = useState({
        isAppointmentCreated: false
    })
    const handleChange = event => {
        setTs(event.target.value);
    };

    console.log(ts);

    const doctorusername = window.location.href.split('/')[6]

    const handleTimeSlots = (event) => {
        fetch(window.localStorage.getItem("baseURL") + '/doctor/time/' + doctorusername, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                date: date.toLocaleDateString
            })
        }).then(response => response.json())
        .then(data => {
            setTimeslots(data.TimeSlots)
        })
    }

    const handleCreateAppointments = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/createappointments', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                doctorusername: doctorusername,
                time: ts,
                date: date.toLocaleDateString
            })
        }).then(response => response.json())
        .then(data => {
            setCreateAppointment(data.isAppointmentCreated)
        })
    }

    console.log(ts)
    

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
                            <Button color="primary">Return to my Dashboard</Button>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Book your appointment</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer style={{ display: 'flex', flexDirection: 'row' }} justify="center">
                                            <GridItem xs={12} sm={12} md={6}>
                                            <Calendar
                                                onChange={(date) => {setDate(date); handleTimeSlots();}}
                                                value={date}
                                            />  <br/>
                                            <h4> Please select a time: </h4>
                                            <CustomDropdown
                                                buttonProps={{
                                                    color: "primary"
                                                }}
                                                value={ts}
                                                onChange={handleChange}
                                                dropdownList={timeslots}
                                            /> <br/>
                                            {/* <BookAppointment/> */}
                                            <div>
                                            <Button color="primary" onClick={(event) => {setModal(true); handleCreateAppointments();}}>
                                                Book Appointment
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
                                                <h4 className={modalClasses.modalTitle}>Appointment Confirmation</h4>
                                                </DialogTitle>
                                                <DialogContent
                                                id="modal-slide-description"
                                                className={modalClasses.modalBody}>
                                                <div className={productClasses.section} style={{padding: 0}}>
                                                Your appointment is confirmed. Please check your email for an confirmation receipt.
                                                </div>
                                                <Link to="/patient/dashboard">
                                                    <Button color="primary">
                                                    Okay
                                                    </Button>
                                                </Link>
                                                </DialogContent>
                                            </Dialog>
                                            </div>
                                            </GridItem>
                                        </GridContainer> <br/>
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

