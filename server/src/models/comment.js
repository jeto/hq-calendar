import {db} from '../db/database';

export function createComment(user, event, content) {
  return db.one('with ins AS(' +
        'insert into comments(author, event, content)'+
        'values($1, $2, $3) returning *'+
        ') select ins.*, users.username from ins inner join users on ins.author=users.id',
        [user, event, content])
}

export function getComments(req, res, next) {
  const eventID = parseInt(req.params.id);
  db.any('SELECT comments.*, users.username FROM comments '+
         'INNER JOIN users ON comments.author = users.id WHERE event=$1',eventID)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send('Error fetching comments');
      return next(err);
    })
}

export function deleteComment(commentID) {
  return db.result('DELETE FROM comments where id = $1', commentID)
}

export function isOwnerOrHost(id, user) {
  return db.one('SELECT e.host, c.author FROM comments as c, events as e'+
                ' WHERE c.id=$1 and c.event = e.id', id)
          .then(result => {
            return result.author === user || result.host === user
          })
          .catch(err => {
            return false
          })
}

// export function deleteComments(req, res, next) {
//   db.tx(t => {
//     let queries = req.body.ids.map(c => {
//       return t.none('DELETE FROM comments where id = $1', c)
//     });
//     return t.all(queries)
//   })
//     .then(() => {
//       res.status(200).send();
//     })
//     .catch((err) => {
//       return next(err);
//     })
// }