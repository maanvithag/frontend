import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
import {Link} from "react-router-dom";

export default class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            // If initially both the passwords are the same, then clicking the Submit button would lead to the next page. The code is such that until and
            // unless both the passwords are same, the submit button wouldn't render a new page
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
        var targetUrl = window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + "/forgotpassword";
        fetch(targetUrl, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body : JSON.stringify({
                password : this.state.newPassword
            })
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

                {this.state.newPassword === this.state.confirmPassword ? (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Link to={"dashboard"}>
                            <Button color="primary" size="lg" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Link>
                    </CardFooter>
                    ): (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Button color="primary" size="lg">
                            Submit
                        </Button>
                    </CardFooter>
                 )}
            </form>
        );
    }
}
