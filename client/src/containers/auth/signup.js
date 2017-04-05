import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container h-100">
      <div className="row h-100 justify-content-center">
      <div className="col col-sm-6 col-md-4 my-auto">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="form-group">
            <label>Username</label>
            <Field
              component="input"
              type="text"
              name="username"
              placeholder="Username"
              className="form-control" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <Field
              component="input"
              type="text"
              name="email"
              placeholder="Email"
              className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field
              component="input"
              type="password"
              name="password"
              placeholder="Password"
              className="form-control" />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <Field
              component="input"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              className="form-control" />
          </div>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </span>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup'
})(Signup);

export default connect(mapStateToProps, actions)(Signup);