import { FETCH_EVENT } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENT:
      return action.payload.data;
    default:
      return state;
    }
}