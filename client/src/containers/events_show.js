import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import {
  Card, CardBlock, CardTitle,
  ListGroupItem, ListGroup, InputGroupButton,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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

  onSubmit(props) {
    props.id = this.props.match.params.id
    this.props.createComment(props)
  };

  renderDelete(){
    return (
      <div>
      <Button color="danger" className="float-right mx-3" onClick={this.toggle}>Delete</Button>
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

  renderEvent() {
    const event = this.props.event;
    const starttime = new Date(event.starttime);
    const { handleSubmit } = this.props;
    // const endtime = new Date(event.endtime);
    return (
      <div className="col-lg-6">
      <Card>
        <CardBlock>
          <Button color="primary" className="float-right">Join</Button>
          {this.renderDelete()}
          <Link to={{ pathname: `/events/edit/${this.props.match.params.id}`}} >
            <Button color="secondary" className="float-right">Edit</Button>
          </Link>
          <CardTitle>{event.name}</CardTitle>
          <div className="card-text mt-5">
          {event.description.split("\n").map((line, i) => {
            return <p key={i}>{line}</p>
          })}
          </div>
        </CardBlock>
        <ListGroup className="list-group-flush">
          <ListGroupItem><strong>Date:</strong> &nbsp; {moment(starttime).format('DD MMM YYYY')}</ListGroupItem>
          <ListGroupItem><strong>Time:</strong> &nbsp; {moment(starttime).format('HH:mm')}</ListGroupItem>
          <ListGroupItem><strong>Host:</strong> &nbsp; {event.host.username}</ListGroupItem>
        </ListGroup>
        <CardBlock>
          <CardTitle>Comments</CardTitle>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="input-group">
            <Field
              name="content"
              component="input"
              type="text"
              className="form-control"
              />
            <InputGroupButton>
              <Button type="submit" color="secondary">Send</Button>
            </InputGroupButton>
          </div>
          </form>
        </CardBlock>
        <ListGroup className="list-group-flush">
          {this.renderComments()}
        </ListGroup>
      </Card>
      </div>
    );
  }

  renderComments() {
    return this.props.comments.sort((a, b) => {
      return +(a.posted < b.posted) || +(a.posted === b.posted) -1;
    }).map((comment) => {
      return(
        <ListGroupItem key={comment.posted}>
          <div className="csstooltip"><strong>{comment.username}:&nbsp;</strong>
            <span className="csstooltiptext">{moment(comment.posted).format('DD.MM.YY HH:mm')}</span>
          </div>
          <span>{comment.content}</span>
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
    if(this.props.errorMessage) {
      return (
        <div className="row justify-content-md-center">
        <div className="col-md-4 alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage.error}
        </div>
        </div>
      );
    }
    return (
      <div className="row justify-content-md-center">
        {this.renderEvent()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {}
  if(!values.content) {
    errors.content = true;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    event: state.events.event,
    comments: state.comments,
    errorMessage: state.events.error
  };
}
EventDetails = reduxForm({
  form: 'EventDetails',
  validate
})(EventDetails);

export default connect(mapStateToProps, actions)(EventDetails);