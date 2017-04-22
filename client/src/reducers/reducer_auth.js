import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USER,
  SIGNUP_ERROR,
  DEAUTH_USER
} from '../actions/types';

const INITIAL_STATE = { authenticated: false, currentuser: {}, user: {}, error: '', signupError: '' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, currentuser: action.payload };
    case FETCH_USER:
      return { ...state, error: '', user: action.payload.data }
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SIGNUP_ERROR:
      return { ...state, signupError: action.payload };
    case DEAUTH_USER:
      return { ...state, authenticated: false, currentuser: {} };
    default:
      return state;
  }
}