import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


class EventCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment()
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
            }).sort((a, b) => {
              return +(a.starttime > b.starttime) || +(a.starttime === b.starttime) -1;
            }).map((event) => {
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
        <h5>{moment().format('MMMM')}</h5>
        <div className="col-12 col-md-auto table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse table-sm">
            <tr>
              {dateHeads}
            </tr>
          </thead>
          <tbody>
            {getTrs(this.props.events)}
          </tbody>
        </table>
      </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderCalendar()}
      </div>
    );
  }
}

export default EventCalendar;