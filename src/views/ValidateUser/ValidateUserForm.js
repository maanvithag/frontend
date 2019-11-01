import React from "react";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import {Link} from "react-router-dom";
import axios from "axios"
import ForgotPassword from "views/ForgotPassword/ForgotPasswordPage";

export default class ValidateUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            cardAnimaton: "cardHidden",
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
    };

    handleSubmit = event => {

        const user = {
            username: this.state.username,
            isValidUser: ""
        };

        var targetUrl = 'https://infinity-care.herokuapp.com/validateuser/' + window.localStorage.getItem("userType");
        var queryString = "?username=" + this.state.username;
    
        axios({
            method : 'post',
            url: targetUrl + queryString,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            data : {
              username : this.state.username,
            }
          }).then(res => {
            if(user.isValidUser) {
                this.setState({successful: true})
            }
          }).catch(() => {
            this.setState({successful: true})
          })
    };

    render() {
        return (
            <form>
                <CardHeader color="primary">
                    <h4>Enter Username</h4>
                </CardHeader>
                <CardBody>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                            Please enter your username</p>
                    </div>
                    <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "username",
                            onChange: this.handleUsernameChange,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon>
                                        lock_outline
                                    </Icon>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                </CardBody>
                <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                    <Link to={"forgotpassword"}>
                        <Button color="primary" size="lg" onClick={this.handleSubmit}>
                            Authenticate Account
                        </Button>
                    </Link>
                </CardFooter>
            </form>
        );
    }
}
