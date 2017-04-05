import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/index';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class EventList extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  constructDates() {
    let day = moment();
    var start = moment(day).startOf('month').startOf('isoWeek');
    var end = moment(day).endOf('month').endOf('isoWeek');
    let dates = [];
    while(start <= end) {
      dates.push(start.clone());
      start.add(1, 'days');
    }
    return _.chunk(dates, 7);
  }

  renderCalendar() {
    let getTrs = (e) => {
      let dateChunks = this.constructDates();
      let trs = dateChunks.map((dateChunk, idx) => {
        let tds = dateChunk.map((d, idx) => (
          <td key={idx} className="calendar-date">
            <div className="calendar-date-name">
              <span className="small text-muted">{d.format('D')}</span>
            </div>
            <div className="calendar-date-field">
            {e.filter((event)=>{
              return (moment(event.starttime).isSame(d, 'day'))
              }
            ).map((event) => {
              return (
                <div key={event.id}>
                <Link className="card card-link my-1" to={"/events/" + event.id}>
                <div className="card-header p-0 pl-1 small text-muted">
                    {moment(event.starttime).format("HH:mm")}
                  </div>
                  
                  <p className="card-text p-1">{event.name}</p>
                </Link>
                </div>
              )
            })}
            </div>
          </td>
        ))
        return (
          <tr key={idx} className="">
            {tds}
          </tr>
        )
      })
      return trs
    }
    const dateHeads = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',' Sun']
          .map(d => (
            <th key={d} className="calendar-date-header">{d}</th>
          ))
    return (
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-auto table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse table-sm">
            <tr>
              {dateHeads}
            </tr>
          </thead>
          <tbody>
            {getTrs(this.props.events.all)}
          </tbody>
        </table>
      </div>
      </div>
    )
  }

  renderList() {
    return this.props.events.all.sort((a, b) => {
      return +(a.starttime < b.starttime) || +(a.starttime === b.starttime) -1;
    }).map((event) => {
      return (
        <Link
        key={event.id}
        to={"/events/" + event.id}
        className="list-group-item flex-column align-items-start">
        <div 
        className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{event.name}</h5>
          <small className="text-muted">{moment(event.starttime).toNow()}</small>
        </div>
        <small>{moment(event.starttime).format("dddd, MMMM Do YYYY, HH:mm")}</small>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="row">
      <div className="col-lg-9 push-lg-3">
          {this.renderAlert()}
          {this.renderCalendar()}
        </div>
        <div className="col-lg-3 pull-lg-9">
          <div className="list-group">
          {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events,
          errorMessage: state.events.error };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);