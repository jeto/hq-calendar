import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-md-center">
          <h1>404</h1>
        </div>
        <div className="row justify-content-md-center">
          <p>Nothing found in <code>{location.pathname}</code></p>
        </div>
      </div>
    );
  }
}

export default NoMatch;
