import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import EventsReducer from './reducer_events';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  events: EventsReducer,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;