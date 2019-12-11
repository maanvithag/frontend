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
import Logo2 from "../../assets/img/logo2.png";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  const [billsToBePaid, setBillsToBePaid] = useState([])
  const [isBillPaid, setIsBillPaid] = useState("")
  const [totalOutOfPocketAmount, setTotalOutOfPocketAmount] = useState("")
  const [totalAmountCoveredByInsurance, setTotalAmountCoveredByInsurance] = useState("")
  const [totalInProcessAmountByInsurance, setTotalInProcessAmountByInsurance] = useState("")
  const [totalAmountDeniedByInsurance, setTotalAmountDeniedByInsurance] = useState("")
  const [cancelAppointment, setCancelAppointment] = useState({
    id: 0,
    isAppointmentCancelled: false
  })

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/getappointments', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(response => response.json())
      .then(data => {
        setAppointments(data.CurrentAppointments)
        setPastAppointments(data.PastAppointments)
        setBillsToBePaid(data.billsToBePaid)
        setTotalOutOfPocketAmount(data.totalOutOfPocketAmount)
        setTotalAmountCoveredByInsurance(data.totalAmountCoveredByInsurance)
        setTotalInProcessAmountByInsurance(data.totalInProcessAmountByInsurance)
        setTotalAmountDeniedByInsurance(data.totalAmountDeniedByInsurance)
        const chatusername = data.CurrentAppointments[0].mPatientName.split(' ')[0].toLowerCase() + data.CurrentAppointments[0].mPatientName.split(' ')[1].toLowerCase();
        window.localStorage.setItem("chatusername", chatusername);
        // if (Object.keys(data.CurrentAppointments).length === 0 && data.CurrentAppointments.constructor === Object) {
        //   const chatusername = data.CurrentAppointments[0].mPatientName.split(' ')[0].toLowerCase() + data.CurrentAppointments[0].mPatientName.split(' ')[1].toLowerCase();
        //   window.localStorage.setItem("chatusername", chatusername);
        // }
      })
  }
  useEffect(() => { handleLoad() }, [cancelAppointment, isBillPaid])

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

  function handleBillPayment(appointmentId) {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/bills/pay', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        id: appointmentId
      })
    }).then(response => {
      // UPDATE to the below parameter makes the whole component reload. Handle with care during refactoring
      setIsBillPaid(response)
    })
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
    viewBtn: {
      marginRight: '10px',
      paddingLeft: '35px',
      paddingRight: '35px'
    },
    chatBtn: {
      paddingLeft: '35px',
      paddingRight: '35px'
    }
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
            <GridContainer justify="space-around">
              <GridItem xs={5} sm={10} md={15} lg={20}> <br />
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Upcoming appointments",
                      tabIcon: Dashboard,
                      tabContent: (
                        <GridContainer>
                          <GridItem xs={20} sm={20} md={30}>
                            {appointments.map((item, index) => (
                              <Card style={{ width: "40rem", borderColor: "primary" }}>
                                <CardBody>
                                  <h5 className={classes.cardTitle}><b>{item.mDoctorName}</b></h5>
                                  <p>Date: {item.mDisplayDate}</p>
                                  <p>Time: {item.mDisplayTime}</p>
                                  <p>Reason for Visit: {item.reason}</p>
                                  <Link to={"/patient/doctor/" + item.mEncodedDoctorUserName}>
                                    <Button color="primary" style={style.viewBtn}>
                                      View Doctor
                                    </Button>
                                  </Link>
                                  <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mDoctorName.split(' ')[0].toLowerCase() + item.mDoctorName.split(' ')[1].toLowerCase()}>
                                    <Button color="primary" style={style.chatBtn}>Chat with me</Button>
                                  </Link>
                                  <div>
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
                                </CardBody>
                              </Card>))}
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabName: "Past appointments",
                      tabIcon: List,
                      tabContent: (
                        <GridContainer>
                          <GridItem xs={20} sm={20} md={30}>
                            {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                            {pastAppointments.map((item, index) => (<Card style={{ width: "40rem", borderColor: "primary" }}>
                              <CardBody>
                                <h5 className={classes.cardTitle}><b>{item.mDoctorName}</b></h5>
                                <p>Date: {item.mDisplayDate}</p>
                                <p>Time: {item.mDisplayTime}</p>
                                <p>Reason for Visit: {item.reason}</p>
                                <Link to={"/patient/doctor/" + item.mEncodedDoctorUserName}>
                                  <Button color="primary">
                                    View Doctor
                                  </Button>
                                </Link> &nbsp;&nbsp;
                                <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mDoctorName.split(' ')[0].toLowerCase() + item.mDoctorName.split(' ')[1].toLowerCase()}>
                                    <Button color="primary" style={style.chatBtn}>Chat with me</Button>
                                </Link>
                              </CardBody>
                            </Card>))}
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabName: "Unpaid Bills",
                      tabIcon: Payment,
                      tabContent: (
                        (
                          <div>
                            <GridContainer align="left">
                              <GridItem xs={12} sm={12} md={6} align="left">
                              <h5 align="center">Total amount to be paid out of pocket: <b>${totalOutOfPocketAmount}</b></h5>
                              <h5 align="center">Total amount covered by insurance: <b>${totalAmountCoveredByInsurance}</b></h5>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                              <h5 align="center">Total amount yet to be covered by insurance: <b>${totalInProcessAmountByInsurance}</b></h5>
                              <h5 align="center">Total amount denied by insurance: <b>${totalAmountDeniedByInsurance}</b></h5>
                              </GridItem>
                            </GridContainer>
                            {billsToBePaid.map((item, index) => (
                              <Card style={{ background: "#F8F8F8", width: "25rem", borderColor: "primary", align: "center" }}>
                                <CardBody>
                                  <h3 className={classes.cardTitle}><b>{item.doctorName}</b></h3>
                                  <h5 style={style.altTextColor}>Reason for visit: {item.reason}</h5>
                                  <h5>Date: {item.displayDate}</h5>
                                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <h5>Co-pay: ${item.amountToBePaid}</h5>
                                    <Button color="primary" style={style.btn} value={item.appointmentId} onClick={(event) => { setModal(true);}}>
                                      Pay
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
                                                          <Button color="primary" onClick={() => handleBillPayment(item.appointmentId)}>
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
                                  </div>
                                  <Button fullWidth color="primary" style={style.btn}>
                                    Claim
                                  </Button>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                        )
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
