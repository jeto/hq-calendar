import * as user from './controllers/user';
import event from './controllers/event';
import * as events from './models/event';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

export default function(app) {
  app.post('/signup', user.signup)
  app.post('/signin', requireSignin, user.signin)

  app.get('/api/events', events.getEvents)
  app.get('/api/events/:id', events.getEvent)
  app.post('/api/events', events.createEvent)
  app.put('/api/events/:id', events.updateEvent)
  app.delete('/api/events/:id', events.deleteEvent)
}