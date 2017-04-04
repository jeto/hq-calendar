import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent, deleteEvent } from '../actions/index';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class EventDetails extends Component {
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
    const id = this.props.location.pathname.split('/')[2]
    this.props.deleteEvent(id)
        .then(() => {
          this.props.dispatch(push(`/events/`));      
        })
  }

  onSubmit(props) {
    props.preventDefault();
    // console.log(this.props)
    // this.props.createEvent(props)
    //   .then((data) => {
    //     this.props.dispatch(push(`/events/${data.payload.data}`));
    //   })
  };

  renderDelete(){
    return (
      <div>
      <Button color="danger" className="float-right mr-3" onClick={this.toggle}>Delete</Button>
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
    // const endtime = new Date(event.endtime);
    return (
      <div className="col-lg-6">
      <div 
      className="card">
        <div className="card-block">
          <Button color="primary" className="float-right">Join</Button>
          {this.renderDelete()}
          <h4 className="card-title">{event.name}</h4>
          <p className="card-text">{event.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Date:</strong> &nbsp; {moment(starttime).format('DD MMM YYYY')}</li>
          <li className="list-group-item"><strong>Time:</strong> &nbsp; {moment(starttime).format('HH:mm')}</li>
          <li className="list-group-item"><strong>Host:</strong> &nbsp; {event.host.username}</li>
        </ul>
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
function mapStateToProps(state) {
  return { event: state.events.event };
}
EventDetails = reduxForm({
  form: 'EventDetails'
})(EventDetails);

export default connect(mapStateToProps, {fetchEvent, deleteEvent})(EventDetails);



// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchEvent }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);