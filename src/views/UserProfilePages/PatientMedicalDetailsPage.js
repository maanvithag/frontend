import InputAdornment from '@material-ui/core/InputAdornment';
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
import {primaryColor} from "../../assets/jss/material-kit-react";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import CardFooter from 'components/Card/CardFooter';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage';
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [editEmergencyName, setEditEmergencyName] = useState(true);
    const [editEmergencyNum, setEditEmergencyNum] = useState(true);
    const [editHistory, setEditHistory] = useState(true);
    const [editVax, setEditVax] = useState(true);
    const [editMeds, setEditMeds] = useState(true);
    const [editAllergies, setEditAllergies] = useState(true);
    const [editBloodType, setEditBloodType] = useState(true);

    const [medicalHistory, setMedicalHistory] = useState({})
    const [bloodType, setBloodType] = useState("")
    const [allergies, setAllergies] = useState("")
    const [currentMedications, setCurrentMedications] = useState("")
    const [vaccinations, setVaccinations] = useState("")
    const [additionalDetails, setAdditionalDetails] = useState("")

    const [emergencycontactnumber, setEmergencyContactNumber] = useState("")
    const [emergencycontactname, setEmergencyContactName] = useState("")
    

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setMedicalHistory(data)
            })
    };
    useEffect(() => {handleLoad()},[])

    const handleCurrentMedicationsChange = (event) => {
        setCurrentMedications(event.target.value)
    }

    const handleVaccinationsChange = (event) => {
        setVaccinations(event.target.value)
    }

    const handleAllergiesChange = (event) => {
        setAllergies(event.target.value)
    }

    const handleBloodTypeChange = (event) => {
        setBloodType(event.target.value)
    }

    const handleEmergencyContactNumberChange = (event) => {
        setEmergencyContactNumber(event.target.value)
    }

    const handleEmergencyContactNameChange = (event) => {
        setEmergencyContactName(event.target.value)
    }

    const handleAdditionalDetails = (event) => {
        setAdditionalDetails(event.target.value)
    }

    const saveUserInfoOnServer = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile/update', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                bloodType: bloodType,
                allergies: allergies,
                currentMedications: currentMedications,
                vaccinations: vaccinations,
                medicalhistory: additionalDetails,
                emergencycontactname: emergencycontactname,
                emergencycontactnumber: emergencycontactnumber,
            })
        }).then(response => response.json())
    }

    const style = {
        link: {
            color: 'white'
        },
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
                            <Link to="/patient/dashboard">
                                <Button
                                    onClick = {saveUserInfoOnServer}
                                    color="primary"
                                >My Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h3>{medicalHistory.firstname} {medicalHistory.lastname} </h3>
                                        <h5 className={classes.cardTitleWhite}>Medical History</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Blood Type</InputLabel>
                                                <CustomInput
                                                    id="bloodtype"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleBloodTypeChange,
                                                        placeholder: medicalHistory.bloodType, //profile.emergencycontactname,
                                                        disabled: editBloodType,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editBloodType && (<i onClick={() => setEditBloodType(false)} className={"fas fa-edit"}/>)}
                                                                {editBloodType ? "" : <i onClick={() => setEditBloodType(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Allergies</InputLabel>
                                                <CustomInput
                                                    id="allergies"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleAllergiesChange,
                                                        placeholder: medicalHistory.allergies, //profile.emergencycontactname,
                                                        disabled: editAllergies,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editAllergies && (<i onClick={() => setEditAllergies(false)} className={"fas fa-edit"}/>)}
                                                                {editAllergies ? "" : <i onClick={() => setEditAllergies(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Current Medications</InputLabel>
                                                <CustomInput
                                                    id="meds"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleCurrentMedicationsChange,
                                                        placeholder: medicalHistory.currentMedications, //profile.medicalhistory,
                                                        multiline: true,
                                                        rows: 3,
                                                        disabled: editMeds,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editMeds && (<i onClick={() => setEditMeds(false)} className={"fas fa-edit"}/>)}
                                                                {editMeds ? "" : <i onClick={() => setEditMeds(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Vaccinations</InputLabel>
                                                <CustomInput
                                                    id="vax"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleVaccinationsChange,
                                                        placeholder: medicalHistory.vaccinations,//profile.medicalhistory,
                                                        multiline: true,
                                                        rows: 3,
                                                        disabled: editVax,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editVax && (<i onClick={() => setEditVax(false)} className={"fas fa-edit"}/>)}
                                                                {editVax ? "" : <i onClick={() => setEditVax(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Additional Details</InputLabel>
                                                <CustomInput
                                                    id="medicalhistory"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleAdditionalDetails,
                                                        placeholder: medicalHistory.medicalhistory,
                                                        multiline: true,
                                                        rows: 3,
                                                        disabled: editHistory,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editHistory && (<i onClick={() => setEditHistory(false)} className={"fas fa-edit"}/>)}
                                                                {editHistory ? "" : <i onClick={() => setEditHistory(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter><br/></CardFooter>
                                    <CardHeader color="primary"><h5 className={classes.cardTitleWhite}>Emergency Contact</h5></CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Emergency Contact Name</InputLabel>
                                                <CustomInput
                                                    id="emergencycontactname"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleEmergencyContactNameChange,
                                                        placeholder: medicalHistory.emergencycontactname,
                                                        disabled: editEmergencyName,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmergencyName && (<i onClick={() => setEditEmergencyName(false)} className={"fas fa-edit"}/>)}
                                                                {editEmergencyName ? "" : <i onClick={() => setEditEmergencyName(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Emergency Contact Number</InputLabel>
                                                <CustomInput
                                                    id="emergencycontactnumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: handleEmergencyContactNumberChange,
                                                        placeholder: medicalHistory.emergencycontactnumber,
                                                        disabled: editEmergencyNum,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {editEmergencyNum && (<i onClick={() => setEditEmergencyNum(false)} className={"fas fa-edit"}/>)}
                                                                {editEmergencyNum ? "" : <i onClick={() => setEditEmergencyNum(true)} className="fas fa-save"></i>}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter><br/></CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}



