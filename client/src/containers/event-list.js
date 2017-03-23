import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/index';
import { bindActionCreators } from 'redux';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = { events: []};
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  renderList() {
    return this.props.events.map((event) => {
      return (
        <div 
        key={event.id}
        className="Event">
          <h3>{event.name}</h3>
          <span className="Event-time">{event.starttime}</span>
          <p className="Event-description">{event.description}</p>
          <p className="Event-host">{event.host}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="justify-content-md-center">
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return { events };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);