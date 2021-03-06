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
import { Create, Payment } from "@material-ui/icons";
import PieChartIcon from '@material-ui/icons/PieChart';
import Logo2 from "../../assets/img/logo2.png";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

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
  const [chatUserName, setChatUserName] = useState("")
  const [billsToBePaid, setBillsToBePaid] = useState([]);
  const [isBillPaid, setIsBillPaid] = useState("");
  const [appointmentIdentifier, setAppointmentIdentifier] = useState("")
  const [outOfPocketAmountSpent, setOutOfPocketAmountSpent] = useState("");
  const [outOfPocketLimit, setOutOfPocketLimit] = useState("");
  const [outOfPocketLimitRemaining, setOutOfPocketLimitRemaining] = useState("");
  const [totalAmountCoveredByInsurance, setTotalAmountCoveredByInsurance] = useState("");
  const [totalInProcessAmountByInsurance, setTotalInProcessAmountByInsurance] = useState("");
  const [totalAmountDeniedByInsurance, setTotalAmountDeniedByInsurance] = useState("");
  const [totalAmountCoveredByPatient, setTotalAmountCoveredByPatient] = useState("");
  const [cancelAppointment, setCancelAppointment] = useState({
    id: 0,
    isAppointmentCancelled: false
  })

  // Profile pictures
  const MassimoRossi = require('../../assets/img/profilepic-02.png');
  const SamanthaJoson = require('../../assets/img/profilepic-06.png');
  const PrestonLannister = require('../../assets/img/profilepic-05.png');
  const JaimeMoore = require('../../assets/img/profilepic-03.png');
  const VivekBandaru = require('../../assets/img/profilepic-17.png');
  const KristenNash = require('../../assets/img/profilepic-01.png');

  const profiles = {
  'Massimo Rossi': MassimoRossi,
  'Samantha Joson': SamanthaJoson,
  'Preston Lannister': PrestonLannister,
  'Jaime Moore': JaimeMoore,
  'Vivek Bandaru': VivekBandaru,
  'Kristen Nash': KristenNash
  }
  
  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/getappointments', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setAppointments(data.CurrentAppointments)
        setPastAppointments(data.PastAppointments)
        setBillsToBePaid(data.billsToBePaid)
        setOutOfPocketAmountSpent(data.outOfPocketAmountSpent)
        setOutOfPocketLimit(data.outOfPocketLimit)
        setOutOfPocketLimitRemaining(data.outOfPocketLimitRemaining)
        setTotalAmountCoveredByInsurance(data.totalAmountCoveredByInsurance)
        setTotalInProcessAmountByInsurance(data.totalInProcessAmountByInsurance)
        setTotalAmountDeniedByInsurance(data.totalAmountDeniedByInsurance)
        setTotalAmountCoveredByPatient(data.totalAmountCoveredByPatient)
        if(data.CurrentAppointments.length !== 0){
          const chatusername = data.CurrentAppointments[0].mPatientName.split(' ')[0].toLowerCase() + data.CurrentAppointments[0].mPatientName.split(' ')[1].toLowerCase();
          window.localStorage.setItem("chatusername", chatusername);
          setChatUserName(window.localStorage.getItem("chatusername"))
        }
      })
  }
  useEffect(() => { handleLoad() }, [cancelAppointment, isBillPaid, chatUserName])

  const handleCancelAppointments = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/cancelappointments', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        id: cancelAppointment.id
      })
    }).then(response => response.json())
      .then(data => {
        setCancelAppointment(data.isAppointmentCancelled)
      })
  };

  function handleBillPayment() {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/bills/pay', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        id: appointmentIdentifier
      })
    }).then(response => {
      // UPDATE to the below parameter makes the whole component reload. Handle with care during refactoring
      setIsBillPaid(response)
    })
  }

  function handleAppointmentIdChange(appointmentId) {
    setAppointmentIdentifier(appointmentId)
  }

  function hide(plan){
      if (plan===""){ return false;}
      else{return true;}
  }

    const [creditcardnumber, setCCN] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [billingaddress, setBillingAddress] = useState('');
    const [cardname, setCardName] = useState('');

    const handleCCN = event => { setCCN(event.target.value); };
    const handleExpiry = event => { setExpiry(event.target.value); };
    const handleCardName = event => { setCardName(event.target.value); };
    const handleBillingAddress = event => { setBillingAddress(event.target.value); };
    const handleCVV = event => { setCVV(event.target.value); };



    const style = {
        bg: {
            background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
            color: 'black',
            borderRadius: 5
        },
        cancelBtn: {
        },
        payBtn: {
            paddingLeft: '35px',
            paddingRight: '35px',
            marginLeft:'-80px',
            marginTop: '20px'
        },
        viewBtn: {
            marginLeft: '180px',
            marginRight: '10px',
            paddingLeft: '35px',
            paddingRight: '35px'
        },viewBtn2: {
            marginLeft: '170px',
            marginRight: '-2px',
            paddingLeft: '35px',
            paddingRight: '35px'
        },
        chatBtn: {
            marginRight: '10px',
            paddingLeft: '30px',
            paddingRight: '30px'
        },
        img: {
            marginTop: '15px',
            marginRight: '10px',
            paddingRight: "20px"
        },
        img2: {
            marginTop: '10px',
            marginRight: '-20px',
            paddingRight: "20px"
        },
        altTextColor:{
            color: '#904199',
            fontWeight: '600',
            marginTop: '-5px'
        },
        altTextColor2:{
            color: '#904199',
            fontWeight: '600',
            marginTop: '-70px'
        },
    };


    return (
    <div>
      <Header
        color="white"
        brand={<img width="240" height="40" resizeMode="contain" src={Logo2} alt="Logo2" />}
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
              <GridItem xs={5} sm={10} md={15} lg={20}> <br />
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Upcoming appointments",
                      tabIcon: Dashboard,
                      tabContent: (
                        <GridContainer justify="center">
                        <GridContainer justify="center">
                          <GridItem xs={20} sm={20} md={30} justify="center">
                            {appointments.map((item, index) => (
                              <Card style={{ background: "#F8F8F8", width: "47rem", borderColor: "primary" }}>
                                <CardBody>
                                  <img align="left" width="170" height="150" resizeMode="contain" src={profiles[item.mDoctorName]} alt="Profile1" style={style.img}/>
                                  <div>
                                  <h3 className={classes.cardTitle}><b>{item.mDoctorName}</b></h3>
                                  <h5><span style={style.altTextColor}>Date: </span>{item.mDisplayDate}</h5>
                                  <h5><span style={style.altTextColor}>Time:</span> {item.mDisplayTime}</h5>
                                  <h5><span style={style.altTextColor}>Reason for Visit:</span> {item.reason}</h5>
                                  <div>
                                  <Link to={"/patient/doctor/" + item.mEncodedDoctorUserName}>
                                    <Button color="primary" style={style.viewBtn}>
                                      View Doctor
                                    </Button>
                                  </Link>
                                  <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mDoctorName.split(' ')[0].toLowerCase() + item.mDoctorName.split(' ')[1].toLowerCase()}>
                                    <Button color="primary" style={style.chatBtn}>Chat with me</Button>
                                  </Link>
                                    <Button color="primary" onClick={(event) => { setModal(true); setCancelAppointment({ id: item.id }); }} style={style.cancelBtn}>
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
                                          <h3 className={modalClasses.modalTitle}><b>Cancel Appointment</b></h3>
                                      </DialogTitle>
                                      <DialogContent
                                        id="modal-slide-description"
                                        className={modalClasses.modalBody}
                                      >
                                        <div className={productClasses.section} style={{ padding: 0 }}>
                                          Are you sure you want to cancel this appointment?
                                        </div> <br />
                                        <Link to="/patient/dashboard">
                                          <Button color="primary" onClick={(event) => { setModal(false); handleCancelAppointments(); handleLoad(); }}>
                                            Yes
                                      </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <Button color="primary" onClick={() => setModal(false)}>
                                            No
                                      </Button>
                                        </Link>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  </div>
                                </CardBody>
                              </Card>))}
                          </GridItem>
                        </GridContainer>
                        </GridContainer>
                      )
                    },
                    {
                      tabName: "Past appointments",
                      tabIcon: List,
                      tabContent: (
                        <GridContainer justify="center">
                        <GridContainer justify="center">
                          <GridItem xs={20} sm={20} md={30}>
                            {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                            {pastAppointments.map((item, index) => (<Card style={{ background: "#F8F8F8", width: "47rem", borderColor: "primary" }}>
                              <CardBody>
                                <img align="left" width="170" height="150" resizeMode="contain" src={profiles[item.mDoctorName]} alt="Profile1" style={style.img}/>
                                <div style={{ marginLeft: "10px" }}>
                                <h3 className={classes.cardTitle}><b>{item.mDoctorName}</b></h3>
                                <h5><span style={style.altTextColor}>Date:</span> {item.mDisplayDate}</h5>
                                <h5><span style={style.altTextColor}>Time:</span> {item.mDisplayTime}</h5>
                                <h5><span style={style.altTextColor}>Reason for Visit:</span> {item.reason}</h5>
                                <Link to={"/patient/doctor/" + item.mEncodedDoctorUserName}>
                                  <Button color="primary" style={style.viewBtn2}>
                                    View Doctor
                                  </Button>
                                </Link> &nbsp;&nbsp;
                                <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mDoctorName.split(' ')[0].toLowerCase() + item.mDoctorName.split(' ')[1].toLowerCase()}>
                                    <Button color="primary" style={style.chatBtn}>Chat with me</Button>
                                </Link>
                                </div>
                              </CardBody>
                            </Card>))}
                          </GridItem>
                        </GridContainer>
                        </GridContainer>
                      )
                    },
                    {
                      tabName: "Unpaid Bills",
                      tabIcon: Payment,
                      tabContent: (
                        (
                          <div>
                              <GridContainer justify={"center"}>
                            {billsToBePaid.map((item, index) => (
                              <Card style={{ background: "#F8F8F8", width: "47rem", borderColor: "primary", align: "center" }}>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                        <img align="right" width="170" height="150" resizeMode="contain" src={profiles[item.doctorName]} alt="Profile1" style={style.img2}/>
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={7}>

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <h3 className={classes.cardTitle}><b>{item.doctorName}</b></h3>
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <h5><span style={style.altTextColor2}>Appointment Date:</span> {item.displayDate}</h5>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={12}>

                                                    <h5><span style={style.altTextColor2}>Co-Payment:</span> ${item.amountToBePaid}</h5>
                                                </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>

                                                <h5> <span style={style.altTextColor2}>Reason for Visit:</span> {item.reason}</h5>
                                            </GridItem>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                    <Button color="primary" style={style.payBtn} value={item.appointmentId} onClick={(event) => {handleAppointmentIdChange(item.appointmentId); setModal(true);}}>
                                      Make Payment
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
                                              <h3 className={modalClasses.modalTitle}><b>Pay Your Bill</b></h3>
                                          </DialogTitle>
                                          <DialogContent
                                              id="modal-slide-description"
                                              className={modalClasses.modalBody}
                                          >
                                              <GridContainer alignItems={"center"}>
                                                  <GridItem xs={12} sm={12} md={12}>
                                                      <CustomInput
                                                          labelText="Credit Card Number"
                                                          id="creditcardnumber"
                                                          formControlProps={{
                                                              fullWidth: true}}
                                                          inputProps={{
                                                              onChange: handleCCN,
                                                              endAdornment: (
                                                                  <InputAdornment position="end">
                                                                      <i className={"fas fa-credit-card"}/>
                                                                  </InputAdornment>
                                                              )
                                                          }}/>
                                                  </GridItem>
                                                  <GridItem xs={12} sm={12} md={6}>
                                                      <CustomInput
                                                          labelText="Expiration Date"
                                                          id="expiry"
                                                          formControlProps={{
                                                              fullWidth: true}}
                                                          inputProps={{
                                                              onChange: handleExpiry
                                                          }}/>
                                                  </GridItem>
                                                  <GridItem xs={12} sm={12} md={6}>
                                                      <CustomInput
                                                          labelText="CVV Number"
                                                          id="cvv"
                                                          formControlProps={{
                                                              fullWidth: true}}
                                                          inputProps={{
                                                              onChange: handleCVV
                                                          }}/>
                                                  </GridItem>
                                                  <GridItem xs={12} sm={12} md={12}>
                                                      <CustomInput
                                                          labelText="Name on the Card"
                                                          id="cardname"
                                                          formControlProps={{
                                                              fullWidth: true}}
                                                          inputProps={{
                                                              onChange: handleCardName,
                                                          }}/>
                                                  </GridItem>
                                                  <GridItem xs={12} sm={12} md={12}>
                                                      <CustomInput
                                                          labelText="Billing Address"
                                                          id="billingaddress"
                                                          formControlProps={{
                                                              fullWidth: true}}
                                                          inputProps={{
                                                              onChange: handleBillingAddress
                                                          }}/>
                                                  </GridItem>
                                                  <br />
                                              </GridContainer>
                                                  <GridContainer>
                                                      <GridItem xs={12} sm={12} md={3}/>
                                                      <GridItem xs={12} sm={12} md={3}>
                                                      <Link to="/patient/dashboard">
                                                          <Button color="primary" onClick={() => {handleBillPayment(); setModal(false)}}>
                                                              Pay
                                                          </Button>
                                                      </Link>
                                                      </GridItem>
                                                      <GridItem xs={12} sm={12} md={3}>
                                                      <Link to="/patient/dashboard">
                                                             <Button color="primary" onClick={() => setModal(false)}>
                                                                    Cancel
                                                             </Button>
                                                      </Link>
                                                  </GridItem>
                                              </GridContainer>
                                          </DialogContent>
                                      </Dialog>
                                        </GridItem>
                                    </GridContainer>

                                </CardBody>
                              </Card>
                            ))}
                              </GridContainer>
                          </div>
                        )
                      )
                    },
                    {
                      tabName: "Statistics",
                      tabIcon: PieChartIcon,
                      tabContent: (
                        <GridContainer align="left">
                          <GridItem xs={12} sm={12} md={6} align="left">
                            <h5 align="center"><span style={style.altTextColor}>Total amount spent from out-of-pocket: </span><b>${outOfPocketAmountSpent}</b></h5>
                            <h5 align="center"><span style={style.altTextColor}>Total amount remainaing in out-of-pocket: </span><b>${outOfPocketLimitRemaining}</b></h5>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <h5 align="center"><span style={style.altTextColor}>Total amount covered by insurance: </span><b>${totalAmountCoveredByInsurance}</b></h5>
                            <h5 align="center"><span style={style.altTextColor}>Total amount paid by you: </span><b>${totalAmountCoveredByPatient}</b></h5>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6} align="left">
                          <PieChart colors={["#F77114", "#00a0a0"]} data={[["Out-of-Pocket Spent", outOfPocketAmountSpent], ["Out-of-Pocket Remaining", outOfPocketLimitRemaining]]}/>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6} align="right">
                          <PieChart colors={["#F77114", "#00a0a0"]} data={[["Amount Covered by your Insurance", totalAmountCoveredByInsurance], ["Amount covered by you", totalAmountCoveredByPatient]]}/>
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
