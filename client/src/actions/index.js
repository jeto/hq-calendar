import axios from 'axios';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';

import { 
  FETCH_EVENTS,
  FETCH_EVENT,
  CREATE_EVENT,
  EVENT_ERROR,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGNUP_ERROR,
  CREATE_COMMENT,
  FETCH_COMMENTS,
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

export function eventError(error) {
  return {
    type: EVENT_ERROR,
    payload: error
  }
}

export function signinUser({username, password}) {
  return function(dispatch) {
    axios.post(`/api/signin`, {username, password})
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
    axios.post(`/api/signup`, {username, email, password})
      .then(response => {
        dispatch({type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        dispatch(push(`/`));
      })
      .catch(err => {
        dispatch(signupError(err.response.data.error));
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
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error
  }
}

export function createComment(props) {
  return function(dispatch) {
    axios.post(`/api/comments`, props, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: CREATE_COMMENT,
          payload: response
        });
        dispatch(reset('EventDetails'));
      })
      .catch(err => {
        dispatch(commentError(err.response.data))
      })
  }
}

export function fetchComments(id) {
  return function(dispatch) {
    axios.get(`/api/comments/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: response
        });
      })
      .catch(err => {
        dispatch(commentError(err.response.data))
      })
  }
}

export function deleteComment(id) {
  return function(dispatch) {
    axios.delete(`/api/comments/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {

      })
      .catch(err => {
        dispatch(commentError(err.response.data))
      })
  }
}

export function commentError(error) {
  console.log('commenterror ', error)
}