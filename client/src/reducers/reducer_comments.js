import { FETCH_COMMENTS, COMMENT_ERROR } from '../actions/types';

const INITIAL_STATE = { all: [], error: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, error: '', all: action.payload.data }
    case COMMENT_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
    }
}