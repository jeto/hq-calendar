import {db} from '../db/database';

export function createEvent(req, res, next) {
  req.body.host = parseInt(req.body.host);
  db.one('INSERT INTO events(name, description, starttime, endtime, host)' +
          'values(${name}, ${description}, ${starttime}, ${endtime}, ${host}) returning id',
          req.body)
          .then((data) => {
            res.status(201).json(data.id);
          })
          .catch((err) => {
            return next(err);
          })
}

export function getEvents(req, res, next) {
  db.any(`SELECT e.*, row_to_json(u.*) as host
          FROM events e INNER JOIN users u
          ON e.host = u.id;`).
    then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return next(err);
    });
}

export function getEvent(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.one(`SELECT e.*, row_to_json(u.*) as host
          FROM events e INNER JOIN users u
          ON e.host = u.id WHERE e.ID=$1`, eventID)
    .then((data) => {
      res.json(data);
    }) 
    .catch((err) => {
      return next(err);
    });
}

export function updateEvent(req, res, next) {
  db.none('UPDATE events set name=$1, description=$2, starttime=$3, endtime=$4 WHERE id=$5',
    [req.body.name, req.body.description, req.body.starttime, req.body.endtime, parseInt(req.params.id)])
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      return next(err);
    });
}

export function deleteEvent(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.result('DELETE FROM events where id = $1', eventID)
    .then((result) => {
      res.json({message: `Removed ${result.rowCount} event`});
    })
    .catch((err) => {
      return next(err);
    })
}