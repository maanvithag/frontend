import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/List";
import Schedule from "@material-ui/icons/Schedule";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Table from "components/Table/Table.js";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import {Create, Payment} from "@material-ui/icons";
import Logo2 from "../../assets/img/logo2.png";
import CustomTabs from "components/CustomTabs/CustomTabs.js";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const productClasses = useProductStyles();
  const { ...rest } = props;
  const [appointments, setAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [cancelAppointment, setCancelAppointment] = useState({
    id: 0,
    isAppointmentCancelled: false
  })

  

  const handleCancelAppointments = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/cancelappointments', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        id: cancelAppointment.id
      }) 
    }).then(response => response.json())
    .then(data => {
      setCancelAppointment(data.isAppointmentCancelled)
    })
  };

    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        cancelBtn:{
        },
        viewBtn:{
            marginRight: '10px',
            paddingLeft: '35px',
            paddingRight: '35px'
        },
        chatBtn:{
            paddingLeft: '35px',
            paddingRight: '35px'
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
            <GridContainer justify="space-around">
              <GridItem xs={5} sm={10} md={15} lg={20}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Upcoming appointments",
                    tabIcon: Dashboard,
                    tabContent: (
                      <p>testing</p>
                    )
                  },
                  {
                    tabName: "Past appointments",
                    tabIcon: List,
                    tabContent: (
                        <p>testing</p>
                    )
                  },
                  {
                    tabName: "Billing",
                    tabIcon: Payment,
                    tabContent: (
                        <NavPills
                            color="warning"
                            tabs={[
                            {
                                tabButton: "Unpaid",
                                tabContent: (
                                    <div>
                                    <p>Total amount due out of pocket: $xxx</p>
                                    <p>Total amount due covered by insurance: $xxx</p>
                                    <Card style={{ width: "25rem", borderColor: "primary" }}>
                                        <CardBody>
                                        <h3 className={classes.cardTitle}><b>Doctor name</b></h3>
                                        <h5 style={style.altTextColor}>Reason</h5>
                                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                            <h5>Co-pay: $</h5>
                                            <Button color="primary" style={style.btn}>
                                                Pay
                                            </Button>
                                        </div>
                                        <Button fullWidth color="primary" style={style.btn}>
                                            Claim
                                        </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                                )
                            },
                            {
                                tabButton: "Paid",
                                tabContent: (
                                  <div>
                                  <p>Total amount paid out of pocket: $xxx</p>
                                  <p>Total amount paid covered by insurance: $xxx</p>
                                  <Card style={{ width: "25rem", borderColor: "primary" }}>
                                      <CardBody>
                                      <h3 className={classes.cardTitle}><b>Doctor name</b></h3>
                                      <h5 style={style.altTextColor}>Reason</h5>
                                      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                          <h5>Co-pay: $</h5>
                                      </div>
                                      </CardBody>
                                  </Card>
                              </div>
                                )
                            }
                          ]}
                        />
                    )
                  },
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
