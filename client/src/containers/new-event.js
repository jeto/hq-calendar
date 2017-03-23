import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      starttime: '',
      endtime: ''
    };
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <div className="col col-md-6">
      <form onSubmit={this.onFormSubmit}>
      <div className="form-group">
        <input
          placeholder="Event name"
          className="form-control"
          // value={this.state.name}
          // onChange={this.onInputChange}
          />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description"
          className="form-control"
          rows="3"></textarea>
      </div>
      <div className="form-group row">
        <div className="col-6">
        <label htmlFor="starttime" className="col-form-label">Starting time</label>
        <input className="form-control" type="datetime-local" defaultValue="2011-08-19T13:45:00" id="starttime" />
        </div>
        <div className="col-6">
        <label htmlFor="endtime" className="col-form-label">Ending time</label>
        <input className="form-control" type="datetime-local" defaultValue="2011-08-19T14:45:00" id="endtime" />
        </div>
      </div>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Create</button>
        </span>
      </form>
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return { events };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchEvents }, dispatch);
// }

export default connect(mapStateToProps)(EventList);