import React from 'react';
import Axios from "axios";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default class SignupButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cardAnimaton: 'cardHidden',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
  
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
        email: this.state.email,
        password: this.state.password
    };
    console.log(user);

    try {
        const response = Axios.post('https://infinity-care.herokuapp.com/signup/doctor', { user });
        console.log('👉 Returned data:', response);
        console.log('👉 You tried to log:', user);
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {    
    return (
        <div style={{padding: 0}}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <form >
                    <CardHeader color="primary" >
                        <h4>Sign up with</h4>
                        <div >
                        <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                        >
                            <i className={"fab fa-google"} />
                        </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CustomInput 
                        labelText="Email..."
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "email",
                            id: "email",
                            onChange: this.handleEmailChange,
                            endAdornment: (
                            <InputAdornment position="end">
                                <Email/>
                            </InputAdornment>
                            )
                        }}
                        />
                        <CustomInput 
                            labelText="Password"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                id: "password",
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
                    </CardBody>
                        <Button onClick={this.handleSubmit} style={{minWidth: "70%"}}  color="info">
                            {"Sign up: " + response}
                        </Button>
                    </form>
                </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
  }
}