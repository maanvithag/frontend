/*eslint-disable*/
import React from "react";
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
import MenuIcon from '@material-ui/icons/Menu';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import {primaryColor} from "../assets/jss/material-kit-react";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {InputLabel} from "@material-ui/core";
import {string} from "prop-types";

const useStyles = makeStyles(styles);

export default function SignedInHeaders(props){
    const classes = useStyles();
    const [value, setValue] = React.useState('name');


    const inputLabel = React.useRef(null);
    const [keyword, setKeyword] = React.useState('doctor');
    const [link, setLink] = React.useState("sk");
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = event => {
        setKeyword(event.target.value);
    };
    const handleLinkChange = event => {
        setLink(event.target.value);
    };

    const handleSearch = event => {
        window.localStorage.setItem("searchItem", document.getElementById('inputEntry').value);
        window.localStorage.setItem("searchUserType", document.getElementById('inputUserType').value);
    };

    function hideMedicalDetails() {
        if (window.localStorage.getItem("userType") === "patient") {
            return true;
        } else {
            return false;
        }
    }

    const style = {
        btn: {
            color: 'white',
            fontSize: 'small',
            margin: '-10px',
            padding: '12px',
            width: '70px'
        },
        btnProfile: {
            color: 'white',
            fontSize: 'small',
            margin: '-20px',
            padding: '15px',
            width: '50px'
        },
        searchBar: {
            width: '100%',
            display: 'inline-block'
        },
        dropDown: {
            color: 'black',
            size: 'large',
            borderColor: "red"
        },
        menu:{
            fontSize:"large"
        },
        mt:{
            color:'black'
        }
    };

    return (
        <List className={classes.list} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <ListItem>
                <div style={{width:70, fontSize:"smaller"}}>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id={"inputUserType"}
                        value={keyword}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        defaultValue={"doctor"}

                        // might have to change this approach for showing default value

                    >
                        <MenuItem value={"doctor"} selected="selected">Doctor</MenuItem>
                        <MenuItem value={"insurance"}>Insurance</MenuItem>
                    </Select>
                </div>
            </ListItem>
            <ListItem>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width:300}}>
                    <CustomInput
                        id={"inputEntry"}
                        primary
                        style={style.searchBar}

                        inputRootCustomClasses={classes.inputRootCustomClasses}
                        formControlProps={{
                            className: classes.formControl,
                            fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Search",
                            inputProps: {
                                "aria-label": "Search",
                                className: classes.searchInput
                            }
                        }}
                    />

                    <Link to="/search">
                        <Button justIcon round color="github" onClick={handleSearch}> {/* Add onClick={handleSearch} */}
                            <Search className={classes.searchIcon} />
                        </Button>
                    </Link>
                </div>
            </ListItem>
            <ListItem>
                <ListItem className={classes.listItem}>
                    <Link to={"/"+ window.localStorage.getItem("userType") +"/chat"}>
                        <Button justIcon color="github" round onClick={handleSearch} style={style.btn}> {/* Add onClick={handleSearch} */}
                            Chat
                        </Button>
                    </Link>
                </ListItem>
            </ListItem>
            <ListItem>
                <div style={{width:70, fontSize:"smaller"}}>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id={"links"}
                        labelWidth={labelWidth}
                        style={style.dropDown}
                        // might have to change this approach for showing default value
                        value={link}
                        defaultValue={"sk"}

                    >

                        <MenuItem value="sk" selected="selected"><MenuIcon className={classes.icons} style={style.menu}/></MenuItem>
                        <Link to={"/"+ window.localStorage.getItem("userType") +"/profile"}>
                            <MenuItem value={"profile"} style={style.mt}>Profile</MenuItem>
                        </Link>
                        {hideMedicalDetails() && (<Link to="/patient/medicalhistory">
                            <MenuItem value={"medicalHistory"} style={style.mt}>Medical History</MenuItem>
                        </Link>)}
                        <Link to="/">
                            <MenuItem value={"signOut"} style={style.mt}>Sign Out</MenuItem>
                        </Link>

                    </Select>
                </div>
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

