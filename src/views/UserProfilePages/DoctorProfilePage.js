import React, { useState, useEffect } from 'react';
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SignedInHeaders from "views/SignedInHeader.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import {primaryColor} from "../../assets/jss/material-kit-react";
import InputLabel from "@material-ui/core/InputLabel";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {Link} from "react-router-dom";
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const tabClasses = useTabStyles();
    const { ...rest } = props;
    const [editHospital, setEditHospital] = useState(true);
    const [editBio, setEditBio] = useState(true);
    const [editEducation, setEditEducation] = useState(true);
    const [editEmail, setEditEmail] = useState(true);
    const [editAddress, setEditAddress] = useState(true);
    const [editSpecialization, setEditSpecialization] = useState(true);
    const [editConsultation, setEditConsultation] = useState(true);

    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        label:{
            fontSize: '18px',
            fontWeight: '425',
            marginTop: '30px',
            marginBottom: '-15px',
            color: '#904199'
        },
        title:{
            fontSize: '35px',
            fontWeight: '400',
        }
    };

    const [profile, setProfile] = useState({})

    console.log(profile);

    const [emailaddress, setEmailAddress] = useState({})
    const [education, setEducation] = useState({})
    const [consultation, setConsultation] = useState({})
    
    const [hospital, setHospital] = useState({})
    const [specialization, setSpecialization] = useState({})
    const [address, setAddress] = useState({})

    const [summary, setSummary] = useState({})

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setProfile(data)
                setEmailAddress("")
                setEducation("")
                setConsultation("")
                setHospital("")
                setSpecialization("")
                setAddress("")
                setSummary("")
            })
    };
    useEffect(() => {handleLoad()},[])

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value)
    }
    const handleEducationChange = (event) => {
        setEducation(event.target.value)
    }
    const handleConsultationChange = (event) => {
        setConsultation(event.target.value)
    }

    const handleHospitalChange = (event) => {
        setHospital(event.target.value)
    }
    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handleSummaryChange = (event) => {
        setSummary(event.target.value)
    }

    const saveUserInfoOnServer = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile/update', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                emailaddress: emailaddress,
                address: address,
                education: education,
                consultation: consultation,
                hospital: hospital,
                specialization: specialization,
                biosummary: summary
            })
          }).then(response => response.json())
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
                        <GridItem xs={12} sm={12} md={7} align="center">
                            <Link to={"/doctor/dashboard"}>
                                <Button 
                                onClick = {saveUserInfoOnServer}
                                color="primary" 
                                style={style.btn}
                                ><b>My Dashboard</b></Button>
                            </Link>
                            </GridItem>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h2 className={classes.cardTitleWhite} style={style.title}>{profile.firstname} {profile.lastname}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Username</InputLabel>
                                                <CustomInput
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        placeholder: profile.username,
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Email Address</InputLabel>
                                                <CustomInput
                                                    id="emailaddress"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleEmailAddressChange,
                                                        placeholder: profile.email,
                                                        disabled: editEmail,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmail && (<i onClick={() => setEditEmail(false)} className={"fas fa-edit"}/>)}
                                                                {editEmail ? "" : <i onClick={() => setEditEmail(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Education</InputLabel>
                                                <CustomInput
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleEducationChange,
                                                        placeholder: profile.education,
                                                        disabled: editEducation,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEducation && (<i onClick={() => setEditEducation(false)} className={"fas fa-edit"}/>)}
                                                                {editEducation ? "" : <i onClick={() => setEditEducation(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Consultation Fee</InputLabel>
                                                <CustomInput
                                                    id="consultationfee"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleConsultationChange,
                                                        placeholder: profile.consultation,
                                                        disabled: editConsultation,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editConsultation && (<i onClick={() => setEditConsultation(false)} className={"fas fa-edit"}/>)}
                                                                {editConsultation ? "" : <i onClick={() => setEditConsultation(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Hospital</InputLabel>
                                                <CustomInput
                                                    id="education"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleHospitalChange,
                                                        placeholder: profile.hospital,
                                                        disabled: editHospital,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editHospital && (<i onClick={() => setEditHospital(false)} className={"fas fa-edit"}/>)}
                                                                {editHospital ? "" : <i onClick={() => setEditHospital(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                /> 
                                                {/* {console.log(editHospital)} */}
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={style.label}>Specialization</InputLabel>
                                                <CustomInput
                                                    id="specialization"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleSpecializationChange,
                                                        placeholder: profile.specialization,
                                                        disabled: editSpecialization,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editSpecialization && (<i onClick={() => setEditSpecialization(false)} className={"fas fa-edit"}/>)}
                                                                {editSpecialization ? "" : <i onClick={() => setEditSpecialization(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.label}>Address</InputLabel>
                                                <CustomInput
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange:handleAddressChange,
                                                        placeholder: profile.address,
                                                        disabled: editAddress,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editAddress && (<i onClick={() => setEditAddress(false)} className={"fas fa-edit"}/>)}
                                                                {editAddress ? "" : <i onClick={() => setEditAddress(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <InputLabel style={style.label}>About Me</InputLabel>
                                            <CustomInput
                                                id="biosummary"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    onChange:handleSummaryChange,
                                                    placeholder: profile.biosummary,
                                                    multiline: true,
                                                    rows: 5,
                                                    disabled: editBio,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {editBio && (<i onClick={() => setEditBio(false)} className={"fas fa-edit"}/>)}
                                                            {editBio ? "" : <i onClick={() => setEditBio(true)} className="fas fa-save"></i>}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </GridItem>
                                        </GridContainer>
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


