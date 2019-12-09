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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Logo2 from "../../assets/img/logo2.png";

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
    const [keyword, setKeyword] = React.useState('none');
    const [ts, setTs] = useState("None");
    const [reason, setReason] = useState("")
    const [createAppointment, setCreateAppointment] = useState({
        isAppointmentCreated: false
    })
    const handleChange = event => {
        setTs(event.target.value);
    };

    const doctorusername = window.location.href.split('/')[6]

    const handleTimeSlots = (dateObj) => {
        fetch(window.localStorage.getItem("baseURL") + '/doctor/time/' + doctorusername, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                date: dateObj.toLocaleDateString()
            })
        }).then(response => response.json())
        .then(data => {
            setTimeslots(data.TimeSlots)
        })
    }

    const handleCreateAppointments = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/createappointments', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                doctorusername: doctorusername,
                time: ts,
                date: date.toLocaleDateString(),
                reason: reason
            })
        }).then(response => response.json())
        .then(data => {
            setCreateAppointment(data.isAppointmentCreated)
        })
    };

    function handleReasonChange(event) {
        setReason(event.target.value)
    }

    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        drop: {
            marginTop: '20px',
            marginBottom: '10px'
        },
        pushOff:{
            marginTop: '30px',
            marginRight: '30px',
            marginBottom: '10px'

        },
        calendar:{
            marginTop: '30px'
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
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Book Your Appointment</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer style={{ display: 'flex', flexDirection: 'row' }} justify="center">
                                            <GridItem xs={12} sm={12} md={6}>
                                                <GridContainer justify="center">
                                                    <p>&nbsp;</p>
                                            <Calendar
                                                onChange={(date) => {setDate(date); handleTimeSlots(date);}}
                                                value={date}
                                            />  <br/>
                                            <h5 style={style.pushOff}> Please select a time</h5>
                                                {/* <InputLabel id="select-timeslot">Name</InputLabel> */}
                                                    <Select
                                                        labelId="select-timeslot"
                                                        id="select-timeslot"
                                                        onChange={handleChange}
                                                        value={ts}
                                                        defaultValue={"None"}
                                                        style={style.drop}
                                                    >
                                                        <MenuItem value="None"> <em>None</em> </MenuItem>
                                                        {timeslots.map((item, index) => (
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        ))}
                                                    </Select><br />
                                                    <CustomInput
                                                        id="reason"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: handleReasonChange,
                                                            placeholder: "Enter reason for vist",
                                                        }}
                                                    />
                                            <Button color="primary" onClick={(event) => {setModal(true); handleCreateAppointments();}}>
                                                Book Appointment
                                            </Button>
                                                </GridContainer>
                                                <div>
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
                                                    <h3 className={modalClasses.modalTitle}><b>Appointment Confirmation</b></h3>
                                                </DialogTitle>
                                                <DialogContent
                                                id="modal-slide-description"
                                                className={modalClasses.modalBody}>
                                                <div className={productClasses.section} style={{padding: 0}}>
                                                Your appointment is confirmed. Please check your email for an confirmation receipt.
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

