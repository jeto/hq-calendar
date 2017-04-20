import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
// import { Router } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import reduxThunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/style.css';

const history = createHistory();
const middleware = [routerMiddleware(history), reduxThunk];

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)

const token = localStorage.getItem('token');
const user = {
  id: parseInt(localStorage.getItem('userid'), 10),
  username: localStorage.getItem('username')
}

if(token) {
  store.dispatch({
    type: AUTH_USER,
    payload: user
  });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
  </ConnectedRouter>
  </Provider>,
  document.querySelector('.container-fluid')
);
