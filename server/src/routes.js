import * as user from './controllers/user';
import * as event from './controllers/event';
import * as events from './models/event';
import * as comments from './models/comment';
import * as comment from './controllers/comment';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

export default function(app) {
  app.post('/api/signup', user.signup)
  app.post('/api/signin', requireSignin, user.signin)

  app.get('/api/users/:id', user.get)

  app.get('/api/events', requireAuth, event.get)
  app.get('/api/events/:id', requireAuth, events.getEvent)
  app.post('/api/events', requireAuth, event.add)
  app.put('/api/events/:id', requireAuth, event.edit)
  app.delete('/api/events/:id', requireAuth, event.remove)

  app.post('/api/comments', requireAuth, comment.add)
  app.get('/api/comments/:id', requireAuth, comments.getComments)
  app.delete('/api/comments/:id', requireAuth, comment.remove)

  app.post('/api/events/:id/join', requireAuth, events.joinEvent)
  app.delete('/api/events/:id/leave', requireAuth, events.leaveEvent)
  app.get('/api/events/:id/participants', requireAuth, events.getParticipants)
}