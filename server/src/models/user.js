import {db} from '../db/database';
import bcrypt from 'bcryptjs';

export function checkIfExists(username, email) {
  return db.one(`SELECT EXISTS(SELECT 1 FROM users
                 WHERE lower(username) like LOWER($1)
                 OR lower(email) LIKE lower($2))`, [username, email])
}

export function createUser(username, email, password) {
  return bcrypt.genSalt(10)
        .then((salt) => {
          return bcrypt.hash(password, salt, null)
          
        })
        .then((hash) =>{
          return db.one(`INSERT INTO users(username, email, password)
                  values($1, $2, $3) returning id`, [username, email, hash])
        })
}

export function comparePassword(userID, candidatePassword) {
  return db.one('SELECT password FROM users WHERE id=$1', userID)
          .then((user) => {
            return bcrypt.compare(candidatePassword, user.password)
          })
}

export function getUsers(req, res, next) {
  db.any('SELECT * FROM users ORDER BY id ASC;').
    then((user) => {
      res.json(user);
    })
    .catch((err) => {
      return next(err);
    });
}

export function getUserByUsername(username) {
  return db.one('SELECT id, username, password, admin FROM users WHERE lower(username) like lower($1)', username)
}

export function getUserById(id) {
  return db.one('SELECT id, username, admin FROM users WHERE id=$1', id);
}

export function getUser(req, res, next) {
  const userID = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE ID=$1', userID)
    .then((user) => {
      res.json(user);
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