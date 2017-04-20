import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchEventsForUser } from '../../actions/events';
import { fetchUser } from '../../actions/users';
import {
  Card, CardBlock, CardHeader,
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  ListGroupItem, ListGroup
} from 'reactstrap'
import classnames from 'classnames';
import moment from 'moment';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillMount() {
    this.props.fetchEventsForUser(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id);
  }

  renderUpcoming() {
    let upcoming = this.props.events.filter(event => {
      return (moment(event.starttime).isAfter(moment()))
    }).sort((a, b) => {
      return +(a.starttime > b.starttime) || +(a.starttime === b.starttime) -1;
    })
    if(upcoming.length>0) {
      return upcoming.map(event => {
        return (
           <Link
          key={event.id}
          to={"/events/" + event.id}
          className="list-group-item flex-column align-items-start">
          <div 
          className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{event.name}</h5>
            <small>{moment(event.starttime).fromNow()}</small>
          </div>
          <small>{moment(event.starttime).format("dddd, MMMM Do YYYY, HH:mm")}</small>
          </Link>
        )
    })
    } else {
      return (
        <ListGroupItem>
          {this.props.user.id === this.props.current.id ? 'You have no upcoming events' : this.props.user.username+' has no upcoming events'}
        </ListGroupItem>
      )
    }
    
  }

  renderPast() {
    let past = this.props.events.filter(event => {
      return (moment(event.starttime).isBefore(moment(), 'day'))
    }).sort((a, b) => {
              return +(a.starttime < b.starttime) || +(a.starttime === b.starttime) -1;
    })
    if(past.length>0){
      return past.map(event => {
        return (
           <Link
          key={event.id}
          to={"/events/" + event.id}
          className="list-group-item flex-column align-items-start">
          <div 
          className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{event.name}</h5>
            <small className="text-muted">{moment(event.starttime).fromNow()}</small>
          </div>
          <small>{moment(event.starttime).format("dddd, MMMM Do YYYY, HH:mm")}</small>
          </Link>
        )
    })
    } else {
      return (
        <ListGroupItem>
          {this.props.user.id === this.props.current.id ? 'You have no past events' : this.props.user.username+' has no past events'}
        </ListGroupItem>
      )
    }
  }

  renderOwn() {
    let own = this.props.events.filter(event => {
      return event.host === parseInt(this.props.match.params.id, 10);
    }).sort((a, b) => {
              return +(a.starttime < b.starttime) || +(a.starttime === b.starttime) -1;
    })
    if(own.length>0) {
      return own.map(event => {
        return (
           <Link
          key={event.id}
          to={"/events/" + event.id}
          className="list-group-item flex-column align-items-start">
          <div 
          className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{event.name}</h5>
            <small className="text-muted">{moment(event.starttime).fromNow()}</small>
          </div>
          <small>{moment(event.starttime).format("dddd, MMMM Do YYYY, HH:mm")}</small>
          </Link>
        )
      })
    } else {
      return (
        <ListGroupItem>
          {this.props.user.id === this.props.current.id ? "You haven't hosted any events" : this.props.user.username+" hasn't hosted any events"}
        </ListGroupItem>
      )
    }
  }

  render() {
    return (
      <Row className="justify-content-md-center">
      <Col lg="6">
      <h2>{this.props.user.username}</h2>
      <Card>
        <CardHeader>
        <Nav tabs className="card-header-tabs">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1');}}
            >
            Upcoming Events
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2');}}
            > 
            Hosting
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3');}}
            > 
            Past Events
            </NavLink>
          </NavItem>
        </Nav>
        </CardHeader>
        <CardBlock>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <ListGroup className="list-group-flush">
                {this.renderUpcoming()}
              </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <ListGroup className="list-group-flush">
                {this.renderOwn()}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <ListGroup className="list-group-flush">
                {this.renderPast()}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </CardBlock>
        </Card>
      </Col>
      </Row>
    );
  }
}

// export default UserPage;

function mapStateToProps(state) {
  return {
    events: state.events.user,
    user: state.auth.user,
    current: state.auth.currentuser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEventsForUser, fetchUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);