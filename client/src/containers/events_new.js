import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form'
import { createEvent } from '../actions/index';

class EventsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log(this.props)
    this.props.createEvent(props)
      .then((data) => {
        this.props.dispatch(push(`/events/${data.payload.data}`));
      })
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row justify-content-md-center">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="form-group">
          <label>Host</label>
          <Field
            name="host"
            component="input"
            type="number"
            placeholder="Host"
            className="form-control"
            />
        </div>
        <div className="form-group">
          <label>Event name</label>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Event name"
            className="form-control"
            />
        </div>
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
        <div className="form-group row">
          <div className="col-6">
          <label htmlFor="starttime" className="col-form-label">Starting time</label>
          <Field
            name="starttime"
            component="input"
            className="form-control"
            type="datetime-local"
            value="2011-08-19T13:45:00"
            id="starttime" />
          </div>
          <div className="col-6">
          <label htmlFor="endtime" className="col-form-label">Ending time</label>
          <Field
            name="endtime"
            component="input"
            className="form-control"
            type="datetime-local"
            value="2011-08-19T14:45:00"
            id="endtime" />
          </div>
        </div>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Create</button>
          </span>
        </form>
      </div>
    );
  }
}



EventsNew = reduxForm({
  form: 'EventsNew'
})(EventsNew);

export default connect(null, {createEvent})(EventsNew);