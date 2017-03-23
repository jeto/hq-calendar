import React from 'react';
import logo from '../../public/logo.png';


const Header = () => {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>HQ Calendar</h2>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a href="/" className="nav-link">Events</a>
        </li>
        <li className="nav-item">
          <a href="/create" className="nav-link">New event</a>
        </li>
        <li className="nav-item">
          <span className="nav-link">Users</span>
        </li>
      </ul>
    </div>
  );
}

export default Header;