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
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import Search from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import {primaryColor} from "../assets/jss/material-kit-react";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function SignedInHeaders(props){ 
  const classes = useStyles();
  const [value, setValue] = React.useState('name');

  // const handleChange = event => {
  //   setValue(event.target.value);
  // };

  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <List className={classes.list} style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
      <ListItem>
      <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox 
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={state.checkedA} 
            onChange={handleChange('checkedA')} 
            color="primary"
            value="checkedA" 
          />
        }
        label="Name"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            color="primary"
            value="checkedB"
          />
        }
        label="Specialization"
      />
      </FormGroup>
      </ListItem>
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
        <Link to="/doctorsearch/search">
        <Button justIcon round color="primary"> {/* Add onClick={handleSearch} */}
          <Search className={classes.searchIcon} />
        </Button>
        </Link>
      </div>
      </ListItem>
      <ListItem>
      <ListItem className={classes.listItem}>
          <Link to="profile/:ID">
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
          </Link>
      </ListItem>
      </ListItem>
      <ListItem>
        <Link to="/" className={classes.link}>
          <Button color="primary" onClick={handleSignOut}>
            Sign out
          </Button>
        </Link> 
      </ListItem>
    </List>
  );
}

function handleSignOut() {
  var targetUrl = window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/signout';
  fetch(targetUrl, {
      method : 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    }).then(res => {
    }).catch(() => {
  })
};

// TODO onSearch() fetch request gets blocked by CORS. Figure our why!