import React, { Component } from 'react';
import logo from '../../public/logo.png';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="App-header mb-3">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>HQ Calendar</h2>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
          <li className="nav-item">
            <Link to="/events/new" className="nav-link">New event</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link">Users</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;