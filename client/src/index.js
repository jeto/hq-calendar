import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import ReduxPromise from 'redux-promise';

import App from './components/App';
import Create from './components/Create';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';

const history = createHistory();
const middleware = [routerMiddleware(history), ReduxPromise];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)  

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/create" component={Create} />
    </div>
    </ConnectedRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
