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
  const [addplan, setAddPlan] = useState({
    name: "",
    provider: "",
    price: "",
    details: "",
    isIplansUpdated: false
  })
  const [deleteplan, setDeletePlan] = useState({
    name: "",
    isIplansUpdated: false
  });

  const handleLoad = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/iplans', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(response => response.json())
    .then(data => {
      setIplans(data.IPlans)
      setPatients(data.Patients)
    })
  }
  useEffect(() => {handleLoad()},[])

  const handleDeletePlan = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/editiplans/delete', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        iplanname: deleteplan.name
      }) 
    }).then(response => response.json())
    .then(data => {
      setDeletePlan(data.isIplansUpdated)
    })
  }

  const handleAddPlan = (event) => {
    fetch(window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/editiplans/add', {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        name: addplan.name,
        provider: addplan.provider,
        price: addplan.price,
        details: addplan.details
      }) 
    }).then(response => response.json())
    .then(data => {
      setAddPlan(data.isIplansUpdated)
    })
  }

  console.log(patients);

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
              <GridItem xs={12} sm={12} md={8} lg={6}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "IP plans",
                    tabIcon: Dashboard,
                    tabContent: (
                      <GridContainer>
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
                                <h3 className={modalClasses.modalTitle}>Add Plan</h3>
                              </DialogTitle>
                              <DialogContent
                                id="modal-slide-description"
                                className={modalClasses.modalBody}>
                              <CustomInput
                                labelText="Name"
                                id="rating"
                                formControlProps={{
                                    fullWidth: true}}/>
                              <CustomInput
                                labelText="Provider"
                                id="rating"
                                formControlProps={{
                                    fullWidth: true}}/>
                              <CustomInput
                                labelText="Price"
                                id="rating"
                                formControlProps={{
                                    fullWidth: true}}/>
                              <CustomInput
                                labelText="Details of the Plan"
                                id="medical-info"
                                formControlProps={{
                                    fullWidth: true}}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,}}/> <br/> <br/>
                              <Link to="/insurance/dashboard"> 
                                  <Button color="primary" onClick={(event) => {setAddModal(false);}}>
                                    Add Plan
                                  </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </Link>
                              </DialogContent>
                            </Dialog>
                          </div>
                          { iplans.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.mName}</h4>
                            <p>Price: {item.price}</p>
                            <p>Details: {item.mDetails}</p>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <DeleteIpPlan/> */}
                            <div>
                            <Button color="primary" onClick={(event) => {setDeleteModal(true); setDeletePlan({iplanname: item.mName});}}>
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
                                  <Button color="primary" onClick={(event) => {setDeleteModal(false); handleDeletePlan();}}>
                                    Yes
                                  </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button color="primary" onClick={(event) => {setDeleteModal(false); handleLoad();}}>
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
                    tabButton: "Patients",
                    tabIcon: List,
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <ul><li>Quote: {JSON.stringify(appointments)}</li></ul> */}
                          { patients.map((item, index) => (<Card style={{width: "20rem", borderColor: "primary"}}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.name}</h4> 
                            <Link to= {"/insurance/patient/" + btoa(item.username)}>
                              <Button color="primary">
                                View Patient
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
