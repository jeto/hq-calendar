import React, { Component } from 'react';
import Header from './Header';
import NewEvent from '../containers/new-event';


class Create extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="row justify-content-md-center">
          <NewEvent />
        </div>
      </div>
    );
  }
}

export default Create;
