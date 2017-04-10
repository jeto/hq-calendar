import * as user from './controllers/user';
import event from './controllers/event';
import * as events from './models/event';
import * as comments from './models/comment';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

export default function(app) {
  app.post('/api/signup', user.signup)
  app.post('/api/signin', requireSignin, user.signin)

  app.get('/api/events', requireAuth, events.getEvents)
  app.get('/api/events/:id', requireAuth, events.getEvent)
  app.post('/api/events', requireAuth, events.createEvent)
  app.put('/api/events/:id', requireAuth, events.editEvent)
  app.delete('/api/events/:id', requireAuth, events.deleteEvent)

  app.post('/api/comments', requireAuth, comments.createComment)
  app.get('/api/comments/:id', requireAuth, comments.getComments)
  app.delete('/api/comments/:id', requireAuth, comments.deleteComment)
}