import express from 'express';
import bodyParser from 'body-parser';
import {db} from './db/database';
import EventController from './controllers/events';
import * as models from './models/models';

const router = express.Router();

export const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/api/events', models.getEvents)
app.get('/api/events/:id', models.getEvent)
app.post('/api/events', models.createEvent)
app.put('/api/events/:id', models.updateEvent)
app.delete('/api/events/:id', models.deleteEvent)

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001');
})