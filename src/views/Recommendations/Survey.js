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
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function Survey(props) {
    const classes = useStyles();
    const { ...rest } = props;

    {/* set initial values to a number not 0-10 to see if user changes the weights*/}

    const [incomeValue, setIncomeValue] = React.useState(99);
    const [routineValue, setRoutineValue] = React.useState(99);
    const [specializedValue, setSpecializedValue] = React.useState(99);
    const [conditionValue, setConditionValue] = React.useState(99);

    const handleIncomeChange = (event) => {
        console.log("Income: " + event.target.value)
        setIncomeValue(event.target.value); 
    };
    const handleRoutineChange = (event) => {
        console.log("RoutineCare: " + event.target.value)
        setRoutineValue(event.target.value); 
    };
    const handleSpecializedChange = (event) => {
        console.log("SpecializedCare: " + event.target.value)
        setSpecializedValue(event.target.value); 
    };
    const handleConditionChange = (event) => {
        console.log("Diseases: " + event.target.value)
        setConditionValue(event.target.value); 
    };

    const saveInfoOnserver = () => {
        console.log("Final Value: " + (parseInt(routineValue) + parseInt(specializedValue) + parseInt(conditionValue)))
        fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/survey', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                incomeValue: incomeValue.toString(),
                finalWeight: (parseInt(routineValue) + parseInt(specializedValue) + parseInt(conditionValue)).toString()
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
          })
    };

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
            marginBottom: '20px',
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

    function disableBtn() {
        if(routineValue==99 || incomeValue==99 || specializedValue==99 || conditionValue==99){
            return true;
        } else {
            return false;
        }
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
                            <Link to="/patient/dashboard">
                                <Button
                                    color="primary"
                                >My Dashboard</Button>
                            </Link>
                        </GridContainer>
                        <br></br>
                        <GridContainer justify="center">
                            <GridItem xs={10} sm={10} md={10}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={15} sm={15} md={15}>
                                <GridContainer justify="center">
                                <Card style={{ width: "50rem", borderColor: "primary" }}>
                                    <CardHeader color="primary">
                                        <h3 className={classes.cardTitleWhite} style={style.center}>Find the Perfect Insurance Plan for You</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>Take this survey to get personalized insurance plan recommendations.</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>What is your annual household income?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="income" name="income" value={incomeValue} onChange={handleIncomeChange}>
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="$0 - 16,000" />
                                                    <FormControlLabel value="1" style={style.radio} control={<Radio />} label="$16,001 - 30,000" />
                                                    <FormControlLabel value="2" style={style.radio} control={<Radio />} label="$30,001 - 47,000" />
                                                    <FormControlLabel value="3" style={style.radio} control={<Radio />} label="$47,001+" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>Do you opt for a lot of routine care?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="routine" name="routine" value={routineValue} onChange={handleRoutineChange}>
                                                    <FormControlLabel value="1" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>Do you opt for a lot of specialized care?</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="specialized" name="specialized" value={specializedValue} onChange={handleSpecializedChange}>
                                                    <FormControlLabel value="1" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={style.bold}>Do you have one of the following conditions that would make you need to see the doctor more regularly?</InputLabel>
                                                <br/>
                                                <InputLabel style={style.subQ}>Cancer, Cirrhosis, Type I Diabetes, Kidney/Renal Failure, Heart Disease, HIV, Bipolar Disorder, Severe Depression, Erythematous, Muscular Dystrophy, Schizophrenia, Systemic Lupus, or Transplant History</InputLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <RadioGroup aria-label="condition" name="condition" value={conditionValue} onChange={handleConditionChange}>
                                                    <FormControlLabel value="2" style={style.radio} control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="0" style={style.radio} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                                <Button
                                                    style={style.submitBtn}
                                                    onClick = {saveInfoOnserver}
                                                    color="primary"
                                                    disabled={disableBtn()}
                                                    component={Link} to="survey/results"
                                                >Show me my plans</Button>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}



