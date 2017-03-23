import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import EventReducer from './reducer_events';

const rootReducer = combineReducers({
  events: EventReducer,
  router: routerReducer
});

export default rootReducer;