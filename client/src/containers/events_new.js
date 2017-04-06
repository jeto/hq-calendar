import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { createEvent } from '../actions/index';
import moment from 'moment';
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
            <button type="submit" className="btn btn-block btn-primary mb-3">Create</button>
        </form>
        <button onClick={this.props.history.goBack} className="btn btn-block btn-secondary">Cancel</button>
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

function mapStateToProps(state) {
  return {
    initialValues: {
        starttime: moment().minute(60).format('YYYY-MM-DDTHH:mm'),
        endtime: moment().minute(60).add(1,'hours').format('YYYY-MM-DDTHH:mm')
      }
  };
}

EventsNew = reduxForm({
  form: 'EventsNew',
  validate
})(EventsNew);

export default connect(mapStateToProps, {createEvent})(EventsNew);