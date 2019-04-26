// Purpose of this component: to show just the relevant user (not the API data / big array of all users).

import React from "react";
import { connect } from "react-redux";

class UserHeader extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return <div className="header">{user.name}</div>;
  }
}

// Rather than finding appropriate user inside component, extract logic into mapStateToProps.

//ownProps argument is a reference of the props in the component
const mapStateToProps = (state, ownProps) => {
  // Use built-in JS find() method on arrays to find appropriate user
  // Call it with a function () =>
  // This function will be invoked w/ every element inside that array.
  // Refer argument 'user'.
  // As soon as we return TRUE from the inner function (after the fat arrow),
  // the entire .find() function is going to stop and return whatever element we have returned true for.
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
