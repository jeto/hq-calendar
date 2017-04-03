import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/index';
import { bindActionCreators } from 'redux';

class EventDetails extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }

  renderEvent() {
    const event = this.props.event;
    const starttime = new Date(event.starttime);
    const endtime = new Date(event.endtime);
    return (
      <div 
      className="Event">
        <h3>Event name{event.name}</h3>
        <p className="Event-time">From: {starttime.toLocaleTimeString('fi-FI')}</p>
        <p className="Event-time">{starttime.toLocaleDateString('fi-FI')}</p>
        <p className="Event-time">To: {endtime.toLocaleTimeString('fi-FI')}</p>
        <p className="Event-time">{endtime.toLocaleDateString('fi-FI')}</p>
        <p className="Event-description">{event.description}</p>
        <p className="Event-host">{event.host.username}</p>
      </div>
    );
  }
  render() {
    if(!this.props.event) {
      return <div>Loading</div>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);