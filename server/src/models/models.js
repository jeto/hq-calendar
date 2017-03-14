import {db} from '../db/database';

export function createEvent(name, description, starttime) {
  return db.none('INSERT INTO events(name, description, starttime) values($1, $2, $3)',
    [name, description, starttime]);
}

export function getEvents() {
  return db.any('SELECT * FROM events ORDER BY id ASC;');
}

export function getEvent(id) {
  return db.one('SELECT * FROM events WHERE ID=$1', [id]);
}