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
  const { ...rest } = props;
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const productClasses = useProductStyles();
  const [chatUserName, setChatUserName] = useState("")
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
      if(data.CurrentAppointments.length !== 0){
        const chatusername = data.CurrentAppointments[0].mDoctorName.split(' ')[0].toLowerCase() + data.CurrentAppointments[0].mDoctorName.split(' ')[1].toLowerCase();
        window.localStorage.setItem("chatusername", chatusername);
        setChatUserName(window.localStorage.getItem("chatusername"))
      }
    })
  }
  useEffect(() => {handleLoad()},[chatUserName])

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
        altTextColor: {
            color: '#904199',
            marginTop: '-5px',
            marginBottom: '15px',
            fontWeight: '500'
        },
        card:{
            marginBottom: '-5px',
            width: "50rem",
            borderColor: "primary",
            background: "#F8F8F8"
        },
        btn:{
            marginLeft:"-30px",
            width: "200px"
        },
        topBtn:{
            marginLeft:"-30px",
            width: "200px"


        },
        cancel:{
            marginLeft:"-30px",
            width: "200px",
            background: '#c32f2e'


        },    biggerText:{
            fontSize: "30px",
            marginTop:'5px',
            marginBottom: "10px"
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
          <div className={classes.container}> <br/>
            <GridContainer justify="center">
              <GridItem xs={5} sm={10} md={15} lg={20}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Upcoming appointments",
                    tabIcon: Schedule,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={20} sm={20} md={30}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { appointments.map((item, index) => (<Card style={style.card}>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={9}>
                                        <h3 className={classes.cardTitle} style={style.biggerText}><b>{item.mPatientName}</b></h3>
                                    <h5><span style={style.altTextColor}>Date:</span> {item.mDisplayDate}</h5>
                                    <h5><span style={style.altTextColor}>Time: </span>{item.mDisplayTime}</h5>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                              {/* <CancelAppointment/> */}
                            <Link to= {"/doctor/patient/" + btoa(item.mPatientUsername)}>
                              <Button color="primary" style={style.topBtn}>
                                View Patient's Profile
                              </Button>
                            </Link>
                            <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mPatientName.split(' ')[0].toLowerCase() + item.mPatientName.split(' ')[1].toLowerCase()}>
                              <Button color="primary" style={style.btn}>Send me a text</Button>
                            </Link>
                              <Button color="primary" style={style.cancel} onClick={(event) => { setModal(true); setCancelAppointment({id: item.id});}}>
                                Cancel Appointment
                              </Button>
                                    </GridItem>
                                </GridContainer>

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
                                    <Link to="/doctor/dashboard"> 
                                        <Button color="primary" onClick={(event) => {setModal(false); handleCancelAppointments(); handleLoad();}}>
                                          Yes
                                        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" onClick={() => setModal(false)}>
                                          No
                                        </Button>
                                    </Link>
                                </DialogContent>
                              </Dialog>
                          </CardBody>
                          </Card>))}
                          <GridItem>&nbsp;</GridItem>
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabName: "Past appointments",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem GridItem xs={20} sm={20} md={30}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { pastAppointments.map((item, index) => (<Card style={style.card}>
                              <CardBody>
                              <GridContainer>
                                  <GridItem xs={12} sm={12} md={9}>
                                      <h3 className={classes.cardTitle} style={style.biggerText}><b>{item.mPatientName}</b></h3>
                                      <h5><span style={style.altTextColor}>Date:</span> {item.mDisplayDate}</h5>
                                      <h5><span style={style.altTextColor}>Time: </span>{item.mDisplayTime}</h5>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      {/* <CancelAppointment/> */}
                                      <Link to= {"/doctor/patient/" + btoa(item.mPatientUsername)}>
                                          <Button color="primary" style={style.topBtn}>
                                              View Patient's Profile
                                          </Button>
                                      </Link>
                                      <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mPatientName.split(' ')[0].toLowerCase() + item.mPatientName.split(' ')[1].toLowerCase()}>
                                          <Button color="primary" style={style.btn}>Send me a text</Button>
                                      </Link>
                                  </GridItem>
                              </GridContainer>
                            </CardBody>
                          </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  }
                ]}
              />
            </GridItem>
                <GridItem>&nbsp;</GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
