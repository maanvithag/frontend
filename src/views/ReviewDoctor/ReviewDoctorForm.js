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

// TODO - modify form fields to better suit form
// TODO - links & backend
// TODO - delete & modify copy & pasted OTP code

export default class ReviewDoctorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            cardAnimaton: "cardHidden",
        };
        this.handleOTPChange = this.handleOTPChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOTPChange = event => {
        this.setState({ otp: event.target.value });
    };

    handleSubmit = event => {
        // TODO: Why did Jack add this line?
        //event.preventDefault();

        const user = {
            otp: this.state.otp,
            isOtpAccurate: ""
        };

        var targetUrl = 'https://infinity-care.herokuapp.com/otp/' + window.localStorage.getItem("userType");
        var queryString = "?otp=" + this.state.otp;

        axios({
            method : 'post',
            url: targetUrl + queryString,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            data : {
                username : this.state.username,
                password : this.state.password
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
                    <h4>Rate your Doctor</h4>
                </CardHeader>
                <CardBody>
                    <CustomInput
                        labelText="Rating"
                        id="rating"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                    <CustomInput
                        labelText="Date "
                        id="date"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomInput
                        labelText="Review"
                        id="review"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </CardBody>

                {this.state.newPassword === this.state.confirmPassword ? (
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
