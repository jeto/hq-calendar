import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENT = 'FETCH_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT'
export const POST_LOGIN = "POST_LOGIN";

export function fetchEvents() {
  const request = axios.get('/api/events');

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function fetchEvent(id) {
  const request = axios.get(`/api/events/${id}`);

  return {
    type: FETCH_EVENT,
    payload: request
  };
}

export function createEvent(props) {
  const request = axios.post(`/api/events/`, props);

  return {
    type: CREATE_EVENT,
    payload: request
  };
}

export function deleteEvent(id) {
  const request = axios.delete(`/api/events/${id}`);

  return {
    type: DELETE_EVENT,
    payload: request
  }
}

export function postLogin(props) {
  const request = axios.post(`/login/`, props);

  return {
    type: POST_LOGIN,
    payload: request
  };
}