import React, { Component } from 'react';
import Header from './Header';
import EventList from '../containers/event-list';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="row justify-content-md-center">
          <EventList />
        </div>
      </div>
    );
  }
}

export default App;
