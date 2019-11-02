import React, { useState } from 'react';
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
import InputLabel from "@material-ui/core/InputLabel";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Badge from 'components/Badge/Badge.js';
import BookAppointment from "views/BookAppointment/AppointmentConfirmation.js";
import Calendar from 'react-calendar';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {primaryColor} from "../../assets/jss/material-kit-react";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const tabClasses = useTabStyles();
    const { ...rest } = props;
    const [date, setDate] = useState(new Date());
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
                                        <GridContainer style={{ display: 'flex', flexDirection: 'row' }}>
                                            <GridItem xs={12} sm={12} md={6}>
                                            <Calendar
                                                onChange={(date) => setDate(date)}
                                                value={date}
                                            />
                                            The available times for selected dates are:
                                            <CustomDropdown
                                                buttonText="Time"
                                                dropdownList={[
                                                "Timeslot1",
                                                "Timeslot2",
                                                "Timeslot3",
                                                ]}
                                            />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem>
                                <BookAppointment />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

