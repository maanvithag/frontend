import React from 'react';
import { Link } from "react-router-dom";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Email from "@material-ui/icons/Email";
import LocalHospital from "@material-ui/icons/LocalHospital";
import People from "@material-ui/icons/People";
import Note from "@material-ui/icons/Note";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import loginStyles from "assets/jss/material-kit-react/views/loginPage.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useLoginStyles = makeStyles(loginStyles);

export default function SignupForm() {
  const [modal, setModal] = React.useState(true);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const modalClasses = useModalStyles();
  const loginClasses = useLoginStyles();
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  
  return (
    <div>
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
          <Link to="/login">
          <IconButton
            className={modalClasses.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={modalClasses.modalClose} />
          </IconButton>
          </Link>
          <h3 className={modalClasses.modalTitle}>Step 2 of 2</h3>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={modalClasses.modalBody}
        >
        <div className={loginClasses.container} style={{padding: 0}}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                <Card className={loginClasses[cardAnimaton]}>
                    <form className={loginClasses.form}>
                    <CardHeader color="primary" className={loginClasses.cardHeader}>
                        <h4>Sign up with</h4>
                        <div className={loginClasses.socialLine}>
                        <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                        >
                            <i className={"fab fa-google"} />
                        </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "email",
                            endAdornment: (
                            <InputAdornment position="end">
                                <Email className={loginClasses.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />
                        <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            endAdornment: (
                            <InputAdornment position="end">
                                <Icon className={loginClasses.inputIconsColor}>
                                lock_outline
                                </Icon>
                            </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                        />
                    </CardBody>
                    </form>
                </Card>
                </GridItem>
            </GridContainer>
        </div>
        </DialogContent>
        <DialogActions
          className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
        >
          <Link to="/login">
          <Button style={{minWidth: "70%"}} onClick={() => setModal(false)} color="info">
            Sign up
          </Button>
          </Link>
        </DialogActions>
        <CustomLinearProgress
            variant="determinate"
            color="primary"
            value={100}
          />
      </Dialog>
    </div>
  );
}