/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import TypeSelect from "views/Modals/TypeSelect.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import Search from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function SignedInHeaders(props) {
  const classes = useStyles();
  return (
    <List className={classes.list} style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
      <ListItem>
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <CustomInput
          primary
          inputRootCustomClasses={classes.inputRootCustomClasses}
          formControlProps={{
            className: classes.formControl
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              className: classes.searchInput
            }
          }}
        />
        <Button justIcon round color="primary">
          <Search className={classes.searchIcon} />
        </Button>
      </div>
      </ListItem>
      <ListItem>
      <ListItem className={classes.listItem}>
        <Button
        /*
          href="#pablo"
          className={classes.navLink}
          onClick={e => e.preventDefault()}
          */
          color="primary"
        >
          <AccountCircle className={classes.icons} /> Profile
        </Button>
      </ListItem>
      </ListItem>
      <ListItem>
        <Link to="/" className={classes.link}>
          <Button color="primary">
            Sign out
          </Button>
        </Link> 
      </ListItem>
    </List>
  );
}