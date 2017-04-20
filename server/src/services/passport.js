import passport from 'passport';
import * as User from '../models/user';
import config from '../config';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import LocalStrategy from 'passport-local';

const localLogin = new LocalStrategy(function(username, password, done) {
  let userid;
  User.getUserByUsername(username)
      .then((user) => {
        userid = user.id;
        return User.comparePassword(user.id, password);
      }, (err) => {
        if(err.code === 0) { return done(null, false); }
      })
      .then((res) => {
        if(res) { return done(null, { id: userid, username: username }); }
        else return done(null, false);
      })
      .catch((err) => {
        return done(err);
      })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('auth'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.getUserById(payload.sub)
      .then((user) => {
        done(null, user);
      }, () => {
        done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      })
});

passport.use(localLogin);
passport.use(jwtLogin);