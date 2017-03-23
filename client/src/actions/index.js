import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENT = 'FETCH_EVENT';

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