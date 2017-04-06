import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
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

  renderField({input,label,type, meta: {touched, error, warning}}) {
    let vstyle = ''
    let dstyle = ''
    if(touched && error) {
      vstyle = 'form-control form-control-danger'
      dstyle = 'form-group has-danger'
    } else if(touched && warning) {
      vstyle = 'form-control form-control-success'
      dstyle = 'form-group has-success'
    } else {
      vstyle = 'form-control'
      dstyle = 'form-group'
    }
    return (
      <div className={dstyle}>
        <label>{label}</label>
        <div>
          <input {...input}
            className={vstyle}
            placeholder={label}
            type={type} />
          {touched && error && <div className="form-control-feedback">{error}</div>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container h-100">
      <div className="row h-100 justify-content-center">
      <div className="col col-sm-6 col-md-4 my-auto">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="username"
            type="text"
            label="Username"
            component={this.renderField}
            />
          <Field
            name="email"
            type="text"
            label="Email"
            component={this.renderField}
            />
          <Field
            name="password"
            type="password"
            label="Password"
            component={this.renderField}
            />
          <Field
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            component={this.renderField}
            />
          {this.renderAlert()}
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
  return { errorMessage: state.auth.signupError };
}

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = 'Required'
  }
  if(!values.email) {
    errors.email = 'Required'
  } else if(!validator.isEmail(values.email)) {
    errors.email = 'Invalid Email Address'
  }
  if(!values.password) {
    errors.password = 'Required'
  } else if(validator.isByteLength(values.password, {max:7})) {
    errors.password = 'Password has to be at least 8 characters';
    errors.passwordConfirm = true;
  }
  if(values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords must match"
  }
  return errors
}
//Using warnings as success indicators
function warn(values) {
  const warnings = {}
  if(values.passwordConfirm && values.password === values.passwordConfirm) {
    warnings.password = true;
    warnings.passwordConfirm = true;
  }
  if(values.email && validator.isEmail(values.email)) {
    warnings.email = true;
  }
  if(values.username) {
    warnings.username = true;
  }
  return warnings
}

Signup = reduxForm({
  form: 'signup',
  validate,
  warn
})(Signup);

export default connect(mapStateToProps, actions)(Signup);