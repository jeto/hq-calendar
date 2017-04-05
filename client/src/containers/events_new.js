import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { createEvent } from '../actions/index';
// import { Card, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap';

class EventsNew extends Component {
  onSubmit(props) {
    this.props.createEvent(props)
  };

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
      <div className="row justify-content-md-center">
      <div className="col-md-6">
        <h3>Create new event</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="name"
            type="text"
            label="Name"
            component={this.renderField}
            />
        <div className="form-group">
          <label>Description</label>
          <Field
            name="description"
            component="textarea"
            type="text"
            placeholder="Description"
            className="form-control"
            rows="3" />
        </div>
          <Field
              name="starttime"
              type="datetime-local"
              label="Starting time"
              component={this.renderField}
              />
          <Field
            name="endtime"
            type="datetime-local"
            label="Ending time"
            component={this.renderField}
            />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Create</button>
          </span>
        </form>
      </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if(!values.name) {
    errors.name = 'Required'
  }
  if(!values.starttime) {
    errors.starttime = 'Required'
  }
  if(!values.endtime) {
    errors.endtime = 'Required'
  }
  if(values.starttime>values.endtime) {
    errors.endtime = 'Ending time has to be after starting time'
  }
  return errors
}

EventsNew = reduxForm({
  form: 'EventsNew',
  validate
})(EventsNew);

export default connect(null, {createEvent})(EventsNew);