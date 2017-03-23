import React, { Component } from 'react';
import Header from './Header';
import EventDetails from '../containers/event-details';


class Event extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="row justify-content-md-center">
          <EventDetails />
        </div>
      </div>
    );
  }
}

export default Event;
