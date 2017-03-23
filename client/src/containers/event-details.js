import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/index';
import { bindActionCreators } from 'redux';

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { event: {} };
  }

  componentDidMount() {
    // console.log(this.props);
    this.props.fetchEvent(1);
  }

  renderEvent() {
    const event = this.props.event;
    const starttime = new Date(event.starttime);
    const endtime = new Date(event.endtime);
    return (
      <div 
      className="Event">
        <h3>Event name{event.name}</h3>
        <p className="Event-time">From: time{starttime.toLocaleTimeString('fi-FI')}</p>
        <p className="Event-time">date{starttime.toLocaleDateString('fi-FI')}</p>
        <p className="Event-time">To: time{endtime.toLocaleTimeString('fi-FI')}</p>
        <p className="Event-time">date{endtime.toLocaleDateString('fi-FI')}</p>
        <p className="Event-description">description{event.description}</p>
        <p className="Event-host">event host</p>
      </div>
    );
  }
  render() {
    return (
      <div className="justify-content-md-center">
        {this.renderEvent()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(state)
  // console.log(ownProps)
  return { 
    
    // id: ownProps.params.id,
    event: state.event
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);