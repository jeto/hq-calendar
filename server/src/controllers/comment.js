import * as Event from '../models/event';
import * as User from '../models/user';
import * as Comment from '../models/comment';
import validator from 'validator';
import { userFromToken, isAdmin } from './user';

export const remove = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = userFromToken(req.get('auth'));

  Promise.all([Comment.isOwnerOrHost(id, user), User.isAdmin(user)])
    .then(values=>{
      if(values[0] || values[1]) {
        Comment.deleteComment(id)
          .then((result) => {
            res.json({message: `Removed ${result.rowCount} comment`});
          })
          .catch((err) => {
            return next(err);
          })
      } else {
        res.status(401).send('Unauthorized');
      }
  }).catch(err =>{
      res.status(500).send(err.message);
      return next(err);
  })
}

export const add = (req, res, next) => {
  const user = userFromToken(req.get('auth'));
  const event = req.body.id;
  const content = req.body.content;

  if(!event || !content) {
    return res.status(422).send({ error: 'Event and content required' })
  }

  Comment.createComment(user, event, content)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      return next(err);
    })
}