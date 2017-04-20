import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvent, editEvent, deleteEvent } from '../../actions/events';
import { fetchComments, deletedComments } from '../../actions/comments';
import validator from 'validator';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import {
  Card, CardBlock, CardTitle,
  ListGroupItem, ListGroup, Col,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deletedComments: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    const eventID = this.props.match.params.id;
    this.props.fetchEvent(eventID);
    this.props.fetchComments(eventID);
  }

  onDelete() {
    const id = this.props.event.id
    this.props.deleteEvent(id)
  }

  deleteComment(id) {
    if(this.state.deletedComments.includes(id)) {
      let arr = this.state.deletedComments;
      let i = arr.indexOf(id);
      arr.splice(i, 1);
      this.setState({ deletedComments: arr })
    } else {
      this.setState({deletedComments: [...this.state.deletedComments, id]})
    }
  }

  onSubmit(props) {
    this.props.editEvent(this.props.match.params.id, props)
    this.state.deletedComments.forEach(comment => {
      this.props.deleteComment(comment);
    })
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
      <Col lg="6">
      <Card>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <CardBlock className="float-right form-inline">
          <Button
            tag={Link}
            to={'/events/'+this.props.match.params.id}
            color="secondary">Discard Changes</Button>
          {this.renderDelete()}
          <Button type="submit" color="primary">Save</Button>
        </CardBlock>
        <CardBlock>
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
        </CardBlock>
        </form>
        <CardBlock>
          <CardTitle>
            Comments
          </CardTitle>
        </CardBlock>
        <ListGroup className="list-group-flush">
          {this.renderComments()}
        </ListGroup>
      </Card>
      </Col>
    );
  }

  renderComments() {
    return this.props.comments.sort((a, b) => {
      return +(a.posted < b.posted) || +(a.posted === b.posted) -1;
    }).map((comment) => {
      return(
        <ListGroupItem
          color={this.state.deletedComments.includes(comment.id) ? 'danger' : ''}
          className="justify-content-between"
          key={comment.posted}>
          <div>
            <div className="csstooltip"><strong>{comment.username}:&nbsp;</strong>
              <span className="csstooltiptext">{moment(comment.posted).format('DD.MM.YY HH:mm')}</span>
            </div>
            <span>{comment.content}</span>
          </div>
          <Button
            color={this.state.deletedComments.includes(comment.id) ? 'secondary' : 'danger'}
            size="sm"
            className="float-right"
            onClick={()=>this.deleteComment(comment.id)}>
            {this.state.deletedComments.includes(comment.id) ? 'Cancel' : 'Delete'}
            </Button>
        </ListGroupItem>
      )
    });
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
  } else if(validator.isByteLength(values.name, {min:51})){
    errors.name = 'Maximum length is 50 characters'
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
    comments: state.comments,
    initialValues: state.events.event
  };
}

EditEvent = reduxForm({
  form: 'EditEvent',
  validate
})(EditEvent);

const actions = {
  fetchEvent, editEvent, deleteEvent,
  fetchComments, deletedComments
}

export default connect(mapStateToProps, actions)(EditEvent);