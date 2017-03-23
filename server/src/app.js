import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import {db} from './db/database';
import EventController from './controllers/events';
import * as models from './models/Event';

const router = express.Router();

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(cookieParser());
// app.use(session({
//   secret: process.env.SECRET_KEY,
//   resave: false,
//   saveUninitialized: true
// }));
app.use(passport.initialize());
// app.use(passport.session());


app.get('/api/events', models.getEvents)
app.get('/api/events/:id', models.getEvent)
app.post('/api/events', models.createEvent)
app.put('/api/events/:id', models.updateEvent)
app.delete('/api/events/:id', models.deleteEvent)

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001');
})