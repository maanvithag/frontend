import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/List";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Close from "@material-ui/icons/Close";
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
import CustomInput from "components/CustomInput/CustomInput.js";

// core components
import Header from "components/Header/Header.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AddIpPlan from "views/Dashboards/AddIpPlan.js";
import DeleteIpPlan from "views/Dashboards/DeleteIpPlan.js";
import SignedInHeaders from "views/SignedInHeader.js";
import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {primaryColor} from "../../assets/jss/material-kit-react";
import InputLabel from "@material-ui/core/InputLabel";
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
  const [deletemodal, setDeleteModal] = React.useState(false);
  const [addmodal, setAddModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const productClasses = useProductStyles();
  const [iplans, setIplans] = useState([]);
  const [patients, setPatients] = useState([]);
  const [profile, setProfile] = useState({});

  const [updatedPlanName, setUpdatedPlanName] = useState('')
  const [addPlanName, setAddPlanName] = useState('');
  const [addPlanPremium, setAddPlanPremium] = useState('');
  const [addPlanDeductible, setAddPlanDeductible] = useState('');
  const [addPlanCopayment, setAddPlanCopayment] = useState('');
  const [addPlanOutOfPocketLimit, setAddPlanOutOfPocketLimit] = useState('');
  const [addPlanLevel, setAddPlanLevel] = useState("bronze");

  const [deleteplan, setDeletePlan] = useState({
    name: "",
    company: "",
    premium: "",
    copayment: "",
    deductible: "",
    outofpocketlimit: "",
    level: "",
    isIplansUpdated: false
  });

  const handleUsername = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/profile', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
      .then(data => {
        const chatusername = data.firstname.toLowerCase() + data.lastname.toLowerCase();
        window.localStorage.setItem("chatusername", chatusername);
      })
  }

  const handleLoad = () => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/iplans', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setProfile(data)
      setIplans(data.IPlans)
      setPatients(data.Patients)
    })
  };
  useEffect(() => {handleLoad(); handleUsername();},[updatedPlanName]);

  const handleDeletePlan = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/editiplans/delete', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        premium: deleteplan.premium,
        company: deleteplan.company,
        level: deleteplan.level,
        deductible: deleteplan.deductible,
        copayment: deleteplan.copayment,
        outofpocketlimit: deleteplan.outofpocketlimit,
        name: deleteplan.name
      }) 
    }).then(response => response.json())
    .then(data => {
      setUpdatedPlanName(data.planName)
    })
  };

  const handleAddPlan = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/editiplans/add', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        premium: event.premium,
        deductible: event.deductible,
        copayment: event.copayment,
        outofpocketlimit: event.outofpocketlimit,
        level: event.level,
        name: event.name
      }) 
    }).then(response => response.json())
    .then(data => {
      setUpdatedPlanName(data.planName)
    })
  };

  const handleAddPlanLevel = event => {
    setAddPlanLevel(event.target.value);
  };

  const handleAddPlanName = (event) => {
    setAddPlanName(event.target.value)
  };

  const handleAddPlanPremium = (event) => {
    setAddPlanPremium(event.target.value)
  };

  const handleAddPlanOutOfPocketLimit = (event) => {
    setAddPlanOutOfPocketLimit(event.target.value)
  };

  const handleAddPlanDeductible = (event) => {
    setAddPlanDeductible(event.target.value)
  };

  const handleAddPlanCopayment = (event) => {
    setAddPlanCopayment(event.target.value)
  };

  const style = {
    bg: {
      background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
      color: 'black',
      borderRadius: 5
    },
    drop:{
      color: '#9e9e9e',
      fontSize: '90%',
      marginTop: '15px',
      marginBottom: '5px'
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
            <GridContainer justify="center">
            <GridItem xs={5} sm={10} md={15} lg={20}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "IP plans",
                    tabIcon: Dashboard,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                        {/* <AddIpPlan/> */}
                          <div>
                            <Button color="primary" onClick={() => setAddModal(true)}>
                              Add new plan
                            </Button>
                            <Dialog
                              modalClasses={{
                                root: modalClasses.center,
                                paper: modalClasses.modal}}
                              open={addmodal}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={() => setAddModal(false)}
                              aria-labelledby="modal-slide-title"
                              aria-describedby="modal-slide-description">
                              <DialogTitle
                                id="classic-modal-slide-title"
                                disableTypography
                                className={modalClasses.modalHeader}>
                                <IconButton
                                  className={modalClasses.modalCloseButton}
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  onClick={() => setAddModal(false)}>
                                  <Close className={modalClasses.modalClose} />
                                </IconButton>
                                <h3 className={modalClasses.modalTitle}>Add Insurance Plan</h3>
                              </DialogTitle>
                              <DialogContent
                                id="modal-slide-description"
                                className={modalClasses.modalBody}>
                                <GridContainer alignItems={"center"}>
                                  <GridItem xs={12} sm={12} md={12}>

                                        <CustomInput
                                      labelText="Plan Name"
                                      id="name"
                                      formControlProps={{
                                          fullWidth: true}}
                                      inputProps={{
                                        onChange: handleAddPlanName
                                      }}/>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel style={style.drop}>Insurance Plan Type</InputLabel>
                                    <Select
                                        labelId="level"
                                        id="level"
                                        value={addPlanLevel}
                                        onChange={handleAddPlanLevel}
                                        defaultValue={"bronze"}

                                        // might have to change this approach for showing default value

                                    >
                                      <MenuItem value={"bronze"}>Bronze</MenuItem>
                                      <MenuItem value={"silver"}>Silver</MenuItem>
                                      <MenuItem value={"gold"}>Gold</MenuItem>
                                      <MenuItem value={"platinum"}>Platinum</MenuItem>
                                    </Select>
                                  </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                labelText="Monthly Premium"
                                id="premium"
                                formControlProps={{
                                    fullWidth: true}}
                                inputProps={{
                                  onChange: handleAddPlanPremium
                                }}/>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Deductible"
                                    id="deductible"
                                    formControlProps={{
                                      fullWidth: true}}
                                    inputProps={{
                                      onChange: handleAddPlanDeductible
                                    }}/>
                                </GridItem>
                                  <GridItem xs={12} sm={12} md={6}>

                                  <CustomInput
                                    labelText="Co-Payment"
                                    id="copayment"
                                    formControlProps={{
                                      fullWidth: true}}
                                    inputProps={{
                                      onChange: handleAddPlanCopayment
                                    }}/>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={6}>

                                  <CustomInput
                                    labelText="Annual Out-of-Pocket Limit"
                                    id="outofpocketlimit"
                                    formControlProps={{
                                      fullWidth: true}}
                                    inputProps={{
                                      onChange: handleAddPlanOutOfPocketLimit
                                    }}/>
                                  </GridItem>
                                </GridContainer>
                                  <br/>
                                <GridContainer justify="center">
                              <Link to="/insurance/dashboard"> 
                                  <Button color="primary" onClick={(event) => {setAddModal(false); 
                                    handleAddPlan({name: addPlanName, premium: addPlanPremium, outofpocketlimit: addPlanOutOfPocketLimit, deductible: addPlanDeductible, copayment: addPlanCopayment, level: addPlanLevel});}}>
                                    Add Insurance Plan
                                  </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </Link>
                                </GridContainer>
                              </DialogContent>
                            </Dialog>
                          </div>
                          { iplans.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.mName}</h4>
                            <p>Monthly Premium: {item.premium}/month</p>
                            <p>Deductible: {item.deductible}</p>
                            <p>Co-Payment: {item.coPayment}</p>
                            <p>Annual Out-of-Pocket Limit: {item.annualOutOfPocketLimit}</p>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <DeleteIpPlan/> */}
                            <div>
                            <Button color="primary" onClick={(event) => {setDeleteModal(true); 
                              setDeletePlan({name: item.mName, premium: item.mPremium, company: item.mCompany, level: item.mLevel, outofpocketlimit: item.mOutOfPocketLimit, deductible: item.mDeductible, copayment: item.mCopayment});}}>
                              Delete
                            </Button>
                            <Dialog
                              modalClasses={{
                                root: modalClasses.center,
                                paper: modalClasses.modal
                              }}
                              open={deletemodal}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={() => setDeleteModal(false)}
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
                                  onClick={() => setDeleteModal(false)}
                                >
                                  <Close className={modalClasses.modalClose} />
                                </IconButton>
                                <h3 className={modalClasses.modalTitle}>Delete Plan</h3>
                              </DialogTitle>
                              <DialogContent
                                id="modal-slide-description"
                                className={modalClasses.modalBody}
                              >
                              <div className={productClasses.section} style={{padding: 0}}>
                                Are you sure you want to delete this plan?
                              </div> <br/>
                              <Link to="/insurance/dashboard"> 
                                  <Button color="primary" onClick={(event) => {setDeleteModal(false); handleDeletePlan(); handleLoad();}}>
                                    Yes
                                  </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button color="primary" onClick={(event) => {setDeleteModal(false);}}>
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
                    tabName: "Patients",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          { patients.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.mFirstName} {item.mLastName}</h4> 
                            <p>Current Plan: {item.mInsurancePlan}</p>
                            <Link to= {"/insurance/patient/" + btoa(item.mUserName)}>
                              <Button color="primary">
                                View Patient
                              </Button>
                              <Link to={"/chat/" + window.localStorage.getItem("chatusername") + "/" + item.mFirstName.toLowerCase() + item.mLastName.toLowerCase()}>
                                <Button color="primary">Send me a text</Button>
                              </Link>
                            </Link>
                          </CardBody>
                        </Card>))}
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabName: "Claims",
                    tabIcon: List,
                    tabContent: (
                      <div>
                        <p>Total of claims that needs approval:</p>
                        <Card style={{ width: "40rem", borderColor: "primary" }}>
                            <CardBody>
                            <h3 className={classes.cardTitle}><b>Patient Name</b></h3>
                            <h5 style={style.altTextColor}>Reason</h5>
                            <h5 style={style.altTextColor}>Claim amount</h5>
                            <Button fullWidth color="primary" style={style.btn}>
                                Approve
                            </Button>
                            </CardBody>
                        </Card>
                    </div>
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
