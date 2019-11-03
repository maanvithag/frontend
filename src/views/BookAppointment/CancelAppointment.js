import React from 'react';
import { Link } from "react-router-dom";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

// core components
import Button from "components/CustomButtons/Button.js";

import modalStyles from "assets/jss/material-kit-react/modalStyle.js";
import productStyles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useModalStyles = makeStyles(modalStyles);
const useProductStyles = makeStyles(productStyles);

export default function CancelAppointment() {
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const productClasses = useProductStyles();

  return (
    <div>
      <Button color="primary" onClick={() => setModal(true)}>
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
            </div>
            <Link to="/dashboard2"> 
                <Button color="primary" onClick={() => setModal(false)}>
                  Yes
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="primary" onClick={() => setModal(false)}>
                  No
                </Button>
            </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}