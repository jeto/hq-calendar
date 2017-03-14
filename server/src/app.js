import express from 'express';
import bodyParser from 'body-parser';
import {db} from './db/database';
import EventController from './controllers/events';
import {createEvent, getEvents, getEvent} from './models/models';

const router = express.Router();

export const app = express();

app.use(bodyParser.json());

app.get('/events', (req, res) => {
  getEvents().then(data => {
    res.json(data);
    console.log(data);
  });
})

app.get('/events/:id', (req, res) => {
  getEvent(req.params.id).then(data => {
    res.json(data);
    console.log(data);
  });
})

app.post('/events', (req, res) => {
  const {name, description, starttime} = req.body;
  
  createEvent(name, description, starttime)
  .then(()=>{
    res.status(201).send({params:req.body});
  })
  .catch(error =>{
    console.log(error);
    res.send(error);
  });
})

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001');
})