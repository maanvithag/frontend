import React, { useEffect, useState } from 'react';
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
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const searchItem = window.localStorage.getItem("searchItem");
  const searchUserType = window.localStorage.getItem("searchUserType");
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([]);

  // Until and unless the searchItem parameter is changed, the useEffect will not be executed. If this is removed, the useEffect will be called 
  // infinite number of times.
  useEffect(() => {
    //Fetching the user data
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("searchUserType") + '/search?query=' + localStorage.getItem("searchItem"), {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(response => response.json())
      .then(data => {
        setSearchResults(data)
      })

    //Fetching the locations
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("searchUserType") + '/search/locations?query=' + localStorage.getItem("searchItem"), {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(response => response.json())
      .then(data => {
        setCities(data)
      })

  }, [searchItem]);

  function condHiding() {
    if ((window.localStorage.getItem("searchUserType") === "doctor")
        && (window.localStorage.getItem("userType") === "patient")) {
      return true;
    } else {
      return false;
    }
  } //window.localStorage.getItem("userType")

  var caption;
  if (searchUserType === "doctor") {
    caption = "doctors";
  } else caption = "insurance providers";
  const style = {
    btn: {
      color: 'white',
      textTransform: 'capitalize',
      fontSize: 'small'
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
        brand="InfinityCare"
        rightLinks={<SignedInHeaders />}
        fixed
        changeColorOnScroll={{
          height: 0,
          color: "white"
        }}
        {...rest} />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)} color={"info"}>
        <div style={style.bg}>
          <div className={classes.container}>
              <br></br>
            <GridContainer justify="space-around" direction="row" color={"info"}>
              <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                <Button color="primary">Return to Dashboard</Button>
              </Link>
            </GridContainer>
            <GridContainer justify="space-around" direction="row" color={"info"}>
              <GridItem xs={5} sm={5} md={5} lg={5} color={"info"}>
                <GridContainer color={"info"}>
                  <GridItem xs={16} sm={16} md={16}>
                  <h3>Searching for {searchItem} in {caption}</h3>
                  {searchResults.map((item, index) => (
                    <Card style={{ width: "20rem", borderColor: "primary" }}>
                      <CardBody>
                        <h3 className={classes.cardTitle}>{item.mFirstName} {item.mLastName}</h3>
                        <h4>{item.mSpecialization}</h4>
                        <h4>{item.mCompany}</h4>
                        <p>{item.mHospital}</p>
                        <p>{item.mAddress}</p>
                        <GridContainer justify="center">
                          <GridItem xs={13} sm={12} md={7}>{condHiding() && (<Link to={"/patient/doctor/bookappointment/" + btoa(item.mUserName)}>
                            <Button fullWidth color="primary" style={style.btn}>
                              Book Appointment
                              </Button></Link>)}
                          </GridItem>
                          <GridItem xs={13} sm={12} md={5}>
                            <Link to={window.localStorage.getItem("userType") + "/" + window.localStorage.getItem("searchUserType") + "/" + btoa(item.mUserName)}>
                              <Button fullWidth color="primary" style={style.btn}>
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
            {cities.length > 0 ? (
              <GridItem xs={5} sm={5} md={5}>
                <br /><br />
                <Map locations={cities} />
              </GridItem>
            ) : (
                <p />
              )}
            </GridContainer>
        </div>
      </div>
    </div>
    </div >
  );
}
