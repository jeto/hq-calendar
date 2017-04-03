import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/app';
import EventList from './containers/events_list';
import NewEvent from './containers/events_new';
import EventDetails from './containers/events_show';
import Login from './containers/login';
import NoMatch from './components/nomatch';

export default (
  <div>
    <Switch>
    <Route path="/login" component={Login} />
    <App>
    <Switch>
      <Route exact path="/" component={EventList} />
      <Route exact path="/events" component={EventList} />
      <Route path="/events/new" component={NewEvent} />
      <Route path="/events/:id" component={EventDetails} />
      <Route component={NoMatch}/>
    </Switch>
    </App>
    </Switch>
  </div>
);