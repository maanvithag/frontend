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
import Logo2 from "../../assets/img/logo2.png";

const useStyles = makeStyles(styles);

export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const searchItem = window.localStorage.getItem("searchItem");
  const searchUserType = window.localStorage.getItem("searchUserType");
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([]);

  // Profile pictures
  const MassimoRossi = require('../../assets/img/profilepic-02.png');
  const SamanthaJoson = require('../../assets/img/profilepic-06.png');
  const PrestonLannister = require('../../assets/img/profilepic-05.png');
  const JaimeMoore = require('../../assets/img/profilepic-03.png');
  const VivekBandaru = require('../../assets/img/profilepic-17.png');
  const KaylaRamsey = require('../../assets/img/profilepic-11.png');
  const SoniaPratt = require('../../assets/img/profilepic-08.png');
  const TyeAlbarn = require('../../assets/img/profilepic-07.png');
  const VivekShresta = require('../../assets/img/profilepic-09.png');
  const DouglasRiley = require('../../assets/img/profilepic-13.png');
  const IshaqDunkley = require('../../assets/img/profilepic-10.png');
  const JenniferRoland = require('../../assets/img/profilepic-15.png');
  const ZackGainsbourg = require('../../assets/img/profilepic-14.png');
  const KristenNash = require('../../assets/img/profilepic-01.png');

  const profiles = {
    'MassimoRossi': MassimoRossi,
    'SamanthaJoson': SamanthaJoson,
    'PrestonLannister': PrestonLannister,
    'JaimeMoore': JaimeMoore,
    'VivekBandaru': VivekBandaru,
    'KaylaRamsey': KaylaRamsey,
    'SoniaPratt': SoniaPratt,
    'TyeAlbarn': TyeAlbarn,
    'VivekShresta': VivekShresta,
    'DouglasRiley': DouglasRiley,
    'IshaqDunkley': IshaqDunkley,
    'JenniferRoland': JenniferRoland,
    'ZackGainsbourg': ZackGainsbourg,
    'KristenNash': KristenNash
  }

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

  }, [searchItem, searchUserType]);

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
    },
    altTextColor:{
      color: '#904199'
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
        {...rest} />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)} color={"info"}>
        <div style={style.bg}>
          <div className={classes.container}>
            <br/>
            <GridContainer justify="space-around" direction="row" color={"info"}>
              <GridItem xs={5} sm={5} md={5} lg={5} color={"info"}>
                <GridContainer color={"info"}>
                  <GridItem xs={16} sm={16} md={16}>
                    <h3>Searching for <span style={style.altTextColor}>{searchItem}</span> in <span style={style.altTextColor}>{caption}</span></h3>
                    {searchResults.map((item, index) => (
                      <Card style={{ width: "25rem", borderColor: "primary" }}>
                        <CardBody>
                          <GridContainer>
                            <GridItem>
                            <img align="right" width="120" height="120" resizeMode="contain" src={profiles[item.mFirstName+item.mLastName]} alt="Profile1" />
                            <h3 className={classes.cardTitle}><b>{item.mFirstName} {item.mLastName}</b></h3>
                            <h5 style={style.altTextColor}>{item.mSpecialization}</h5>
                            <h4>{item.mCompany}</h4>
                            <p>{item.mHospital}</p>
                            <p>{item.mAddress}</p>
                            </GridItem>
                          </GridContainer>
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

                    <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                      <Button color="primary">My Dashboard</Button>
                    </Link>

                  <br /><br />
                  <Map locations={cities} zoom={4}/>
                </GridItem>
              ) : (
                  <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
                    <Button color="primary">My Dashboard</Button>
                  </Link>
                )}
            </GridContainer>
            <br/>
          </div>
        </div>
      </div>
    </div >
  );
}
