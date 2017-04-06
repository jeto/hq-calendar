import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }

  onDelete() {
    const id = this.props.event.id
    this.props.deleteEvent(id)
  }

  onSubmit(props) {
    this.props.editEvent(this.props.match.params.id ,props)
  };

  renderDelete(){
    return (
      <div>
      <Button color="danger" className="mx-3" onClick={this.toggle}>Delete</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Delete event</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this event?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onDelete.bind(this)}>Delete</Button>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }

  renderField({input, label, type, value, meta: {touched, error}}) {
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

  renderEvent() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-lg-6">
      <div 
      className="card">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="card-block float-right form-inline">
          <Link to={{ pathname: `/events/${this.props.match.params.id}`}} >
            <Button color="secondary">Discard Changes</Button>
          </Link>
          {this.renderDelete()}
          <Button type="submit" color="primary">Save</Button>
        </div>
        <div className="card-block">
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
        <p>Starting time</p>
            <Field
              name="starttime"
              component={this.renderField}
              type="datetime-local"
              className="form-control"
              format={(value) => moment(value).format('YYYY-MM-DDTHH:mm')} />
        <p>Ending time</p>
            <Field
            name="endtime"
            component={this.renderField}
            type="datetime-local"
            className="form-control"
            format={(value) => moment(value).format('YYYY-MM-DDTHH:mm')} />
        </div>
        </form>
        {this.renderComments()}
      </div>
      </div>
    );
  }

  renderComments() {
    return(
        <div className="card-block">
          <h5 className="card-title">Comments</h5>
          <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <Field
              name="comment"
              component="input"
              type="text"
              className="form-control"
              />
              <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Send</button>
          </span>
          </div>
          
          </form>
        </div>
    )
  }

  render() {
    if(!this.props.event) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    )
    }
    return (
      <div className="row justify-content-md-center">
        {this.renderEvent()}
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
    event: state.events.event,
    initialValues: state.events.event
  };
}

EditEvent = reduxForm({
  form: 'EditEvent',
  validate
})(EditEvent);

export default connect(mapStateToProps, actions)(EditEvent);