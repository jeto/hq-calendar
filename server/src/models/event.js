import {db} from '../db/database';
import { userFromToken } from '../controllers/user';

export function createEvent(name, description, starttime, endtime, host) {
  return db.one('INSERT INTO events(name, description, starttime, endtime, host) ' +
         'values($1, $2, $3, $4, $5) returning id',
          [name, description, starttime, endtime, host])
}

export function getEvents() {
  return db.any(`SELECT id, name, starttime, endtime from events`)
}

export function getEventsForUser(id) {
  return db.any('SELECT DISTINCT e.id, e.name, e.starttime, e.endtime, e.host '+
        'from events as e, participants as p '+
        'where (e.id = p.event_id and p.user_id = $1) or e.host = $1', id)
}

export function getEvent(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.one('SELECT *, (SELECT row_to_json(u) FROM '+
        '(select id, username from users where host = users.id) u) '+
        'as host from events where id=$1', eventID)
    .then((data) => {
      res.json(data);
    }, (data) => {
      if(data.code===0) {
        res.status(404).json('Event not found');
      }
    }) 
    .catch((err) => {
      res.status(500).send('Error fetching event');
      return next(err);
    });
}

export function editEvent(id, name, description, starttime, endtime) {
  return db.none('UPDATE events set name=$1, description=$2, starttime=$3, endtime=$4 WHERE id=$5',
    [name, description, starttime, endtime, id])
}

export function deleteEvent(eventID) {
  return db.result('DELETE FROM events where id = $1', eventID)
}

export function isHost(id, host) {
  return db.one('SELECT host FROM events WHERE id=$1', id)
          .then(result => {
            return result.host === host
          })
}

export function getParticipants(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.any('SELECT participants.user_id, users.username FROM participants '+
        'INNER JOIN users ON participants.user_id = users.id WHERE event_id=$1', eventID)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send('Error fetching participants');
      return next(err);
    })
}

export function joinEvent(req, res, next) {
  const eventID = parseInt(req.params.id);
  const userID = userFromToken(req.get('auth'));
  db.one('with ins AS(' +
      'insert into participants(user_id, event_id)'+
      'values($1, $2) returning *'+
      ') select ins.*, users.username from ins inner join users on ins.user_id=users.id', [userID, eventID])
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(500).send('Error joining event');
      return next(err);
    })
}

export function leaveEvent(req, res, next) {
  const eventID = parseInt(req.params.id);
  const userID = userFromToken(req.get('auth'));
  db.one('DELETE FROM participants where user_id=$1 and event_id=$2 returning *', [userID, eventID])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send('Error leaving event');
      return next(err);
    })
}