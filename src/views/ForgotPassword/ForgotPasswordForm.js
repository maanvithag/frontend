import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import {Link} from "react-router-dom";
import axios from "axios"

export default class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "password",
            cardAnimaton: "cardHidden",
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePasswordChange = event => {
        this.setState({ newPassword: event.target.value });
    };

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value });
    }

    handleSubmit = () => {

        const user = {
            otp: this.state.newPassword,
            isOtpAccurate: ""
        };

        var targetUrl = 'https://infinity-care.herokuapp.com/' + window.localStorage.getItem("userType") + "/forgotpassword";
    
        axios({
            method : 'post',
            url: targetUrl,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            data : {
                username : window.localStorage.getItem("username"),
                newPassword : this.state.newPassword
            }
            }).then(res => {
            if(user.isOtpAccurate) {
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
                    <h4>Enter New Password</h4>
                </CardHeader>
                <CardBody>
                    <CustomInput
                        labelText="New Password"
                        id="newPassword"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            onChange: this.handlePasswordChange,
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

                    <CustomInput
                        labelText="Confirm Password"
                        id="confirmPassword"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            onChange: this.handleConfirmPasswordChange,
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

                {this.state.newPassword == this.state.confirmPassword ? (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Link to={"mfa"}>
                            <Button color="primary" size="lg" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Link>
                    </CardFooter>
                    ): (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Button color="primary" size="lg" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </CardFooter>
                 )}
            </form>
        );
    }
}
