import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/events';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card, CardBlock, CardHeader,
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  ListGroupItem, ListGroup
} from 'reactstrap'
import classnames from 'classnames';
import EventCalendar from './events_calendar';


class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    };
  }

  toggle = tab => {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillMount() {
    this.props.fetchEvents();
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage.error}
        </div>
      );
    }
  }

  renderUpcoming() {
    let upcoming = this.props.events.filter(event => {
      return (moment(event.starttime).isAfter(moment()))
    }).sort((a, b) => {
      return +(a.starttime > b.starttime) || +(a.starttime === b.starttime) -1;
    })
    if(upcoming.length>0) {
      return upcoming.map(event => {
        return this.renderEvent(event)
    })
    } else {
      return (
        <ListGroupItem>
          No upcoming events
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
        return this.renderEvent(event)
    })
    } else {
      return (
        <ListGroupItem>
          No past events
        </ListGroupItem>
      )
    }
  }

  renderEvent(event) {
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
  }

  renderList() {
    return (
      <Card>
        <CardHeader>
        <Nav tabs className="card-header-tabs">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1');}}
            >
            Upcoming
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2');}}
            > 
            Past
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
                {this.renderPast()}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </CardBlock>
        </Card>
    )
  }

  render() {
    return (
      <Row>
      <div className="col-xl-8 push-xl-4">
          {this.renderAlert()}
          <EventCalendar events={this.props.events} />
        </div>
        <div className="col-xl-4 pull-xl-8">
          {this.renderList()}
        </div>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events.all,
          errorMessage: state.events.error };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);