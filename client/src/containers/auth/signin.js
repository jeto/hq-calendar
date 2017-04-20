import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import logo from '../../../public/logo.png';
import { signinUser } from '../../actions/users';

class Signin extends Component {
  onSubmit({username, password}) {
    this.props.signinUser({username, password});
  };

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({input,label,type, meta: {touched, error}}) {
    return (
      <div className={ (touched && error) ? 'form-group has-danger' : 'form-group'}>
        <label>{label}</label>
        <div>
          <input {...input}
            className={ (touched && error) ? 'form-control form-control-danger' : 'form-control'}
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
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
            name="username"
            type="text"
            label="Username"
            component={this.renderField}
            />
        <Field
            name="password"
            type="password"
            label="Password"
            component={this.renderField}
            />
        {this.renderAlert()}
            <button type="submit" className="btn btn-block btn-signin">Sign in</button>
        </form>
          <Link to='/signup' className="btn btn-block btn-secondary mt-3">Sign up</Link>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = true
  }
  if(!values.password) {
    errors.password = true
  }
  return errors
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

export default connect(mapStateToProps, {signinUser})(Signin);