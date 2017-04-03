import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { postLogin } from '../actions/index';
import { Field, reduxForm } from 'redux-form';

class Login extends Component {
  onSubmit(props) {
    console.log(this.props)
    this.props.postLogin(props)
      .then((data) => {
        this.props.dispatch(push(`/`));
      })
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row justify-content-md-center">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="form-group">
          <label>Username</label>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
            className="form-control"
            />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            className="form-control"
            />
        </div>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Login</button>
          </span>
        </form>
      </div>
    );
  }
}



Login = reduxForm({
  form: 'Login'
})(Login);

export default connect(null, {postLogin})(Login);