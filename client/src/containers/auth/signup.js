import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import validator from 'validator';
import logo from '../../../public/logo.png';
import { signupUser } from '../../actions/users';

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
      <div className="container-fluid px-0 h-100">
      <div className="login-bar">
        <img src={logo} className="login-logo" alt="HQ" />
      </div>
      <div className="row h-100 justify-content-center">
      <div className="col col-sm-6 col-md-4 my-auto px-5">
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
          <button type="submit" className="btn btn-block btn-primary btn-signin">Sign Up</button>
          <Link to='/signin' className="btn btn-block btn-secondary mt-3">Back</Link>
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
  } else if(validator.isByteLength(values.username, {min:31})){
    errors.username = 'Maximum length is 30 characters'
  }
  if(!values.email) {
    errors.email = 'Required'
  } else if(!validator.isEmail(values.email)) {
    errors.email = 'Invalid Email Address'
  } else if(validator.isByteLength(values.email, {min:51})){
    errors.email = 'Maximum length is 50 characters'
  }
  if(!values.password) {
    errors.password = 'Required'
  } else if(validator.isByteLength(values.password, {max:7})) {
    errors.password = 'Password has to be at least 8 characters';
    errors.passwordConfirm = true;
  }
  if(values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords must match";
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

export default connect(mapStateToProps, {signupUser})(Signup);