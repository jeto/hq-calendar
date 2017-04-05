import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container h-100">
      <div className="row h-100 justify-content-center">
      <div className="col col-sm-6 col-md-4 my-auto">
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
        {this.renderAlert()}
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </span>
        </form>
        <span className="input-group-btn mt-3">
          <Link to='/signup' className="btn btn-secondary">Sign up</Link>
        </span>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(Signin);

export default connect(mapStateToProps, actions)(Signin);