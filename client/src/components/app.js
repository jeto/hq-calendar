import React, { Component } from 'react';
import Header from './header';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Container className="h-100">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default App;