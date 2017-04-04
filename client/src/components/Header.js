import React, { Component } from 'react';
import logo from '../../public/logo.png';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
      <Navbar color="inverse" className="mb-5" inverse toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand tag={Link} to="/">
          <img src={logo} className="logo" height="50px" alt="HQ" />
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/events">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/events/new">New event</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default Header;