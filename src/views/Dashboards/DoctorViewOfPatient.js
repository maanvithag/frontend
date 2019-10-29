import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import NavPills from "components/NavPills/NavPills.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import InputLabel from "@material-ui/core/InputLabel";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import tabStyles from "assets/jss/material-kit-react/views/dashboardStyle.js";
import {primaryColor} from "../../assets/jss/material-kit-react";

const useStyles = makeStyles(styles);
const useTabStyles = makeStyles(tabStyles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const tabClasses = useTabStyles();
    const { ...rest } = props;
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
                            <GridItem xs={12} sm={12} md={6}>
                                <h2></h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Patient Name</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Username"
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Email address"
                                                    id="email-address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="First Name"
                                                    id="first-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Last Name"
                                                    id="last-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Address"
                                                    id="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Phone Number"
                                                    id="phone-number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Date of Birth: MM/DD/YYYY"
                                                    id="dob"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Insurance</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Insurance Company"
                                                    id="insurance-company"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Insurance Provider"
                                                    id="insurance-provider"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Insurance Plan"
                                                    id="insurance-plan"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Emergency Contact</InputLabel>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Emergency Contact Name"
                                                    id="emergency-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Emergency Phone Number"
                                                    id="emergency-phone"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: primaryColor, marginTop: '10px'}}>Medical History</InputLabel>
                                                <CustomInput
                                                    labelText="Medical History: please list any allergies, past surgeries, current medications, etc.."
                                                    id="medical-info"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8} lg={6}>
                                <NavPills
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "Upcoming appointments",
                                            tabIcon: Dashboard,
                                            tabContent: (
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <Card>
                                                            <CardHeader color="primary">
                                                                <h4 className={classes.cardTitleWhite}>Upcoming appointments</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Table
                                                                    tableHeaderColor="primary"
                                                                    tableHead={["Doctor", "Date", "Time"]}
                                                                    tableData={[
                                                                        ["Dakota Rice", "10/22/2018", "1pm-2pm"],
                                                                        ["Minerva Hooper", "11/13/2018", "4pm-5pm"],
                                                                    ]}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    </GridItem>
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "Payments",
                                            tabIcon: Schedule,
                                            tabContent: (
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <Card>
                                                            <CardHeader color="primary">
                                                                <h4 className={classes.cardTitleWhite}>Bills</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Table
                                                                    tableHeaderColor="primary"
                                                                    tableHead={["Doctor", "Date", "Amount"]}
                                                                    tableData={[
                                                                        ["Dakota Rice", "10/22/2018", "$300"],
                                                                        ["Minerva Hooper", "11/13/2018", "0"],
                                                                    ]}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    </GridItem>
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "Past appointments",
                                            tabIcon: List,
                                            tabContent: (
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <Card>
                                                            <CardHeader color="primary">
                                                                <h4 className={classes.cardTitleWhite}>Past appointments</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Table
                                                                    tableHeaderColor="primary"
                                                                    tableHead={["Doctor", "Date", "Time"]}
                                                                    tableData={[
                                                                        ["Dakota Rice", "10/22/2018", "Oud-Turnhout"],
                                                                        ["Minerva Hooper", "11/13/2018", "Sinaai-Waas"],
                                                                        ["Sage Rodriguez", "01/05/2019", "Baileux"],
                                                                        ["Philip Chaney", "06/25/2019", "Overland Park"],
                                                                    ]}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    </GridItem>
                                                </GridContainer>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

