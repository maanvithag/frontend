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
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(styles);

export default function Survey(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const handleLoad = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setIncomeValue("");
                setRoutineValue("");
                setSpecializedValue("");
                setBirthValue("");
                setConditionValue("")
            })
    };
    useEffect(() => {handleLoad()},[]);

    const handleIncomeChange = (event) => { setIncomeValue(event.target.value); };
    const handleRoutineChange = (event) => { setRoutineValue(event.target.value); };
    const handleSpecializedChange = (event) => { setSpecializedValue(event.target.value); };
    const handleBirthChange = (event) => { setBirthValue(event.target.value); };
    const handleConditionChange = (event) => { setConditionValue(event.target.value); };

    const saveUserInfoOnServer = () => {
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile/update', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                incomeValue: incomeValue,
                routineValue: routineValue,
                specializedValue: specializedValue,
                birthValue: birthValue,
                conditionValue: conditionValue
            })
        }).then(response => response.json())
    };

    const [incomeValue, setIncomeValue] = React.useState('');
    const [routineValue, setRoutineValue] = React.useState('');
    const [specializedValue, setSpecializedValue] = React.useState('');
    const [birthValue, setBirthValue] = React.useState('');
    const [conditionValue, setConditionValue] = React.useState('');


    const style = {
        link: {
            color: 'white'
        },
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        bold:{
            fontWeight:'bold',
            marginTop: '30px',
            fontSize: '120%'
        },
        q:{
            color:'#424242',
            marginTop: '30px',
            marginBottom: '10px',
            lineHeight: '120%'
        },
        subQ:{
            marginBottom: '10px',
            lineHeight: '120%'
        },
        center:{
            textAlign: 'center'
        },
        radio:{
            color:"black"
        },
        textBox:{
            color:'#424242',
            marginTop: '30px',
            marginBottom: '-20px'
        },
        submitBtn:{
            marginTop: '20px',
            marginBottom: '20px'
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
                            <Link to="/patient/dashboard">
                                <Button
                                    onClick = {saveUserInfoOnServer}
                                    color="primary"
                                >Return to my Dashboard</Button>
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
                                        <h3 className={classes.cardTitleWhite} style={style.center}>Find the Perfect Insurance Plan for You</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>Take this survey to get personalized insurance plan recommendations.</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.q}>What is your annual household income?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="income" name="income" value={incomeValue} onChange={handleIncomeChange}>
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="$0-16,000" />
                                                    <FormControlLabel value="2" style={style.radio} control={<Radio />} label="$16,001-30,000" />
                                                    <FormControlLabel value="3" style={style.radio} control={<Radio />} label="$30,001-47,000" />
                                                    <FormControlLabel value="4" style={style.radio} control={<Radio />} label="$47,001+" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.q}>Do you opt for a lot of routine care?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="routine" name="routine" value={routineValue} onChange={handleRoutineChange}>
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="4" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.q}>Do you opt for a lot of specialized care?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="specialized" name="specialized" value={specializedValue} onChange={handleSpecializedChange}>
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="4" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.textBox}>Enter your birth date.</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    id="birth"
                                                    formControlProps={{
                                                        fullWidth: false
                                                    }}
                                                    inputProps={{
                                                        onChange:handleBirthChange,
                                                        placeholder: "MM/DD/YYYY",
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.q}>Do you have one of the following conditions that would make you need to see the doctor more regularly?</InputLabel>
                                                <InputLabel style={style.subQ}>Cancer, Cirrhosis, Type I Diabetes, Kidney/Renal Failure, Heart Disease, HIV, Bipolar Disorder, Severe Depression, Erythematous, Muscular Dystrophy, Schizophrenia, Systemic Lupus, or Transplant History</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="condition" name="condition" value={conditionValue} onChange={handleConditionChange}>
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="4" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <Link to="/survey/results">
                                                <Button
                                                    style={style.submitBtn}
                                                    onClick = {saveUserInfoOnServer}
                                                    color="primary"
                                                >Show me my plans</Button>
                                            </Link>
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



