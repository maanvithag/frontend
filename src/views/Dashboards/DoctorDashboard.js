import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/icons/List";
import Schedule from "@material-ui/icons/Schedule";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
// core components
import Header from "components/Header/Header.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SignedInHeaders from "views/SignedInHeader.js";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const productClasses = useProductStyles();
  const [appointments, setAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [cancelAppointment, setCancelAppointment] = useState({
    id: 0,
    isAppointmentCancelled: false
  })

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/getappointments', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setAppointments(data.CurrentAppointments)
      setPastAppointments(data.PastAppointments)
      if(data) {
        const chatusername = data.CurrentAppointments[0].mDoctorName.split(' ')[0].toLowerCase() + data.CurrentAppointments[0].mDoctorName.split(' ')[1].toLowerCase();
        window.localStorage.setItem("chatusername", chatusername);
      }
    })
  }
  useEffect(() => {handleLoad()},[])

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
            <GridContainer justify="center">
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
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { appointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                            <CardBody>
                            <h4 className={classes.cardTitle}>{item.mPatientName}</h4>
                            <p>Date: {item.mDisplayDate}</p>
                            <p>Time: {item.mDisplayTime}</p>
                              {/* <CancelAppointment/> */}
                            <Link to= {"/doctor/patient/" + btoa(item.mPatientUsername)}>
                              <Button color="primary">
                                View Patient's Profile
                              </Button>
                            </Link>
                            <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mPatientName.split(' ')[0].toLowerCase() + item.mPatientName.split(' ')[1].toLowerCase()}>
                              <Button color="primary">Send me a text</Button>
                            </Link>
                            <div>
                              <Button color="primary" onClick={(event) => { setModal(true); setCancelAppointment({id: item.id});}}>
                                Cancel Appointment
                              </Button>
                              <Dialog
                                modalClasses={{
                                  root: modalClasses.center,
                                  paper: modalClasses.modal
                                }}
                                open={modal}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => setModal(false)}
                                aria-labelledby="modal-slide-title"
                                aria-describedby="modal-slide-description"
                              >
                                <DialogTitle
                                  id="classic-modal-slide-title"
                                  disableTypography
                                  className={modalClasses.modalHeader}
                                >
                                  <IconButton
                                    className={modalClasses.modalCloseButton}
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => setModal(false)}
                                  >
                                    <Close className={modalClasses.modalClose} />
                                  </IconButton>
                                  <h3 className={modalClasses.modalTitle}>Cancel Appointment</h3>
                                </DialogTitle>
                                <DialogContent
                                  id="modal-slide-description"
                                  className={modalClasses.modalBody}
                                >
                                    <div className={productClasses.section} style={{padding: 0}}>
                                      Are you sure you want to cancel this appointment?
                                    </div> <br/>
                                    <Link to="/patient/dashboard"> 
                                        <Button color="primary" onClick={(event) => {setModal(false); handleCancelAppointments(); handleLoad();}}>
                                          Yes
                                        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" onClick={() => setModal(false)}>
                                          No
                                        </Button>
                                    </Link>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardBody>
                          </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Past appointments",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem GridItem xs={20} sm={20} md={30}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { pastAppointments.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                            <CardBody>
                            <h4 className={classes.cardTitle}>{item.mPatientName}</h4>
                            <p>Date: {item.mDisplayDate}</p>
                            <p>Time: {item.mDisplayTime}</p>
                              <Link to= {"/doctor/patient/" + btoa(item.mPatientUsername)}>
                              <Button color="primary">
                                View Patient's Profile
                              </Button>
                              </Link>
                            </CardBody>
                          </Card>))}
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
