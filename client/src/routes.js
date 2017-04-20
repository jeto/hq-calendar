import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/app';
import EventList from './containers/events/events_list';
import NewEvent from './containers/events/events_new';
import EditEvent from './containers/events/events_edit';
import EventDetails from './containers/events/events_show';
import UserPage from './containers/user/user_show';
import Signin from './containers/auth/signin';
import Signup from './containers/auth/signup';
import Signout from './containers/auth/signout';
import RequireAuth from './containers/auth/require_auth';
import NoMatch from './components/nomatch';

export default (
  <div className="h-100">
    <Switch>
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/signout" component={Signout} />
    <App>
    <Switch>
      <Route exact path="/" component={RequireAuth(EventList)} />
      <Route exact path="/events" component={RequireAuth(EventList)} />
      <Route path="/events/new" component={RequireAuth(NewEvent)} />
      <Route path="/events/edit/:id" component={RequireAuth(EditEvent)} />
      <Route path="/events/:id" component={RequireAuth(EventDetails)} />
      <Route path="/user/:id" component={RequireAuth(UserPage)} />
      <Route component={RequireAuth(NoMatch)}/>
    </Switch>
    </App>
    </Switch>
  </div>
);