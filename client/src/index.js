import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
// import { Router } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import promise from 'redux-promise';

import routes from './routes';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/style.css';

const history = createHistory();
const middleware = [routerMiddleware(history), promise];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
  </ConnectedRouter>
  </Provider>,
  document.querySelector('.container-fluid')
);
