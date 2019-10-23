import React from "react";
import PropTypes from "prop-types";

class User extends React.Component {
  render() {
    const { name, cell, email, location, isLoading } = this.props;

    const userDetails = (
      <div>
        <h4 className="mb-0">{name}</h4>
        <span className="text-muted">Number: {cell}</span><br />
        <span className="text-muted">Email: {email}</span><br />
        <span className="text-muted">Location city: {location}</span><br />
      </div>
    );

    const loadingMessage = <span className="d-flex m-auto">Loading...</span>;

    return (
      <p>
        {isLoading ? loadingMessage : userDetails}
      </p>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  cell: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  isLoading: PropTypes.bool
};

export default User;