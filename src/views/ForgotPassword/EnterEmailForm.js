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

export default class EnterEmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailID: "",
            cardAnimaton: "cardHidden",
        };
        this.handleEmailIDChange = this.handleEmailIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailIDChange = event => {
        this.setState({ emailID: event.target.value });
    };

    handleSubmit = () => {
        const user = {
            emailID: this.state.emailID,
            isOtpAccurate: ""
        };

        window.localStorage.setItem("username", this.state.emailID);
        window.localStorage.setItem("isForgotPasswordFlow", "true");
        var targetUrl = window.localStorage.getItem("baseURL") + window.localStorage.getItem("userType") + '/forgotpassword/email';
    
        fetch(targetUrl, {
            method : 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json'},
            body: JSON.stringify({
                emailID: this.state.emailID
            })
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
                    <h4>Enter Email ID</h4>
                </CardHeader>
                <CardBody>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                            Don't worry, we've all been there. We'll help you reset your password.</p>
                    </div>
                    <CustomInput
                        labelText="Email ID"
                        id="username"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            onChange: this.handleEmailIDChange,
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

                {this.state.emailID != "" ? (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Link to={"/" + window.localStorage.getItem("userType") + "/mfa"}>
                            <Button color="primary" size="lg" onClick={this.handleSubmit}>
                                Check if valid user
                            </Button>
                        </Link>
                    </CardFooter>
                    ): (
                    <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                        <Button color="primary" size="lg">
                            Check if valid user
                        </Button>
                    </CardFooter>
                 )}

            </form>
        );
    }
}
