import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slide from "@material-ui/core/Slide";
// @material-ui/core components
// @material-ui/icons
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
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
import StarRatings from 'react-star-ratings';

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
        isReviewAdded: false
    })
    const [addreviewRating, setAddReviewRating] = useState();
    const [addreviewReview, setAddReviewReview] = useState();
    const [address, setAddress] = useState([]);

    const handleChange = event => {
        setValue(event.target.value);
    };

    const doctorusername = window.location.href.split('/')[5]

    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/doctor/' + doctorusername, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }).then(response => response.json())
            .then(data => {
                address.push(data.address)
                setAddress(address)
                setProfile(data)
                setReviews(data.reviews)
                setRating(Math.round(data.totalrating * 10) / 10)
            })
    }
    useEffect(() => { handleLoad() }, {})

    const handleAddReview = (event) => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/doctor/' + doctorusername, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                rating: value,
                review: event.review,
            })
        }).then(response => response.json())
            .then(data => {
                setAddReview(data.isReviewAdded)
            })
    }
    useEffect(() => { handleLoad() }, {})

    const handleAddReviewRating = (event) => {
        setAddReviewRating(event.target.value)
    };

    const handleAddReviewReview = (event) => {
        setAddReviewReview(event.target.value)
    };

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
                <div style={style.bg}>
                    <div className={classes.container}>
                        <br></br>
                        <GridContainer justify="center">
                            <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                                <Button color="primary">Return to Dashboard</Button>
                            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to={"/patient/doctor/bookappointment/" + doctorusername}>
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
                                        <h3 className={modalClasses.modalTitle}>Leave a Review</h3>
                                    </DialogTitle>
                                    <DialogContent
                                        id="modal-slide-description"
                                        className={modalClasses.modalBody}>
                                        <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                                            <FormControlLabel
                                                value="1" control={<Radio color="primary" />} label="1" />
                                            <FormControlLabel
                                                value="2" control={<Radio color="primary" />} label="2" />
                                            <FormControlLabel
                                                value="3" control={<Radio color="primary" />} label="3" />
                                            <FormControlLabel
                                                value="4" control={<Radio color="primary" />} label="4" />
                                            <FormControlLabel
                                                value="5" control={<Radio color="primary" />} label="5" />
                                        </RadioGroup>
                                        <CustomInput
                                            labelText="Please write your review here"
                                            id="medical-info"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: handleAddReviewReview,
                                                multiline: true,
                                                rows: 5,
                                            }} /> <br></br> <br></br>
                                        <div className={productClasses.section} style={{ padding: 0 }}>
                                            Thank you for taking the time to review.
                                </div> <br></br>
                                        <Link to="/dashboard2">
                                            <Button color="primary" onClick={() => { setModal(false); handleAddReview({ review: addreviewReview }); }}>
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
                                        <h2 className={classes.cardTitleWhite}>{profile.name}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Education</InputLabel>
                                                <CustomInput
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.education
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Hospital</InputLabel>
                                                <CustomInput
                                                    id="hospital"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.hospital
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Specialization</InputLabel>
                                                <CustomInput
                                                    id="specialization"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true,
                                                        placeholder: profile.specialization
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Address</InputLabel>
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
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>Contact Number</InputLabel>
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
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px' }}>About Me</InputLabel>
                                                <CustomInput
                                                    id="doctor-bio"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        disabled: true,
                                                        placeholder: profile.biosummary
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <GridContainer>
                                    {/* <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <CardHeader color="primary">
                                                <h4 className={classes.cardTitleWhite}>Average Rating: <StarRatings
                                                    rating={rating}
                                                    starDimension="30px"
                                                    starSpacing="7px"
                                                    starRatedColor="orange"
                                                /></h4>
                                            </CardHeader>
                                            <CardBody>
                                                {reviews.map((item, index) => (<Card style={{ borderColor: "primary" }}>
                                                    <CardBody>
                                                        <StarRatings
                                                            rating={item.rating}
                                                            starDimension="20px"
                                                            starSpacing="5px"
                                                            starRatedColor="orange"
                                                        />
                                                        {/* <p>Rating: {item.rating}</p> }
                                                        <p>Review: {item.review}</p>
                                                    </CardBody>
                                                </Card>))}
                                            </CardBody>
                                        </Card>
                                    </GridItem> */}
                                </GridContainer>
                            </GridItem>
                            <GridItem xs={5} sm={5} md={5}>
                                {address.length > 0 ? (
                                    <Map locations={address} zoom={4} />
                                ) : (
                                        <p />
                                    )}
                            </GridItem>
                        </GridContainer>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}