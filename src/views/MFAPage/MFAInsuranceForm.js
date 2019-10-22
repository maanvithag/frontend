import React from "react";
import Axios from "axios";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter";
import TypeSelect from "views/Modals/TypeSelect.js";
import {Link} from "react-router-dom";

export default class MFAInsuranceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            cardAnimaton: "cardHidden"
        };
        this.handleOTPChange = this.handleOTPChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOTPChange = event => {
        this.setState({ otp: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            otp: this.state.otp,
            isOtpAccurate: ""
        };
        console.log(user);

        var targetUrl = 'http://infinity-care.herokuapp.com/otp/insurance';
        var queryString = "?otp=" + this.state.otp;
    
        fetch(targetUrl + queryString, {
                method: 'POST',
                credentials: "same-origin", 
                headers: {Accept: 'application/json', 'Content-Type': 'application/json',},
            })
        .then(res => {
          console.log(user)
          if(user.isOtpAccurate) {
            this.setState({successful: true})
          }
        })
    };


    render() {
        return (
            <form>
                <CardHeader color="primary">
                    <h4>Enter OTP</h4>
                </CardHeader>
                <CardBody>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>
                            Submit the one time password code sent to your email</p>
                    </div>
                    <CustomInput
                        labelText="One time password"
                        id="otp"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "otp",
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
                    <Link to="/insurance">
                        <Button color="primary" size="lg">
                            Authenticate Account
                        </Button>
                    </Link>
                </CardFooter>
            </form>
        );
    }
}
