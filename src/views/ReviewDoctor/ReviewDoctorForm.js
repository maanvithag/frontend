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
//

export default class ReviewDoctorForm extends React.Component {
    handleSubmit = () => {
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
