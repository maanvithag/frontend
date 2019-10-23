import React from "react";

import API from "../../utils/API";
import User from "./User";

class RenderUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: null,
      cell: null,
      email: null,
      location: null
    };
  }

  render() {
    const { isLoading, name, cell, email, location } = this.state;

    return (
      <User isLoading={isLoading} name={name} cell={cell} email={email} location={location}/>
    );
  }

  async componentDidMount() {
    // Load async data.
    let userData = await API.get('/', {
      params: {
        results: 1,
        inc: 'name,cell,email,location'
      }
    });

        // Parse the results for ease of use.
    userData = userData.data.results[0];

    // Update state with new data and re-render our component.
    const name = `${userData.name.first} ${userData.name.last}`;
    const cell = userData.cell;
    const email = userData.email;
    const location = userData.location.city;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        name,
        cell,
        email,
        location
      }
    });
  }
}

export default RenderUser;