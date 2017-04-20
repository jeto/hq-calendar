import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEvent, fetchParticipants, deleteEvent,
  joinEvent, leaveEvent
} from '../../actions/events';
import { fetchComments, createComment, deleteComment } from '../../actions/comments';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import {
  Card, CardBlock, CardTitle, Col,
  ListGroupItem, ListGroup, InputGroupButton,
  Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter
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
    this.props.fetchParticipants(eventID);
  }

  onJoin() {
    const id = this.props.event.id;
    this.props.joinEvent(id);
  }

  onLeave() {
    const id = this.props.event.id;
    this.props.leaveEvent(id);
  }

  onDelete() {
    const id = this.props.event.id
    this.props.deleteEvent(id)
  }

  onSubmit(props) {
    props.id = this.props.match.params.id
    this.props.createComment(props)
  };

  deleteComment(id) {
    this.props.deleteComment(id)
      .then(() => {
        this.props.fetchComments(this.props.event.id)
      })
  }

  renderButtons(){
    if(this.props.event.host.id === this.props.user.id) {
      return (
        <div>
        <Button color="danger" className="float-right ml-3" onClick={this.toggle}>Delete</Button>
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
          <Button
            tag={Link}
            to={'/events/edit/' + this.props.match.params.id}
            color="secondary"
            className="float-right">Edit</Button>
        </div>
    )
    } else if(this.props.participants.filter((u) => u.user_id === this.props.user.id).length > 0) {
      return (
      <Button
        color="warning"
        className="float-right"
        onClick={this.onLeave.bind(this)}>Leave</Button>
    )
    } else {
      return (
        <Button
        color="primary"
        className="float-right"
        onClick={this.onJoin.bind(this)}>Join</Button>
      )
    }
  }

  renderEvent() {
    const event = this.props.event;
    const starttime = new Date(event.starttime);
    const { handleSubmit } = this.props;
    // const endtime = new Date(event.endtime);
    return (
      <Col lg="6">
      <Card>
        <CardBlock>
          {this.renderButtons()}
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
          <ListGroupItem><strong>Participants:</strong> &nbsp;
              <Button
                tag={Link}
                to={"/user/" + event.host.id}
                color="success"
                size="sm"
                className="mx-2">{event.host.username}</Button>
            {this.renderParticipants()}
          </ListGroupItem>
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
      </Col>
    );
  }

  renderParticipants() {
    return this.props.participants.filter((user) => {
      return user.user_id !== this.props.event.host.id
    })
      .map((user) => {
      return (
        <Button
          key={user.user_id}
          tag={Link}
          to={"/user/" + user.user_id}
          outline color="success"
          size="sm"
          className="mx-2">{user.username}</Button>
      );
    })
  }

  renderComments() {
    return this.props.comments.sort((a, b) => {
      return +(a.posted < b.posted) || +(a.posted === b.posted) -1;
    }).map((comment) => {
      return(
        <ListGroupItem key={comment.posted} className="comment justify-content-between">
        <div>
          <Link to={"/user/" + comment.author}>
          <div className="csstooltip"><strong>{comment.username}:&nbsp;</strong>
            <span className="csstooltiptext">{moment(comment.posted).format('DD.MM.YY HH:mm')}</span>
          </div>
          </Link>
          <span>{comment.content}</span>
        </div>
          {this.props.user.id === comment.author ?
            <ButtonGroup className="comment-delete float-right">
            <Button color="primary" size="sm">Edit</Button>
            <Button
            color="danger"
            size="sm"
            onClick={()=>this.deleteComment(comment.id)}>
            Delete
          </Button>
          </ButtonGroup> : ''}
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
    participants: state.events.participants,
    user: state.auth.currentuser,
    errorMessage: state.events.error
  };
}

const actions = {
  fetchEvent, fetchParticipants, deleteEvent,
  joinEvent, leaveEvent, fetchComments,
  createComment, deleteComment
}

EventDetails = reduxForm({
  form: 'EventDetails',
  validate
})(EventDetails);

export default connect(mapStateToProps, actions)(EventDetails);