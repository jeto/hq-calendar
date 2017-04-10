import {db} from '../db/database';
import { userFromToken } from '../controllers/user';

export function createComment(req, res, next) {
  req.body.user = userFromToken(req.get('auth'));
  db.one('with ins AS(' +
        'insert into comments(author, event, content)'+
        'values(${user}, ${id}, ${content}) returning *'+
        ') select * from ins inner join users on ins.author=users.id', req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      return next(err);
    })
}

export function getComments(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.any('SELECT comments.*, users.username FROM comments INNER JOIN users ON comments.author = users.id WHERE event=$1', eventID)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return next(err);
    })
}

export function deleteComment(req, res, next) {
  const commentID = parseInt(req.params.id);
  db.result('DELETE FROM comments where id = $1', commentID)
    .then((result) => {
      res.json({message: `Removed ${result.rowCount} comment`});
    })
    .catch((err) => {
      return next(err);
    })
}
