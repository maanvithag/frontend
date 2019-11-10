import React, {useEffect, useState} from 'react';
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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import SignedInHeaders from "views/SignedInHeader.js";
import Map from "views/Map/Map.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

    const searchItem = window.localStorage.getItem("searchItem");
    const searchUserType = window.localStorage.getItem("searchUserType");
    const [searchResults, setSearchResults] = useState([]);
    /* change for search */
    const handleLoad = (event) => {
        fetch(window.localStorage.getItem("baseURL") +
            window.localStorage.getItem("searchUserType") +
            '/search?query=' + localStorage.getItem("searchItem"),{
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then(response => response.json())
            .then(data => {
                setSearchResults(data)
            })
    };
    useEffect(() => {handleLoad()},[]);

    function condHiding() {
        if(window.localStorage.getItem("searchUserType")==="doctor") {
            return true;
        } else {
            return false;
        }
    }





    var caption;
    if(searchUserType === "doctor"){
         caption="doctors";
    } else  caption="insurance providers";

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
      <div className={classNames(classes.main, classes.mainRaised)} color={"info"}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="space-around" direction="row" color={"info"}>
                <GridItem xs={5} sm={5} md={5} lg={5} color={"info"}>
                <GridContainer color={"info"}>
                    <GridItem xs={16} sm={16} md={16}>
                        <h3>
                            Searching for {searchItem} in {caption}
                        </h3>

                        { searchResults.map((item, index) => (

                            <Card style={{width: "20rem", borderColor: "primary"}}>

                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        {item.mFirstName} {item.mLastName}
                                    </h3>
                                    <h4>{item.mSpecialization}</h4>
                                    <h4>{item.mCompany}</h4>
                                    <p>{item.mHospital}</p>
                                    <p>{item.mAddress}</p>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={6}>

                                    { condHiding() && (<Link to= {"/patient/bookappointment"}>
                                        <Button fullWidth color="primary">
                                            Book Appointment
                                        </Button>
                                    </Link>) }
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                        <Link to= {window.localStorage.getItem("userType") + "/" +window.localStorage.getItem("searchUserType")+"/"+ btoa(item.mUserName)}>
                          <Button fullWidth color="primary">
                            View Profile
                          </Button>
                        </Link>
                                        </GridItem>
                                    </GridContainer>
                        </CardBody>
                        </Card>))}
                    </GridItem>
                </GridContainer>
                </GridItem>
                <GridItem xs={5} sm={5} md={5} lg={5}>
                  <Map />
                </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
