import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Icon from "@material-ui/core/Icon";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";
import LocalOffer from "@material-ui/icons/LocalOffer";
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
import CardFooter from "components/Card/CardFooter.js";
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <h2> </h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Your Profile</h4>
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
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Education"
                          id="education"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                      <InputLabel style={{ color: primaryColor, marginTop: '30px'}}>Hospital</InputLabel>
                      <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                              labelText="Hospital"
                              id="hospital"
                              formControlProps={{
                                  fullWidth: true
                              }}
                          />
                      </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                  labelText="Specialization"
                                  id="specialization"
                                  formControlProps={{
                                      fullWidth: true
                                  }}
                              />
                          </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                              labelText="Address"
                              id="address"
                              formControlProps={{
                                  fullWidth: true
                              }}
                          />
                      </GridItem>
                      </GridContainer>

                          <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: primaryColor, marginTop: '10px'}}>About Me</InputLabel>
                        <CustomInput
                          labelText="Bio summary"
                          id="doctor-bio"
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
                  <CardFooter>
                    <Button color="primary">Update Profile</Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={8} lg={6}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Upcoming appointments",
                    tabIcon: Schedule,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="primary">
                              <h4 className={classes.cardTitleWhite}>Patient Table</h4>
                            </CardHeader>
                            <CardBody>
                              <Table
                                tableHeaderColor="primary"
                                tableHead={["Patient Name", "Date", "Patient profile"]}
                                tableData={[
                                  ["Dakota Rice", "Date", "Link1"],
                                  ["Minerva Hooper", "Date", "Link2"],
                                  ["Sage Rodriguez", "Date", "Link3"],
                                  ["Philip Chaney", "Date", "Link4"],
                                  ["Doris Greene", "Date", "Link5"],
                                  ["Mason Porter", "Date", "Link6"]
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
                              <h4 className={classes.cardTitleWhite}>Patient Table</h4>
                            </CardHeader>
                            <CardBody>
                              <Table
                                tableHeaderColor="primary"
                                tableHead={["Patient Name", "Date", "Patient profile"]}
                                tableData={[
                                  ["Dakota Rice", "Date", "Link1"],
                                  ["Minerva Hooper", "Date", "Link2"],
                                  ["Sage Rodriguez", "Date", "Link3"],
                                  ["Philip Chaney", "Date", "Link4"],
                                  ["Doris Greene", "Date", "Link5"],
                                  ["Mason Porter", "Date", "Link6"]
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
