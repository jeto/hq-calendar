import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../public/logo.png';
import { Link } from 'react-router-dom';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink,
  NavDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      navbarOpen: false,
      dropdownOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      navbarOpen: !this.state.navbarOpen
    });
  }
  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
      <Navbar color="inverse" className="mb-5" inverse toggleable>
        <NavbarToggler right onClick={this.toggleNavbar} />
        <NavbarBrand tag={Link} to="/">
          <img src={logo} className="logo" height="50px" alt="HQ" />
        </NavbarBrand>
        <Collapse isOpen={this.state.navbarOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/events">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/events/new">New event</NavLink>
            </NavItem>
            <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle nav caret>
                {this.props.user.username}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to={"/user/"+ this.props.user.id}>My Events</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/signout">Sign Out</DropdownItem>
              </DropdownMenu>
            </NavDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    user: state.auth.currentuser,
  };
}

export default connect(mapStateToProps, null)(Header);