import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {events: []};
  }
  componentDidMount() {
    axios.get('http://localhost:3001/events')
    .then((response) => {
      this.setState({
        events: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const events = this.state.events.map(event => {
      return (
        <div className="Event" key={event.id}>
          <h3>{event.name}</h3>
          <span className="Event-time">{event.starttime}</span>
          <p className="Event-description">{event.description}</p>
        </div>
      );
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HQ Calendar</h2>
        </div>
        <div className="Events">
          {events}
        </div>
      </div>
    );
  }
}

export default App;
