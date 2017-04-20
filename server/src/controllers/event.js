import * as Event from '../models/event';
import * as User from '../models/user';
import validator from 'validator';
import { userFromToken, isAdmin } from './user';

export const get = (req, res, next) => {
  if(req.query.user) {
    Event.getEventsForUser(req.query.user)
      .then((data) => {
        res.json(data);
      })
      .catch(err => {
        return next(err);
      })
  } else {
    Event.getEvents(req, res, next);
  }
}

export const add = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description ? req.body.description : '';
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const host = userFromToken(req.get('auth'));

  validate(name, description, starttime, endtime, host);

  Event.createEvent(name, description, starttime, endtime, host)
    .then((data) => {
      res.status(201).json(data.id);
    })
    .catch((err) => {
      return next(err);
    })
}

export const edit = (req, res, next) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const description = req.body.description ? req.body.description : '';
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const user = userFromToken(req.get('auth'));

  validate(name, description, starttime, endtime, user)

  Promise.all([Event.isHost(id, user), User.isAdmin(user)])
    .then(values=>{
      if(values[0] || values[1]) {
        Event.editEvent(id, name, description, starttime, endtime)
          .then(() => {
            res.status(200).end();
          })
          .catch((err) => {
            return next(err);
          });
      } else {
        res.status(401).send('Unauthorized');
      }
  }).catch(err =>{
      return next(err);
  })
}

export const remove = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = userFromToken(req.get('auth'));

  Promise.all([Event.isHost(id, user), User.isAdmin(user)])
    .then(values=>{
      if(values[0] || values[1]) {
        Event.deleteEvent(id)
          .then((result) => {
            res.json({message: `Removed ${result.rowCount} event`});
          })
          .catch((err) => {
            return next(err);
          })
      } else {
        res.status(401).send('Unauthorized');
      }
  }).catch(err =>{
      return next(err);
  })
}

function validate(name, description, starttime, endtime, host) {
  if(!name || !starttime || !host) {
    return res.status(422).send({ error: 'Name, starttime and host required' })
  }
  if(validator.isByteLength(name, {min:51})) {
    return res.status(422).send({ error: 'Maximum length for event name is 50 characters'})
  }
  if(starttime>endtime) {
    return res.status(422).send({ error: "Ending time can't be before starting time" })
  }
}