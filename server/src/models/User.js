import {db} from '../db/database';

export function createUser(req, res, next) {
  req.body.host = parseInt(req.body.host);
  db.none('INSERT INTO users(name, email, passwordhash)' +
          'values(${name}, ${email}, ${passwordhash})',
          req.body)
          .then(() => {
            res.status(201).end();
          })
          .catch((err) => {
            return next(err);
          })
}

export function getUsers(req, res, next) {
  db.any('SELECT * FROM users ORDER BY id ASC;').
    then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return next(err);
    });
}

export function getUser(req, res, next) {
  const userID = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE ID=$1', userID)
    .then((data) => {
      res.json(data);
    }) 
    .catch((err) => {
      return next(err);
    });
}

export function updateUser(req, res, next) {
  db.none('UPDATE users set name=$1, email=$2, passwordhash=$3 WHERE id=$5',
    [req.body.name, req.body.email, req.body.passwordhash, parseInt(req.params.id)])
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      return next(err);
    });
}

export function deleteUser(req, res, next) {
  const userID = parseInt(req.params.id);
  db.result('DELETE FROM users where id = $1', userID)
    .then((result) => {
      res.json({message: `Removed ${result.rowCount} user`});
    })
    .catch((err) => {
      return next(err);
    })
}