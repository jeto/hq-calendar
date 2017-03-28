import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class EventList extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  renderList() {
    return this.props.events.all.map((event) => {
      const starttime = new Date(event.starttime);
      return (
        <div 
        key={event.id}
        className="Event">
        <Link to={"/events/" + event.id}>
          <h3>{event.name}</h3>
          <p className="Event-time">At: {starttime.toLocaleTimeString('fi-FI')}</p>
          <p className="Event-time">{starttime.toLocaleDateString('fi-FI')}</p>
          </Link>
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