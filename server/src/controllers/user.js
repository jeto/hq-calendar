import * as User from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user)});
}

export const signup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(422).send({ error: 'You must provide username, email and password' })
  }

  User.checkIfExists(username, email)
      .then((data) => {
        if(data.exists) {
          return res.status(422).send({ error: 'Username or email already used' });
        }

        User.createUser(username, email, password)
            .then((data) => {
              res.status(201).json({ token: tokenForUser(data) })
            }, )
            .catch((err) => {
              return next(err);
            })
      })
      .catch((err) => {
        return next(err);
      })
}