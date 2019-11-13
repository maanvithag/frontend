import React from 'react';
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import InputLabel from "@material-ui/core/InputLabel";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import StarRatings from 'react-star-ratings';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {primaryColor} from "../../assets/jss/material-kit-react";
import { useState, useEffect } from 'react';
import AddDoctorReview from "views/Dashboards/AddDoctorReview.js";

import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [profile, setProfile] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState([]);
    const [modal, setModal] = React.useState(false);
    const modalClasses = useModalStyles();
    const productClasses = useProductStyles();
    const [value, setValue] = React.useState('1');
    const [addreview, setAddReview] = useState({
        rating: "",
        review: "",
        isReviewAdded: false
    })
  
    const handleChange = event => {
      setValue(event.target.value);
    };  

    const doctorusername = window.location.href.split('/')[5]

    const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/doctor/' + doctorusername, {
        method : 'post',
        credentials: 'include',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
        setProfile(data)
        setReviews(data.reviews)
        setRating(Math.round(data.totalrating * 10) / 10)
    })
    }
    useEffect(() => {handleLoad()}, {})

    const handleAddReview = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/doctor/' + doctorusername, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                rating: addreview.rating,
                review: addreview.review,
              })
        }).then(response => response.json())
        .then(data => {
            setAddReview(data.isReviewAdded)
        })
    }
    useEffect(() => {handleLoad()}, {})
    
    console.log(profile);

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
                            <Link to="/patient/dashboard">
                            <Button color="primary">Return to Dashboard</Button>
                            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to= {"/patient/doctor/bookappointment/" + doctorusername}>
                                <Button color="primary">
                                Book Appointment
                                </Button>
                            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <AddDoctorReview/> */}
                            <div>
                            <Button color="primary" onClick={() => setModal(true)}>
                                Leave a Review
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
                                <h3 className={modalClasses.modalTitle}>Leave a Review</h3>
                                </DialogTitle>
                                <DialogContent
                                id="modal-slide-description"
                                className={modalClasses.modalBody}>
                                <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                                <FormControlLabel
                                    value="1" control={<Radio color="primary" />} label="1"/>
                                <FormControlLabel
                                    value="2" control={<Radio color="primary" />} label="2"/>
                                <FormControlLabel
                                    value="3" control={<Radio color="primary" />} label="3"/>
                                <FormControlLabel
                                    value="4" control={<Radio color="primary" />} label="4"/>
                                <FormControlLabel
                                    value="5" control={<Radio color="primary" />} label="5"/>
                                </RadioGroup>
                                <CustomInput
                                labelText="Title"
                                id="rating"
                                formControlProps={{
                                    fullWidth: true}}/>
                                <CustomInput
                                labelText="Please write your review here"
                                id="medical-info"
                                formControlProps={{
                                    fullWidth: true}}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,}}/> <br></br> <br></br>
                                <div className={productClasses.section} style={{padding: 0}}>
                                Thank you for taking the time to review.
                                </div> <br></br>
                                <Link to="/dashboard2"> 
                                    <Button color="primary" onClick={(event) => {setModal(false); handleAddReview();}}>
                                    Submit Review
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Link>
                                </DialogContent>
                            </Dialog>
                            </div>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>{profile.name}</h4>
                                    </CardHeader>
                                    <CardBody>
                                    <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Personal Information</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.name}
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
                                                    labelText={profile.education}
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Hospital</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={profile.hospital}
                                                    id="hospital"
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
                                                    labelText={profile.specialization}
                                                    id="specialization"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={profile.address}
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={profile.phonenumber}
                                                    id="phone-number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                      }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>About Me</InputLabel>
                                                <CustomInput
                                                    labelText={profile.biosummary}
                                                    id="doctor-bio"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <CardHeader color="primary">
                                                <h4 className={classes.cardTitleWhite}>Average Rating: {rating}</h4>
                                            </CardHeader>
                                            <CardBody>
                                            {reviews.map((item, index) => (<Card style={{borderColor: "primary"}}>
                                                <CardBody>
                                                <StarRatings
                                                        rating={item.rating}
                                                        starDimension="20px"
                                                        starSpacing="5px"
                                                        starRatedColor="orange"
                                                    />
                                                    {/* <p>Rating: {item.rating}</p> */}
                                                    <p>Review: {item.review}</p>
                                                </CardBody>
                                                </Card>))}
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}

