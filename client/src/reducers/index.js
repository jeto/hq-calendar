import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import EventsReducer from './reducer_events';
import EventReducer from './reducer_event';

const rootReducer = combineReducers({
  events: EventsReducer,
  event: EventReducer,
  router: routerReducer
});

export default rootReducer;