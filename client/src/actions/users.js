import axios from 'axios';
import { push } from 'react-router-redux';

import { 
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGNUP_ERROR,
} from './types';

export function signinUser({username, password}) {
  return function(dispatch) {
    axios.post(`/api/signin`, {username, password})
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.user.id });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userid', response.data.user.id);
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
        dispatch({
          type: AUTH_USER,
          payload: response.data.user.id });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userid', response.data.user.id);
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
    localStorage.removeItem('userid');
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