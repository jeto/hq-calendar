import axios from 'axios';
import { push } from 'react-router-redux';

import { 
  FETCH_EVENTS,
  FETCH_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  EVENT_ERROR,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR
} from './types';

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

export function deleteEvent(id) {
  return function(dispatch) {
    axios.delete(`/api/events/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: DELETE_EVENT,
          payload: response
        })
        dispatch(push(`/events/`));
      })
      .catch(err => {
        dispatch(eventError(err.response.data))
      })
  }
}

export function eventError(error) {
  return {
    type: EVENT_ERROR,
    payload: error
  }
}

export function signinUser({username, password}) {
  return function(dispatch) {
    axios.post(`/signin`, {username, password})
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        dispatch(push(`/`));
      })
      .catch(err => {
        dispatch(authError(err.response.data));
      })
  }
}

export function signupUser({username, email, password}) {
  return function(dispatch) {
    axios.post(`/signup`, {username, email, password})
      .then(response => {
        dispatch({type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        dispatch(push(`/`));
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      })
  }
}

export function signoutUser() {
  return function(dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: DEAUTH_USER });
    dispatch(push(`/signin`));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}