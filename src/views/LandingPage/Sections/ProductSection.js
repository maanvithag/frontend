import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const style = {
    name: {
      color: '#37474f',
      fontWeight: 'bold'
    },
    spec: {
      color: '#37474f'
    },
    body: {
      fontSize: '14px',
      lineHeight: '175%'
    }
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title}>Featured Doctors</h2>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <h3 className={classes.description} style={style.name}>Kristen Nash</h3>
            <h4 className={classes.description} style={style.spec}>Dermatologist</h4>
            <h4 className={classes.description} style={style.body}>Dr. Nash is a trusted and reputable dermatologist caring for the Avon, IN community. She attended Ohio State University where he received her medical degree. Dr. Nash is a part of IU Health Dermatology. She is board certified in dermatology by the American Board of Dermatology. During her consultations, she fully explains patients’ conditions and helps them choose an appropriate treatment plan.</h4>
          </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <h3 className={classes.description} style={style.name}>Jaime Moore</h3>
              <h4 className={classes.description} style={style.spec}>Primary Care</h4>
              <h4 className={classes.description} style={style.body}>Dr. Jaime Moore received her medical degree from Indiana University School of Medicine. Dr. Moore takes care of the Mooresville, IN community and is affiliated with Indiana University Health, West Hospital. Dr. Moore continued her training and completed residencies in internal medicine and pediatrics at Indiana University School of Medicine. </h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <h3 className={classes.description} style={style.name}>Massimo Rossi</h3>
              <h4 className={classes.description} style={style.spec}>Gastroenterologist</h4>
              <h4 className={classes.description} style={style.body}> Dr. Rossi is a trusted and reliable gastroenterologist caring for the Martinsville, IN community. Dr. Rossi attended Case Western Reserve University, where he received his medical degree. He is a part of IU Health Physicians Digestive & Liver Disorders and is affiliated with Indiana University Hospital in IN. He is board certified in gastroenterology and internal medicine by the American Board of Internal Medicine. </h4>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>One-stop-shop for health care</h2>
          <h5 className={classes.description}>
            We provide a patient-centric application that allows you to make informed decisions 
            regarding your health in the comfort of your own home. Some of our features include:
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Verified Doctors"
              description="All of the doctors on our network are verified and trusted. We do the research
              for you. Each doctor will be available for live-chat as well as any inquiries regarding your
              symptons, healthcare policy, etc."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Secure"
              description="Your information security is our top priority. Any data regarding our users 
              are strictly kept within the system and affiliated doctors/insurances. Third-party authorization
              and sales of personal information is strictly forbidden."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
                title="Free Chat"
                description="Live-chat with your doctors regarding questions, appointments and more.
              You can also live-chat with your healthcare representive to learn more about your insurance
              and other questions."
                icon={Chat}
                iconColor="info"
                vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
