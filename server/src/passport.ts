import passport from './index';
import passportLocal from 'passport-local';
import User from './db/models/user';
import bcrypt from 'bcryptjs';

passport.use(
  new passportLocal.Strategy(async (username, password, done) => {
    const user = await User.findOne({ name: username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return done({ status: 401, message: 'Wrong username or password.' }, false);
    if (user.online) return done({ status: 409, message: `User is already logged in.` }, false);
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(err, user);
  });
});
