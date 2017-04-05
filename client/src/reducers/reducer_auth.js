import {
  AUTH_USER,
  AUTH_ERROR,
  SIGNUP_ERROR,
  DEAUTH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SIGNUP_ERROR:
      return { ...state, signupError: action.payload };
    case DEAUTH_USER:
      return { ...state, auhtenticated: false };
    default:
      return state;
  }
}