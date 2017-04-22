import axios from 'axios';
import { push } from 'react-router-redux';

import { 
  CLEAR_EVENT,
  FETCH_EVENTS,
  FETCH_EVENT,
  FETCH_EVENTS_FOR_USER,
  CREATE_EVENT,
  EVENT_ERROR,
  FETCH_PARTICIPANTS,
} from './types';

export function clearEvent() {
  return function(dispatch) {
    dispatch({ type: CLEAR_EVENT })
  }
}

export function fetchEvents() {
  return function(dispatch) {
    axios.get(`/api/events`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_EVENTS,
          payload: response })
      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function fetchEventsForUser(id) {
  return function(dispatch) {
    axios.get(`/api/events/`, {
      params: { user: id },
      headers: { auth: localStorage.getItem('token')}
    }).then(response => {
      dispatch({
        type: FETCH_EVENTS_FOR_USER,
        payload: response
      })
    }).catch(err => {
      dispatch(eventError(err.response.data))
    })
  }
}

export function fetchEvent(id) {
  return function(dispatch) {
    axios.get(`/api/events/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_EVENT,
          payload: response
        })
      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function createEvent(props) {
  return function(dispatch) {
    axios.post(`/api/events`, props, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: CREATE_EVENT,
          payload: response
        })
        dispatch(push(`/events/${response.data}`))

      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function editEvent(id, props) {
  return function(dispatch) {
    axios.put(`/api/events/${id}`, props, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch(push(`/events/${id}`))
      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function deleteEvent(id) {
  return function(dispatch) {
    axios.delete(`/api/events/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch(push(`/events/`));
      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function fetchParticipants(id) {
  return function(dispatch) {
    axios.get(`/api/events/${id}/participants`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_PARTICIPANTS,
          payload: response
        })
      })
      .catch(err => {
        dispatch(eventError(err.response.data));
      })
  }
}

export function joinEvent(id) {
  return function(dispatch) {
    axios.post(`/api/events/${id}/join`, null, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch(fetchParticipants(id))
      })
      .catch(err => {
        dispatch(eventError(err.response.data));
      })
  }
}

export function leaveEvent(id) {
  return function(dispatch) {
    axios.delete(`/api/events/${id}/leave`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch(fetchParticipants(id))
      })
      .catch(err => {
        dispatch(eventError(err.response.data));
      })
  }
}

export function eventError(error) {
  return {
    type: EVENT_ERROR,
    payload: error
  }
}