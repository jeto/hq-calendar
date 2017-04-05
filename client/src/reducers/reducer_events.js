import { 
  FETCH_EVENTS,
  FETCH_EVENT,
  EVENT_ERROR
} from '../actions/types';

const INITIAL_STATE = { all: [], event: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, error: '', all: action.payload.data }
    case FETCH_EVENT:
      return { ...state, error: '', event: action.payload.data }
    case EVENT_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
    }
}