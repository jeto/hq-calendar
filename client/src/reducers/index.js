import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import EventsReducer from './reducer_events';
import CommentsReducer from './reducer_comments';
import AuthReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  events: EventsReducer,
  comments: CommentsReducer,
  auth: AuthReducer,
  router: routerReducer,
  form: formReducer
});

export default rootReducer;