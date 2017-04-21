import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEvent, fetchParticipants, deleteEvent,
  joinEvent, leaveEvent, clearEvent
} from '../../actions/events';
import moment from 'moment';
import {
  Alert, Card, CardBlock, CardTitle, Col,
  ListGroupItem, ListGroup,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Spinner from '../../components/spinner';
import Comments from '../comments/comments';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      const eventID = this.props.match.params.id;
      this.props.fetchEvent(eventID);
      this.props.fetchParticipants(eventID);
    }
  }

  componentWillMount() {
    const eventID = this.props.match.params.id;
    this.props.fetchEvent(eventID);
    this.props.fetchParticipants(eventID);
  }

  componentWillUnmount() {
    this.props.clearEvent();
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
            <CSSTransitionGroup
              transitionName="participant"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {this.renderParticipants()}
            </CSSTransitionGroup>
          </ListGroupItem>
        </ListGroup>
        <Comments event={this.props.match.params.id} />
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

  render() {
    if(!this.props.event) {
      return <Spinner />
    }
    if(this.props.errorMessage) {
      return (
        <div className="row justify-content-md-center">
        <Alert color="danger" className="col-md-4">
          <strong>Oops!</strong> {this.props.errorMessage}
        </Alert>
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

function mapStateToProps(state) {
  return {
    eventready: state.events.eventready,
    participantsready: state.events.participantsready,
    event: state.events.event,
    participants: state.events.participants,
    user: state.auth.currentuser,
    errorMessage: state.events.error,
  };
}

const actions = {
  fetchEvent, fetchParticipants, deleteEvent, clearEvent,
  joinEvent, leaveEvent
}

export default connect(mapStateToProps, actions)(EventDetails);