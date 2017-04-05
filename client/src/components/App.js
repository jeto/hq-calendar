import React, { Component } from 'react';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="container h-100">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
