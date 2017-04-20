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
                  values($1, $2, $3) returning id, username`, [username, email, hash])
        })
}

export function comparePassword(userID, candidatePassword) {
  return db.one('SELECT password FROM users WHERE id=$1', userID)
          .then((user) => {
            return bcrypt.compare(candidatePassword, user.password)
          })
}

export function isAdmin(userID) {
  return db.one('SELECT admin FROM users WHERE id=$1', userID)
          .then((data) => {
            return data.admin;
          })
          .catch((err) => {
            return false;
          })
}

export function getUserByUsername(username) {
  return db.one('SELECT id, username, password, admin FROM users WHERE lower(username) like lower($1)', username)
}

export function getUserById(id) {
  return db.one('SELECT id, username, admin FROM users WHERE id=$1', id);
}

export function getUser(userID) {
  return db.one('SELECT id, username, email FROM users WHERE ID=$1', userID)
}