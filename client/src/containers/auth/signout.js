import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/users';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  render() {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }
}

export default connect(null, {signoutUser})(Signout);